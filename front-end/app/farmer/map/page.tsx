"use client";
import React, { useState, useEffect, useCallback } from "react";
import { GoogleMap, LoadScriptNext, Marker } from "@react-google-maps/api";



const containerStyle = {
  width: "100%",
  height: "300px",
};
const center = { lat: -13.9626, lng: 33.7741 };
type ChildProps = {
  onAddressSelect: (data: string)=> void;
}
type LatLng = {lat: number; lng: number};
type FarmerData = {
  location?: LatLng;
  farmerAddress?: string;
}
const STORAGE_KEY = "farmerData";

const FarmerMap = ({onAddressSelect}: ChildProps) => {
  const [markerPosition, setMarkerPosition] = useState(center);
  const [map, setMap] = useState<any>(null);
  const [address, setAddress] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const openCageApi = process.env.NEXT_PUBLIC_OPENCAGE_API_KEY as string;
    useEffect(()=>{
    const saved = localStorage.getItem(STORAGE_KEY);
    if(saved){
      try{
        const parsed: FarmerData= JSON.parse(saved);
        if(parsed.location){setMarkerPosition(parsed.location)};
        if(parsed.farmerAddress){
          setAddress(parsed.farmerAddress);
        };
      }catch(error){
        alert(error)
      }

    }
  },[])

  // Function to get address from coordinates using geocode.maps
const getAddressFromLatLng = useCallback(async (lat: number, lng: number) => {
  setIsLoading(true);
  try {
    const query = `${lat},${lng}`;
    const openCageUrl =(
      `https://api.opencagedata.com/geocode/v1/json?key=${openCageApi}&q=${encodeURIComponent(query)}&pretty=1&no_annotations=1`
    );
    const response = await fetch(openCageUrl);
    console.log("responser", response)
    if(response.status === 200){
      const data = await response.json();
    console.log("data", data)

      if(data.results && data.results.length > 0){
        const result = data.results[0];
        const formattedAddress = result.formatted;
        console.log("formatted address", formattedAddress);
        const fullData: FarmerData ={
          location: {lat, lng}, 
          farmerAddress: formattedAddress,
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(fullData));
      setAddress(formattedAddress);
      onAddressSelect(formattedAddress);
      setIsLoading(false);
      return;
      }
    }
    else if (response.status <= 500) {
        const errorData = await response.json();
        console.warn("OpenCage API Error:", errorData.status?.message || "Unknown error");
      }
    } catch (err) {
      console.warn("OpenCage failed:", err);
    }
}, [apiKey, onAddressSelect, openCageApi]);

  // Detect location and update marker + address
  const detectLocationAndAddress = () => {
    if (navigator.geolocation) {
      setIsLoading(true); 
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const coords = {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          };
          setMarkerPosition(coords);
          getAddressFromLatLng(coords.lat, coords.lng);
          if (map) map.panTo(coords);
        },
        (error) => {
          setIsLoading(false);
          alert("Could not detect your location: " + error.message);
        },
        { enableHighAccuracy: true, timeout: 10000 }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };
  return (
    <div>
      <button
        onClick={detectLocationAndAddress}
        disabled = {isLoading}
        className="px-4 py-2 bg-green-500 text-white rounded mb-4"
      >
        {isLoading? "Detecting Location...": "Get My Current Address"}
      </button>
            <div className="mb-4">
        {isLoading ? (
          <div className="text-blue-600">
            🔍 Loading address...
          </div>
        ) : (
          <div className={`p-3 rounded ${address ? 'bg-green-50 border border-green-200' : 'bg-gray-50'}`}>
            <strong>📍 Address:</strong> {address || "Click on the map or detect your location"}
          </div>
        )}
      </div>

      <LoadScriptNext googleMapsApiKey={apiKey || ""}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={markerPosition}
          zoom={15}
          onLoad={(map) => setMap(map)}
          onClick={(e) => {
            if (e.latLng) {
              const coords = { lat: e.latLng.lat(), lng: e.latLng.lng() };
              setMarkerPosition(coords);
              getAddressFromLatLng(coords.lat, coords.lng);
            }
          }}
        >
          <Marker position={markerPosition} />
        </GoogleMap>
      </LoadScriptNext>
      
    </div>
  );

};

export default FarmerMap;
