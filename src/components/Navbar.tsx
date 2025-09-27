"use client";

import { useRouter } from "next/navigation";
import { WalletComponents } from "./Wallet";

export const Navbar = () => {
  const router = useRouter();

  return (
    <nav className="w-full h-16 border-b border-gray-700 text-white items-center px-4 flex justify-between cursor-pointer">
      <h1 onClick={() => router.push("/")} className="text-lg font-bold">
        My OnchainKit App
      </h1>
      <header>
        <WalletComponents />
      </header>
    </nav>
  );
};
