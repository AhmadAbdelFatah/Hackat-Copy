"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  CheckCircle,
  Clock,
  QrCode,
  Download,
  Calendar,
  DollarSign,
  AlertTriangle,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { policyManagerConfig } from "@/lib/policyManagmentConfig";
import FarmerHeader from "../sharedComponents/FarmerHeader";
import { useReadContract } from "wagmi";
import { readContract } from "@wagmi/core";
import {config} from "@/config/index";

type Policy = {
  id: bigint;
  data: [
    string, // name
    bigint, // coverage
    bigint, // premium
    bigint, // duration
    bigint, // season
    bigint, // start
    bigint, // end
    bigint, // deadline
    boolean // isActive
  ];
};

// Helper function to format BigInt to USD
const formatUSD = (value: bigint) => {
  return `$${(Number(value) / 100).toFixed(2)}`;
};

// Helper function to format duration (assuming duration is in days)
const formatDuration = (days: bigint) => {
  const weeks = Number(days) / 7;
  if (weeks >= 4) {
    const months = weeks / 4;
    return `${months.toFixed(1)} month${months !== 1 ? "s" : ""}`;
  }
  return `${weeks.toFixed(0)} week${weeks !== 1 ? "s" : ""}`;
};

// Helper function to format date (assuming timestamp is in seconds)
const formatDate = (timestamp: bigint) => {
  return new Date(Number(timestamp) * 1000).toLocaleDateString();
};

