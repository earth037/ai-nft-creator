
import { createContext, useContext, ReactNode } from "react";
import { ThirdwebProvider, useContract, useOwnedNFTs, useNFTs } from "@thirdweb-dev/react";
import { THIRDWEB_CONFIG } from "@/config/thirdweb";
import { useWallet } from "./WalletContext";

// Create context for ThirdWeb functionality
const ThirdWebContext = createContext<any>(null);

export function ThirdWebProviderWrapper({ children }: { children: ReactNode }) {
  return (
    <ThirdwebProvider clientId={THIRDWEB_CONFIG.clientId}>
      <ThirdWebContextProvider>{children}</ThirdWebContextProvider>
    </ThirdwebProvider>
  );
}

function ThirdWebContextProvider({ children }: { children: ReactNode }) {
  const { address, isConnected } = useWallet();
  const { contract } = useContract(THIRDWEB_CONFIG.contractAddress);
  
  // Get all NFTs in the collection
  const { data: allNfts, isLoading: isLoadingAllNfts } = useNFTs(contract);
  
  // Get NFTs owned by the connected wallet
  const { data: ownedNfts, isLoading: isLoadingOwnedNfts } = useOwnedNFTs(
    contract,
    address
  );

  const value = {
    contract,
    allNfts,
    ownedNfts,
    isLoadingAllNfts,
    isLoadingOwnedNfts,
  };

  return (
    <ThirdWebContext.Provider value={value}>
      {children}
    </ThirdWebContext.Provider>
  );
}

export function useThirdWeb() {
  const context = useContext(ThirdWebContext);
  if (!context) {
    throw new Error("useThirdWeb must be used within a ThirdWebProvider");
  }
  return context;
}
