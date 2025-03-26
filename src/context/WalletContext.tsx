
import { createContext, useContext, useState, useEffect } from "react";

export interface WalletContextType {
  address: string | null;
  isConnected: boolean;
  connecting: boolean;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  changeWallet: () => Promise<void>;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [address, setAddress] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [connecting, setConnecting] = useState(false);

  // Check for saved wallet on mount
  useEffect(() => {
    const savedAddress = localStorage.getItem("walletAddress");
    if (savedAddress) {
      setAddress(savedAddress);
      setIsConnected(true);
    }
  }, []);

  // Mock function to simulate connecting to wallet
  const connectWallet = async (): Promise<void> => {
    try {
      setConnecting(true);
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Generate a random ETH address for demo
      const mockAddress = `0x${Array.from({length: 40}, () => 
        Math.floor(Math.random() * 16).toString(16)).join('')}`;
      
      setAddress(mockAddress);
      setIsConnected(true);
      localStorage.setItem("walletAddress", mockAddress);
    } catch (error) {
      console.error("Error connecting wallet:", error);
    } finally {
      setConnecting(false);
    }
  };

  const disconnectWallet = (): void => {
    setAddress(null);
    setIsConnected(false);
    localStorage.removeItem("walletAddress");
  };

  const changeWallet = async (): Promise<void> => {
    disconnectWallet();
    await connectWallet();
  };

  return (
    <WalletContext.Provider
      value={{
        address,
        isConnected,
        connecting,
        connectWallet,
        disconnectWallet,
        changeWallet
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
}
