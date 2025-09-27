import {
  ConnectWallet,
  Wallet,
  WalletDropdown,
  WalletDropdownDisconnect,
  WalletDropdownLink,
} from "@coinbase/onchainkit/wallet";
import {
  Address,
  Avatar,
  Name,
  Identity,
  EthBalance,
} from "@coinbase/onchainkit/identity";
// import { color } from "@coinbase/onchainkit/theme";

export function WalletComponents() {
  return (
    <div className="flex justify-end">
      <Wallet>
        <ConnectWallet disconnectedLabel="Connect Wallet">
          <Avatar className="h-6 w-6" />
          <Name className="text-white" />
        </ConnectWallet>
        <WalletDropdown>
          <Identity
            className="px-4 pt-3 pb-2 hover:bg-blue-300"
            hasCopyAddressOnClick
          >
            <Avatar />
            <Name />
            <Address />
            <EthBalance />
          </Identity>
          <WalletDropdownLink
            className="hover:bg-blue-200"
            icon="wallet"
            href="https://keys.coinbase.com"
          >
            Wallet
          </WalletDropdownLink>
          <WalletDropdownLink
            className="hover:bg-blue-200"
            icon="swapSettings"
            href="https://keys.coinbase.com"
          >
            Setting
          </WalletDropdownLink>
          <WalletDropdownDisconnect />
        </WalletDropdown>
      </Wallet>
    </div>
  );
}