export default function PoliciesPage() {
  const [selectedPolicy, setSelectedPolicy] = useState<Policy | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [policies, setPolicies] = useState<Policy[]>([]);
  const [error, setError] = useState<string | null>(null);

  const { data: nextId } = useReadContract({
    ...policyManagerConfig,
    functionName: "nextPolicyId",
  });

  const fetchPolicyDetails = useCallback(async (policyId: bigint) => {
    return await readContract(config, {
      ...policyManagerConfig,
      functionName: "getPolicyDetails",
      args: [policyId],
    });
  }, []);

  useEffect(() => {
    const fetchPolicies = async () => {
      try {
        setIsLoading(true);
        const max = Number(nextId);
        if (isNaN(max) || max <= 1) {
          setPolicies([]);
          return;
        }

        const ids = Array.from({ length: max - 1 }, (_, i) => BigInt(i + 1));

        const results = await Promise.allSettled(
          ids.map((id) => fetchPolicyDetails(id))
        );

        const successful: Policy[] = results
          .map((res, i) =>
            res.status === "fulfilled"
              ? { id: ids[i], data: res.value as Policy["data"] }
              : null
          )
          .filter(Boolean) as Policy[];

        setPolicies(successful);
      } catch (err: any) {
        setError(err.message || "Unknown error");
      } finally {
        setIsLoading(false);
      }
    };

    if (nextId !== undefined) {
      fetchPolicies();
    }
  }, [nextId, fetchPolicyDetails]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-teal-50">
        <FarmerHeader />
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          <div className="flex justify-center items-center h-64">
            <p>Loading policies...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-teal-50">
        <FarmerHeader />
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-700">Error loading policies: {error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-teal-50">
      {/* Header */}
      <FarmerHeader />

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Insurance Policies
          </h1>
          <p className="text-gray-600">
            Choose the right coverage for your maize farming needs
          </p>
        </div>

        {/* Pricing Disclosure */}
        <Card className="border-0 shadow-lg mb-8 border-l-4 border-l-blue-500">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <CardTitle className="text-lg text-gray-900">
                  Policy Pricing Disclosure
                </CardTitle>
                <p className="text-sm text-gray-600">
                  How our premiums are calculated
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="bg-blue-50 rounded-lg p-4">
              <p className="text-blue-800 text-sm leading-relaxed">
                <strong>Transparent Pricing:</strong> Insurance premiums are
                determined before the insurance period starts, based on
                historical weather data, regional crop yields, and average maize
                prices from recent seasons. Premiums remain fixed throughout the
                policy duration and are not affected by real-time market
                fluctuations. This ensures stability and fairness for all
                farmers.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Policy Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {policies.map((policy) => (
            <Card
              key={policy.id.toString()}
              className={`border-0 shadow-lg hover:shadow-xl transition-all duration-300 ${
                policy.data[8] ? "ring-2 ring-emerald-500" : ""
              }`}
            >
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge
                    variant={policy.data[8] ? "default" : "secondary"}
                    className={
                      policy.data[8] ? "bg-emerald-100 text-emerald-700" : ""
                    }
                  >
                    {policy.data[8] ? (
                      <>
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Active
                      </>
                    ) : (
                      <>
                        <Clock className="w-3 h-3 mr-1" />
                        Inactive
                      </>
                    )}
                  </Badge>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        <QrCode className="w-4 h-4 mr-1" />
                        QR Code
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle>Policy QR Code</DialogTitle>
                        <DialogDescription>
                          Scan to view policy metadata on IPFS
                        </DialogDescription>
                      </DialogHeader>
                      <div className="flex flex-col items-center space-y-4">
                        <div className="w-48 h-48 bg-gray-100 rounded-lg flex items-center justify-center">
                          <QrCode className="w-24 h-24 text-gray-400" />
                        </div>
                        <p className="text-sm text-gray-600 text-center">
                          Policy ID:{" "}
                          {policy.data[0].replace(/\s+/g, "-").toLowerCase()}-
                          {policy.id.toString()}
                        </p>
                        <Button variant="outline" className="w-full">
                          <Download className="w-4 h-4 mr-2" />
                          Download QR Code
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
                <CardTitle className="text-xl text-gray-900">
                  {policy.data[0]}
                </CardTitle>
                <p className="text-gray-600 text-sm">
                  {policy.data[8]
                    ? "Currently active policy"
                    : "Inactive policy"}
                </p>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-xs text-gray-600 mb-1">Premium</p>
                    <p className="font-bold text-emerald-600">
                      {formatUSD(policy.data[2])} per hectare
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-xs text-gray-600 mb-1">Coverage</p>
                    <p className="font-bold text-blue-600">
                      {formatUSD(policy.data[1])} per hectare
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Duration:</span>
                    <span className="font-medium">
                      {formatDuration(policy.data[3])}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Period:</span>
                    <span className="font-medium">
                      {formatDate(policy.data[5])} -{" "}
                      {formatDate(policy.data[6])}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Deadline:</span>
                    <span className="font-medium">
                      {formatDate(policy.data[7])}
                    </span>
                  </div>
                </div>

                {policy.data[8] && (
                  <div className="bg-emerald-50 rounded-lg p-3">
                    <div className="flex items-center mb-2">
                      <Calendar className="w-4 h-4 text-emerald-600 mr-2" />
                      <span className="text-sm font-medium text-emerald-800">
                        Active Period
                      </span>
                    </div>
                    <p className="text-sm text-emerald-700">
                      {formatDate(policy.data[5])} -{" "}
                      {formatDate(policy.data[6])}
                    </p>
                  </div>
                )}

                <div className="pt-2">
                  {policy.data[8] ? (
                    <Button className="w-full" variant="outline" disabled>
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Active
                    </Button>
                  ) : (
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="w-full bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700">
                          Subscribe Now
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-lg">
                        <DialogHeader>
                          <DialogTitle>
                            Subscribe to {policy.data[0]}
                          </DialogTitle>
                          <DialogDescription>
                            Review policy details and confirm your subscription
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="bg-gray-50 rounded-lg p-4">
                            <h4 className="font-medium text-gray-900 mb-2">
                              Policy Summary
                            </h4>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span className="text-gray-600">
                                  Premium (2.5 hectares):
                                </span>
                                {/* <span className="font-medium">
                                  {formatUSD(
                                    BigInt(Number(policy.data[2]) * 25n)
                                  )}
                                </span> */}
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">
                                  Coverage (2.5 hectares):
                                </span>
                                {/* <span className="font-medium">
                                  {formatUSD(
                                    BigInt(Number(policy.data[1]) * 25n)
                                  )}
                                </span> */}
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Duration:</span>
                                <span className="font-medium">
                                  {formatDuration(policy.data[3])}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="bg-orange-50 rounded-lg p-4">
                            <div className="flex items-start space-x-2">
                              <AlertTriangle className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
                              <div>
                                <p className="text-sm text-orange-800 font-medium mb-1">
                                  Important Notice
                                </p>
                                <p className="text-sm text-orange-700">
                                  This subscription requires admin approval. You
                                  will be notified once your application is
                                  reviewed.
                                </p>
                              </div>
                            </div>
                          </div>

                          <div className="flex space-x-3">
                            <DialogTrigger asChild>
                              <Button variant="outline" className="flex-1">
                                Cancel
                              </Button>
                            </DialogTrigger>
                            <Button className="flex-1 bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700">
                              Confirm Subscription
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recommendations */}
        <Card className="border-0 shadow-lg mt-8">
          <CardHeader>
            <CardTitle className="text-xl text-gray-900">
              Recommendations for Your Farm
            </CardTitle>
            <p className="text-gray-600">
              Based on your 2.5 hectare maize farm in Lilongwe District
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-emerald-50 rounded-lg p-4">
                <h4 className="font-medium text-emerald-900 mb-2">
                  Most Critical Protection
                </h4>
                <p className="text-emerald-800 text-sm mb-3">
                  <strong>Flowering Stage Insurance</strong> is recommended as
                  your top priority. This period is most sensitive to drought
                  and offers the best protection for your investment.
                </p>
                <div className="flex items-center text-sm text-emerald-700">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  <span>Consider subscribing to active policies</span>
                </div>
              </div>

              <div className="bg-blue-50 rounded-lg p-4">
                <h4 className="font-medium text-blue-900 mb-2">
                  Complete Protection
                </h4>
                <p className="text-blue-800 text-sm mb-3">
                  <strong>Full Season Insurance</strong> provides comprehensive
                  coverage for your entire growing season. Best value for
                  complete peace of mind.
                </p>
                <div className="flex items-center text-sm text-blue-700">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  <span>Check available policies above</span>
                </div>
              </div>
            </div>

            <div className="mt-6 bg-gray-50 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-2">
                Consider Adding
              </h4>
              <p className="text-gray-700 text-sm mb-3">
                Review all available policies to create a comprehensive
                protection strategy for your farm.
              </p>
              <Button variant="outline" size="sm">
                Learn More About Policies
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
