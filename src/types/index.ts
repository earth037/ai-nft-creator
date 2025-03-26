
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
