"use client";

import { useEffect, useState, useCallback } from "react";
import { useReadContract, useWriteContract } from "wagmi";
import { policyManagerConfig } from "@/lib/policyManagmentConfig";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle } from "lucide-react";
import {config} from "@/config/index";
import { readContract, waitForTransactionReceipt } from "@wagmi/core";

type Policy = {
  id: bigint;
  data: [
    string, // name
    bigint, // coverage
    bigint, // premium
    bigint, // status
    bigint, // duration
    bigint, // season
    bigint, // start
    bigint, // end
    bigint, // deadline
    boolean, // isActive
    bigint, //subscriberCount
  ];
};

export default function ViewAllPolicies() {
  const [policies, setPolicies] = useState<Policy[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const {writeContract} = useWriteContract();
  const { writeContractAsync } = useWriteContract();


  const {
    data: nextId,
    error: idError,
    isPending,
  } = useReadContract({
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
        setLoading(true);
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
        setLoading(false);
      }
    };

    if (nextId !== undefined) {
      fetchPolicies();
    }
  }, [nextId, fetchPolicyDetails]);


const onToggleHandler = async (id: bigint, status: number) => {
  try {
    const fnName = status === 3 ? "resumePolicy" : "hidePolicy";
    const hash = await writeContractAsync({
      ...policyManagerConfig,
      functionName: fnName,
      args: [id],
    });

    // ⏳ Wait until the tx is mined
    await waitForTransactionReceipt(config, { hash });

    // ✅ Now refetch the *updated* policy
    const updated = await fetchPolicyDetails(id);
    setPolicies((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, data: updated as Policy["data"] } : p
      )
    );
  } catch (err) {
    console.error("Toggle failed", err);
  }
};


  if (isPending || loading) return <p>Loading policies...</p>;
  if (error || idError)
    return <p className="text-red-600">Error: {error || idError?.message}</p>;
  if (!policies.length)
    return <p className="text-gray-500 text-center">No policies found.</p>;

  return (
    <>
      {policies.map(({ id, data: policy }) => (
        <Card key={id.toString()}>
          <CardHeader>
            <CardTitle>{policy[0]}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <p>
                <strong>Coverage:</strong> {`${policy[1].toString()} Hc`}
              </p>
              <p>
                <strong>Premium:</strong> {`${policy[2].toString()} $`}
              </p>
              <p>
                <strong>Season:</strong> {`${policy[4].toString()}`}
              </p>
              <p>
                <strong>Start:</strong>{" "}
                {new Date(Number(policy[5]) * 1000).toLocaleString()}
              </p>
              <p>
                <strong>End:</strong>{" "}
                {new Date(Number(policy[6]) * 1000).toLocaleString()}
              </p>
              <p>
                <strong>Deadline:</strong>{" "}
                {new Date(Number(policy[7]) * 1000).toLocaleString()}
              </p>
             <p className="">
  {(() => {
    const status = Number(policy[3]); // enum from contract
    const deadline = Number(policy[7]); // subscriptionDeadline
    const now = Math.floor(Date.now() / 1000);
    const isDeadlineOver = now > deadline;
    const isActiveByContract = status === 0;
    // Final computed logic
    const shouldShowActive = isActiveByContract && !isDeadlineOver;

    if (shouldShowActive) {
      return (
        <Badge
          variant="secondary"
          className="bg-emerald-100 text-emerald-700"
        >
          <CheckCircle className="w-4 h-4 mr-1" />
          Active
        </Badge>
      );
    } else {
      return (
        <Badge
          variant="secondary"
          className="bg-red-100 text-red-700"
        >
          <XCircle className="w-4 h-4 mr-1" />
          Inactive
        </Badge>
      );
    }
  })()}
</p>
<button
  className="w-fit px-4 rounded-lg bg-red-600 text-white font-medium 
             hover:bg-red-700 focus:outline-none focus:ring-2 
             focus:ring-red-500 focus:ring-offset-2 
             transition-all duration-200"
  onClick={() => onToggleHandler(id, Number(policy[3]))} 
  disabled={Number(policy[3]) === 1 || Number(policy[3]) === 2}
>
  {Number(policy[3]) === 3 ? "Unhide" : "Hide"} 
</button>

            </div>
          </CardContent>
        </Card>
      ))}
    </>
  );
}
