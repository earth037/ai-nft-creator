
// ThirdWeb configuration
export const THIRDWEB_CONFIG = {
  contractAddress: "0x43ec527B04aF42f9BCdcfcD78eC977E8F4281bC6",
  clientId: "0b94b89e9aa5549edbbf00a68a2689b3",
  // Note: Secret keys should never be exposed in frontend code
  // This is just for reference, but should be used only in a secure backend
};

// Networks supported by the application
export const SUPPORTED_NETWORKS = {
  ethereum: {
    chainId: "0x1",
    name: "Ethereum Mainnet",
    rpcUrl: "https://mainnet.infura.io/v3/",
    currency: "ETH",
  },
  goerli: {
    chainId: "0x5",
    name: "Goerli Testnet",
    rpcUrl: "https://goerli.infura.io/v3/",
    currency: "ETH",
  },
  sepolia: {
    chainId: "0xaa36a7",
    name: "Sepolia Testnet",
    rpcUrl: "https://sepolia.infura.io/v3/",
    currency: "ETH",
  },
  polygon: {
    chainId: "0x89",
    name: "Polygon Mainnet",
    rpcUrl: "https://polygon-rpc.com",
    currency: "MATIC",
  },
  mumbai: {
    chainId: "0x13881",
    name: "Mumbai Testnet",
    rpcUrl: "https://rpc-mumbai.maticvigil.com",
    currency: "MATIC",
  },
};

// Get network name from chain ID
export const getNetworkName = (chainId: string): string => {
  for (const network in SUPPORTED_NETWORKS) {
    if (SUPPORTED_NETWORKS[network as keyof typeof SUPPORTED_NETWORKS].chainId === chainId) {
      return SUPPORTED_NETWORKS[network as keyof typeof SUPPORTED_NETWORKS].name;
    }
  }
  return `Chain ${chainId}`;
};
