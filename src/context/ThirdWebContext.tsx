
import { createContext, useContext, ReactNode, useEffect, useState } from "react";
import { ThirdwebProvider, useContract, useOwnedNFTs, useNFTs } from "@thirdweb-dev/react";
import { THIRDWEB_CONFIG } from "@/config/thirdweb";
import { useWallet } from "./WalletContext";
import { ThirdWebNFT } from "@/types";
import { toast } from "sonner";

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
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  
  // Get all NFTs in the collection
  const { data: allNfts, isLoading: isLoadingAllNfts } = useNFTs(contract);
  
  // Get NFTs owned by the connected wallet
  const { data: ownedNfts, isLoading: isLoadingOwnedNfts, refetch } = useOwnedNFTs(
    contract,
    address
  );

  // Refresh owned NFTs when wallet connects
  useEffect(() => {
    if (isConnected && address) {
      refetch();
    }
  }, [isConnected, address, refreshTrigger]);

  // Function to manually refresh NFTs
  const refreshNFTs = () => {
    if (isConnected) {
      setRefreshTrigger(prev => prev + 1);
      toast.info("Refreshing your NFTs...");
      refetch();
    }
  };

  const value = {
    contract,
    allNfts,
    ownedNfts,
    isLoadingAllNfts,
    isLoadingOwnedNfts,
    refreshNFTs,
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
