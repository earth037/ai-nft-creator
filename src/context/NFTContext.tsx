
import { createContext, useContext, useState, useEffect } from "react";
import { useWallet } from "@/context/WalletContext";
import { NFT } from "@/types";

interface NFTContextType {
  nfts: NFT[];
  listedNFTs: NFT[];
  purchasedNFTs: NFT[];
  featuredNFTs: NFT[];
  mintNFT: (nft: Omit<NFT, "id" | "createdAt" | "listedAt" | "network">) => Promise<void>;
  purchaseNFT: (id: string) => Promise<void>;
  searchNFTs: (query: string) => NFT[];
  loading: boolean;
}

const NFTContext = createContext<NFTContextType | undefined>(undefined);

// Sample NFT data for demonstration
const mockNFTs: NFT[] = [
  {
    id: "1",
    name: "Cosmic Voyage",
    description: "A journey through the cosmos, rendered in vibrant colors and abstract forms.",
    image: "https://images.unsplash.com/photo-1634926878768-2a5b3c42f139?q=80&w=1956&auto=format&fit=crop",
    price: "0.2",
    currency: "ETH",
    creator: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
    owner: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
    network: "0x1", // Ethereum Mainnet
    createdAt: new Date("2023-01-15"),
    listedAt: new Date("2023-01-15"),
  },
  {
    id: "2",
    name: "Digital Dreamscape",
    description: "An AI-generated landscape representing the convergence of nature and technology.",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1964&auto=format&fit=crop",
    price: "0.15",
    currency: "ETH",
    creator: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
    owner: "0x954c27a12cd397024231b5e0bfa042f3f066d410",
    network: "0x5", // Goerli Testnet
    createdAt: new Date("2023-02-20"),
    listedAt: new Date("2023-02-21"),
    purchasedAt: new Date("2023-02-25"),
  },
  {
    id: "3",
    name: "Neon Genesis",
    description: "A cyberpunk-inspired cityscape bathed in the glow of neon lights.",
    image: "https://images.unsplash.com/photo-1604871000636-074fa5117945?q=80&w=1974&auto=format&fit=crop",
    price: "0.3",
    currency: "ETH",
    creator: "0x954c27a12cd397024231b5e0bfa042f3f066d410",
    owner: "0x954c27a12cd397024231b5e0bfa042f3f066d410",
    network: "0x89", // Polygon Mainnet
    createdAt: new Date("2023-03-10"),
    listedAt: new Date("2023-03-12"),
  },
  {
    id: "4",
    name: "Quantum Echoes",
    description: "Visualizing quantum mechanics through abstract digital art.",
    image: "https://images.unsplash.com/photo-1608501947097-86951ad73fea?q=80&w=1964&auto=format&fit=crop",
    price: "0.25",
    currency: "ETH",
    creator: "0x954c27a12cd397024231b5e0bfa042f3f066d410",
    owner: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
    network: "0x1", // Ethereum Mainnet
    createdAt: new Date("2023-04-05"),
    listedAt: new Date("2023-04-07"),
    purchasedAt: new Date("2023-04-10"),
  },
  {
    id: "5",
    name: "Tranquil Oasis",
    description: "A serene digital landscape representing inner peace in the digital age.",
    image: "https://images.unsplash.com/photo-1693678055939-17b3f6efed3a?q=80&w=1964&auto=format&fit=crop",
    price: "0.18",
    currency: "ETH",
    creator: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
    owner: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
    network: "0x13881", // Mumbai Testnet
    createdAt: new Date("2023-05-15"),
    listedAt: new Date("2023-05-16"),
  },
];

export function NFTProvider({ children }: { children: React.ReactNode }) {
  const [nfts, setNfts] = useState<NFT[]>(mockNFTs);
  const [loading, setLoading] = useState(false);
  const { networkId, address } = useWallet();

  // Filter NFTs based on their status and current network
  const filteredNFTs = networkId 
    ? nfts.filter(nft => nft.network === networkId) 
    : nfts;

  const listedNFTs = filteredNFTs.filter(nft => nft.listedAt && !nft.purchasedAt);
  const purchasedNFTs = filteredNFTs.filter(nft => nft.purchasedAt);
  
  // Featured NFTs should also be from the current network
  const featuredNFTs = [...filteredNFTs]
    .sort(() => 0.5 - Math.random())
    .slice(0, 3);

  // Mint a new NFT
  const mintNFT = async (nftData: Omit<NFT, "id" | "createdAt" | "listedAt" | "network">): Promise<void> => {
    setLoading(true);
    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const newNFT: NFT = {
        ...nftData,
        id: Math.random().toString(36).substring(2, 9),
        network: networkId, // Assign the current network
        createdAt: new Date(),
        listedAt: new Date(),
      };
      
      setNfts(prev => [...prev, newNFT]);
    } catch (error) {
      console.error("Error minting NFT:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Purchase an NFT
  const purchaseNFT = async (id: string): Promise<void> => {
    setLoading(true);
    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setNfts(prev => prev.map(nft => 
        nft.id === id 
          ? { ...nft, purchasedAt: new Date(), owner: address || "Unknown" } 
          : nft
      ));
    } catch (error) {
      console.error("Error purchasing NFT:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Search NFTs
  const searchNFTs = (query: string): NFT[] => {
    if (!query.trim()) return listedNFTs;
    
    const lowercaseQuery = query.toLowerCase();
    return listedNFTs.filter(nft => 
      nft.name.toLowerCase().includes(lowercaseQuery) || 
      nft.description.toLowerCase().includes(lowercaseQuery)
    );
  };

  return (
    <NFTContext.Provider
      value={{
        nfts,
        listedNFTs,
        purchasedNFTs,
        featuredNFTs,
        mintNFT,
        purchaseNFT,
        searchNFTs,
        loading,
      }}
    >
      {children}
    </NFTContext.Provider>
  );
}

export function useNFTs() {
  const context = useContext(NFTContext);
  if (context === undefined) {
    throw new Error("useNFTs must be used within an NFTProvider");
  }
  return context;
}
