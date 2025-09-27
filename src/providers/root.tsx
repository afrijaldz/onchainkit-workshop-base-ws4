"use client";
import { ReactNode } from "react";
import { base } from "wagmi/chains";
import { OnchainKitProvider } from "@coinbase/onchainkit";
import "@coinbase/onchainkit/styles.css";
import { WagmiProvider } from "wagmi";
import { wagmiConfig } from "@/lib/wagmi";
import { ThemeProvider } from "./theme";

export function RootProvider({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <OnchainKitProvider
        apiKey={process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY}
        chain={base}
        config={{
          appearance: {
            mode: "auto",
          },
          wallet: {
            display: "modal",
            preference: "all",
          },
        }}
      >
        <WagmiProvider config={wagmiConfig}>{children}</WagmiProvider>
      </OnchainKitProvider>
    </ThemeProvider>
  );
}
