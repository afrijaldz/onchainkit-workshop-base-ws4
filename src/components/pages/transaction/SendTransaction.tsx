"use client";

import { Input } from "@/components/ui/input";
import {
  Transaction,
  TransactionButton,
  TransactionSponsor,
  TransactionStatus,
  TransactionStatusAction,
  TransactionStatusLabel,
} from "@coinbase/onchainkit/transaction";
import { useMemo, useState } from "react";
import { Address } from "viem";
import { useChainId } from "wagmi";

export default function SendTransaction() {
  const [recipient, setRecipient] = useState<Address>();
  const [amount, setAmount] = useState("");

  const chainId = useChainId();
  const isValid = useMemo(() => !!recipient && !!amount, [recipient, amount]);

  return (
    <>
      <Input
        placeholder="Recipient Address"
        className="mb-4"
        value={recipient}
        onChange={(e) => setRecipient(e.target.value as Address)}
      />
      <Input
        placeholder="Amount in ETH"
        className="mb-4"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <Transaction
        resetAfter={5000}
        chainId={chainId}
        calls={[
          {
            to: recipient as Address,
            value: BigInt(amount) * BigInt(1e18),
          },
        ]}
        onStatus={(status) => {
          console.log("Transaction Status:", status);
        }}
        onError={(error) => {
          console.error("Transaction Error:", error);
        }}
      >
        <TransactionButton disabled={!isValid} />
        <TransactionSponsor />
        <TransactionStatus>
          <TransactionStatusLabel />
          <TransactionStatusAction />
        </TransactionStatus>
      </Transaction>
    </>
  );
}
