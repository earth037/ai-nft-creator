
// Define any custom types needed for the application here
export type CryptoCurrency = "ETH" | "BTC" | "USDT";

export interface WalletInfo {
  address: string;
  balance: string;
  network: string;
}

// Extend Window interface to include ethereum property
declare global {
  interface Window {
    ethereum?: {
      isMetaMask?: boolean;
      request: (request: { method: string; params?: any[] }) => Promise<any>;
      on: (event: string, callback: (...args: any[]) => void) => void;
      removeListener?: (event: string, callback: (...args: any[]) => void) => void;
    };
  }
}

// Define NFT interface for consistency across the application
export interface NFT {
  id: string;
  name: string;
  description: string;
  image: string;
  price: string;
  currency: string;
  creator: string;
  owner: string;
  network?: string;
  createdAt: Date;
  listedAt?: Date;
  purchasedAt?: Date;
}

// ThirdWeb NFT metadata 
export interface ThirdWebNFTMetadata {
  id: string;
  name: string;
  description: string;
  image: string;
  uri: string;
  properties: Record<string, any>;
}

// ThirdWeb NFT
export interface ThirdWebNFT {
  metadata: ThirdWebNFTMetadata;
  owner: string;
  type: string;
}
