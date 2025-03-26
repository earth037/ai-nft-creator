
import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";
import { WalletInfo } from "@/types";

export interface WalletContextType {
  address: string | null;
  isConnected: boolean;
  connecting: boolean;
  networkId: string | null;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  changeWallet: () => Promise<void>;
  walletInfo: WalletInfo | null;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [address, setAddress] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [networkId, setNetworkId] = useState<string | null>(null);
  const [walletInfo, setWalletInfo] = useState<WalletInfo | null>(null);

  const updateWalletInfo = async () => {
    if (!window.ethereum || !address) return;

    try {
      const chainId = await window.ethereum.request({ method: 'eth_chainId' });
      const networkName = getNetworkName(chainId);
      
      // Get balance
      const balance = await window.ethereum.request({
        method: 'eth_getBalance',
        params: [address, 'latest'],
      });
      
      const ethBalance = parseInt(balance, 16) / 1e18;
      
      setNetworkId(chainId);
      setWalletInfo({
        address,
        balance: ethBalance.toFixed(4),
        network: networkName
      });
    } catch (error) {
      console.error("Error fetching wallet info:", error);
    }
  };

  const getNetworkName = (chainId: string): string => {
    switch (chainId) {
      case '0x1':
        return 'Ethereum Mainnet';
      case '0x5':
        return 'Goerli Testnet';
      case '0xaa36a7':
        return 'Sepolia Testnet';
      case '0x89':
        return 'Polygon Mainnet';
      case '0x13881':
        return 'Mumbai Testnet';
      default:
        return `Chain ${chainId}`;
    }
  };

  useEffect(() => {
    const savedAddress = localStorage.getItem("walletAddress");
    if (savedAddress) {
      setAddress(savedAddress);
      setIsConnected(true);
    }
    
    if (typeof window.ethereum === "undefined") {
      console.log("MetaMask is not installed!");
    }
  }, []);

  useEffect(() => {
    if (address) {
      updateWalletInfo();
    }
  }, [address]);

  useEffect(() => {
    if (window.ethereum) {
      const handleAccountsChanged = (accounts: string[]) => {
        console.log("Accounts changed:", accounts);
        if (accounts.length === 0) {
          disconnectWallet();
        } else if (accounts[0] !== address) {
          setAddress(accounts[0]);
          setIsConnected(true);
          localStorage.setItem("walletAddress", accounts[0]);
        }
      };

      const handleChainChanged = (chainId: string) => {
        console.log("Network changed:", chainId);
        // Refresh the page on network change as recommended by MetaMask
        window.location.reload();
      };

      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', handleChainChanged);

      return () => {
        if (window.ethereum.removeListener) {
          window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
          window.ethereum.removeListener('chainChanged', handleChainChanged);
        }
      };
    }
  }, [address]);

  const connectWallet = async (): Promise<void> => {
    if (!window.ethereum) {
      toast.error("MetaMask is not installed. Please install MetaMask to connect.");
      return;
    }

    try {
      setConnecting(true);
      
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      
      if (accounts.length > 0) {
        setAddress(accounts[0]);
        setIsConnected(true);
        localStorage.setItem("walletAddress", accounts[0]);
        await updateWalletInfo();
        toast.success("Wallet connected successfully");
      }
    } catch (error) {
      console.error("Error connecting to MetaMask:", error);
      toast.error("Failed to connect wallet. Please try again.");
    } finally {
      setConnecting(false);
    }
  };

  const disconnectWallet = (): void => {
    setAddress(null);
    setIsConnected(false);
    setWalletInfo(null);
    setNetworkId(null);
    localStorage.removeItem("walletAddress");
    toast.info("Wallet disconnected");
  };

  const changeWallet = async (): Promise<void> => {
    if (!window.ethereum) {
      toast.error("MetaMask is not installed");
      return;
    }
    
    try {
      // This will force MetaMask to prompt the user to select an account
      await window.ethereum.request({
        method: 'wallet_requestPermissions',
        params: [{ eth_accounts: {} }],
      });
      
      // After permission is granted, get the selected account
      const accounts = await window.ethereum.request({ 
        method: 'eth_requestAccounts' 
      });
      
      if (accounts.length > 0) {
        setAddress(accounts[0]);
        setIsConnected(true);
        localStorage.setItem("walletAddress", accounts[0]);
        await updateWalletInfo();
        toast.success("Wallet changed successfully");
      }
    } catch (error) {
      console.error("Error changing wallet:", error);
      toast.error("Failed to change wallet");
    }
  };

  return (
    <WalletContext.Provider
      value={{
        address,
        isConnected,
        connecting,
        networkId,
        connectWallet,
        disconnectWallet,
        changeWallet,
        walletInfo
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
