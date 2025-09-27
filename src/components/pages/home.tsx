"use client";

import { WalletComponents } from "@/components/Wallet";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="grid grid-cols-3 gap-4 p-8">
      <Card
        onClick={() => router.push("/transaction")}
        className="cursor-pointer"
      >
        <CardContent>Transaction</CardContent>
      </Card>
      <Card onClick={() => router.push("/swap")} className="cursor-pointer">
        <CardContent>Swap</CardContent>
      </Card>
    </div>
  );
}
