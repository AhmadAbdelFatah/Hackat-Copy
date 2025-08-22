"use client"
import { useWriteContract, useReadContract, useWalletClient } from "wagmi";
import { waitForTransactionReceipt } from '@wagmi/core';
import { policyManagerConfig } from "@/lib/policyManagmentConfig";
import { Button } from "@/components/ui/button"
import { AdminLayout } from "@/components/admin/admin-layout"
import { Plus} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react";
import {config} from "@/config/index";
import ViewPolicy from "./ViewPolicy";

export default function PoliciesPage() {
  const [policyName, setPolicyName] = useState("");
  const [policyDescription, setPolicyDescription] = useState("");
  const [triggerThreshold, setTriggerThreshold] = useState("100");
  const [premiumAmount, setPremiumAmount] = useState("10");
  const [season, setSeason] = useState("1");
  const [seasonStart, setSeasonStart] = useState("");
  const [seasonEnd, setSeasonEnd] = useState("");
  const [subscriptionDeadline, setSubscriptionDeadline] = useState("");
  const [coversFullSeason, setCoversFullSeason] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const { writeContractAsync } = useWriteContract();
  const { data: walletClient } = useWalletClient();

  const {
    data: nextId,
    isLoading: isIdLoading,
    isSuccess: isIdSuccess,
    error: idError,
  } = useReadContract({
    ...policyManagerConfig,
    functionName: "nextPolicyId",
  });

  // Helper function to get current timestamp in human readable format
  const getCurrentTimestamp = () => {
    return Math.floor(Date.now() / 1000);
  };
  // Helper function to format timestamp for display
  const formatTimestamp = (timestamp:number) => {
    return new Date(timestamp * 1000).toLocaleDateString();
  };

  const onCreatePolicyHandler = async () => {
    if (!policyName || !triggerThreshold || !premiumAmount || !season) {
      setError("Please fill all required fields");
      return;
    }

    try {
      setIsCreating(true);
      setError("");
      
      const currentTimestamp = getCurrentTimestamp();
      
      // Fix: Properly handle empty strings and invalid numbers
      const startTimestamp = seasonStart && seasonStart.trim() !== "" && !isNaN(parseInt(seasonStart)) 
        ? parseInt(seasonStart) 
        : currentTimestamp;
        
      const endTimestamp = seasonEnd && seasonEnd.trim() !== "" && !isNaN(parseInt(seasonEnd))
        ? parseInt(seasonEnd) 
        : currentTimestamp + (30 * 86400); // 30 days from now
        
      const deadlineTimestamp = subscriptionDeadline && subscriptionDeadline.trim() !== "" && !isNaN(parseInt(subscriptionDeadline))
        ? parseInt(subscriptionDeadline) 
        : currentTimestamp + (7 * 86400); // 7 days from now

      // Additional validation: ensure timestamps make logical sense
      if (startTimestamp >= endTimestamp) {
        setError("Season start must be before season end");
        return;
      }
      
      if (deadlineTimestamp > endTimestamp) {
        setError("Subscription deadline cannot be after season end");
        return;
      }

      // Convert string inputs to proper numbers for BigInt conversion
      const thresholdValue = parseInt(triggerThreshold);
      const premiumValue = parseInt(premiumAmount);
      const seasonValue = parseInt(season);

      if (isNaN(thresholdValue) || isNaN(premiumValue) || isNaN(seasonValue)) {
        setError("Please enter valid numbers for threshold, premium, and season");
        return;
      }

      if (thresholdValue <= 0 || premiumValue <= 0 || seasonValue <= 0) {
        setError("All numeric values must be positive");
        return;
      }

      const txHash = await writeContractAsync({
        ...policyManagerConfig,
        functionName: 'createPolicy',
        args: [
          policyName,
          BigInt(thresholdValue),
          BigInt(premiumValue),
          BigInt(seasonValue),
          BigInt(startTimestamp),
          BigInt(endTimestamp),
          BigInt(deadlineTimestamp),
          coversFullSeason
        ],
      });

      const receipt = await waitForTransactionReceipt(config, {
        hash: txHash,
      }); 
      
      
      // Reset form and close dialog
      setPolicyName("");
      setPolicyDescription("");
      setTriggerThreshold("100");
      setPremiumAmount("10");
      setSeason("1");
      setSeasonStart("");
      setSeasonEnd("");
      setSubscriptionDeadline("");
      setCoversFullSeason(false);
      setIsDialogOpen(false);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create policy");
    } finally {
      setIsCreating(false);
    }
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setError("");
  };
 
  return (
    <AdminLayout>
      <div className="mb-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Policy Templates</h1>
            <p className="text-gray-600">Create and manage insurance policy templates</p>
          </div>
          <div className="flex items-center gap-4">
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button 
                  className="bg-emerald-600 hover:bg-emerald-700"
                  onClick={() => setIsDialogOpen(true)}
                >
                  <Plus className="w-4 mr-2" />
                  Create New Policy
                </Button>
              </DialogTrigger>

              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>Create New Policy</DialogTitle>
                  <DialogDescription>Fill in the details to add a new policy</DialogDescription>
                </DialogHeader>

                {error && (
                  <div className="bg-red-100 border border-red-400 text-red-700 px-2 py-1 rounded relative ">
                    {error}
                  </div>
                )}

                <div className="grid gap-2 py-2">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">Name*</Label>
                    <Input 
                      id="name" 
                      value={policyName}
                      placeholder="Flowering Stage" 
                      className="col-span-3" 
                      onChange={(e) => setPolicyName(e.target.value)} 
                    />
                  </div>
                  
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="description" className="text-right">Description</Label>
                    <Input 
                      id="description" 
                      value={policyDescription}
                      placeholder="Insurance during flowering stage" 
                      className="col-span-3" 
                      onChange={(e) => setPolicyDescription(e.target.value)} 
                    />
                  </div>
                  
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="threshold" className="text-right">Trigger Threshold*</Label>
                    <Input 
                      id="threshold" 
                      type="number"
                      value={triggerThreshold}
                      placeholder="100" 
                      className="col-span-3" 
                      onChange={(e) => setTriggerThreshold(e.target.value)} 
                    />
                  </div>
                  
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="premium" className="text-right">Premium*</Label>
                    <Input 
                      id="premium" 
                      type="number"
                      value={premiumAmount}
                      placeholder="10" 
                      className="col-span-3" 
                      onChange={(e) => setPremiumAmount(e.target.value)} 
                    />
                  </div>
                  
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="season" className="text-right">Season*</Label>
                    <Input 
                      id="season" 
                      type="number"
                      value={season}
                      placeholder="1" 
                      className="col-span-3" 
                      onChange={(e) => setSeason(e.target.value)} 
                    />
                  </div>
                  
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="seasonStart" className="text-right">Season Start</Label>
                    <div className="col-span-3">
                      <Input 
                        id="seasonStart" 
                        type="datetime-local"
                        value={seasonStart}
                        className="mb-1" 
                        onChange={(e) => setSeasonStart(e.target.value)} 
                      />
                      <p className="text-xs text-gray-500">
                        Leave blank to use current time
                      </p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="seasonEnd" className="text-right">Season End</Label>
                    <div className="col-span-3">
                      <Input 
                        id="seasonEnd" 
                        type="datetime-local"
                        value={seasonEnd}
                        className="mb-1" 
                        onChange={(e) => setSeasonEnd(e.target.value)} 
                      />
                      <p className="text-xs text-gray-500">
                        Leave blank for 30 days from now
                      </p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="deadline" className="text-right">Subscription Deadline</Label>
                    <div className="col-span-3">
                      <Input 
                        id="deadline" 
                        type="datetime-local"
                        value={subscriptionDeadline}
                        className="mb-1" 
                        onChange={(e) => setSubscriptionDeadline(e.target.value)} 
                      />
                      <p className="text-xs text-gray-500">
                        Leave blank for 7 days from now
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-2">
                  <Button 
                    variant="outline" 
                    onClick={handleDialogClose}
                    disabled={isCreating}
                  >
                    Cancel
                  </Button>
                  <Button 
                    onClick={onCreatePolicyHandler} 
                    disabled={isCreating}
                    className="bg-emerald-600 hover:bg-emerald-700"
                  >
                    {isCreating ? "Creating..." : "Create Policy"}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
     { /*grid grid-cols-4 md:grid-cols-2 gap-6 mb-8 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {isIdLoading ? (
          <p>Loading policy ID...</p>
        ) : nextId > 1n ? (
          <ViewPolicy/>
        ) : (
          <p>Failed to load policy ID</p>
        )}
      </div>
    </AdminLayout>
  );
}