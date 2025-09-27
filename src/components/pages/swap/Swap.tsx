"use client";

const eth: Token = {
  name: "ETH",
  address: "",
  symbol: "ETH",
  decimals: 18,
  image:
    "https://wallet-api-production.s3.amazonaws.com/uploads/tokens/eth_288.png",
  chainId: 8453,
};

const usdc: Token = {
  name: "USDC",
  address: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
  symbol: "USDC",
  decimals: 6,
  image:
    "https://d3r81g40ycuhqg.cloudfront.net/wallet/wais/44/2b/442b80bd16af0c0d9b22e03a16753823fe826e5bfd457292b55fa0ba8c1ba213-ZWUzYjJmZGUtMDYxNy00NDcyLTg0NjQtMWI4OGEwYjBiODE2",
  chainId: 8453,
};

import { Swap as SwapOK } from "@coinbase/onchainkit/swap";
import type { Token } from "@coinbase/onchainkit/token";

export default function Swap() {
  return <SwapOK from={[eth]} to={[usdc]} />;
}
