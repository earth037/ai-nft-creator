
import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ImageGenerator } from "@/components/ui/ImageGenerator";
import { useNFTs } from "@/context/NFTContext";
import { useWallet } from "@/context/WalletContext";
import { Button } from "@/components/ui/button";
import { CircleDollarSign, Coins } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export default function Create() {
  const navigate = useNavigate();
  const { mintNFT, loading } = useNFTs();
  const { isConnected, address, networkId } = useWallet();
  
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [currency, setCurrency] = useState("ETH");

  const handleImageGenerated = (imageUrl: string) => {
    setGeneratedImage(imageUrl);
  };

  const isFormValid = 
    generatedImage && 
    name.trim() && 
    description.trim() && 
    price.trim() && 
    !isNaN(Number(price)) && 
    Number(price) > 0;

  const handleMint = async () => {
    if (!isConnected) {
      toast.error("Please connect your wallet first");
      return;
    }

    if (!networkId) {
      toast.error("Network information not available");
      return;
    }

    if (!isFormValid) {
      toast.error("Please fill all fields correctly");
      return;
    }

    try {
      await mintNFT({
        name,
        description,
        image: generatedImage as string,
        price,
        currency,
        creator: address || "Unknown", // Use connected wallet address
        owner: address || "Unknown", // Initially, creator is the owner
      });

      toast.success("NFT successfully minted!");
      navigate("/listed-items");
    } catch (error) {
      toast.error("Failed to mint NFT");
      console.error(error);
    }
  };

  const currencyOptions = [
    { value: "ETH", label: "Ethereum" },
    { value: "BTC", label: "Bitcoin" },
    { value: "USDT", label: "USDT" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2">Create New NFT</h1>
          <p className="text-muted-foreground mb-8">
            Generate AI artwork and mint it as an NFT
          </p>
          
          {!isConnected ? (
            <div className="text-center py-20 glass rounded-xl">
              <h3 className="text-2xl font-semibold mb-2">Wallet Not Connected</h3>
              <p className="text-muted-foreground mb-6">
                Please connect your wallet to create and mint NFTs
              </p>
              <Button onClick={() => toast.info("Click the Connect Wallet button in the navigation bar")}>
                Connect Wallet
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold">Generate AI Image</h2>
                  {networkId && (
                    <div className="px-3 py-1 bg-primary/10 rounded-full text-xs">
                      <span className="text-primary">Network: </span>
                      <span>{getNetworkName(networkId)}</span>
                    </div>
                  )}
                </div>
                <ImageGenerator onImageGenerated={handleImageGenerated} />
              </div>
              
              <div>
                <h2 className="text-xl font-semibold mb-4">NFT Details</h2>
                <div className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-1">
                      Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter NFT name"
                      className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="description" className="block text-sm font-medium mb-1">
                      Description
                    </label>
                    <textarea
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Enter NFT description"
                      rows={4}
                      className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="price" className="block text-sm font-medium mb-1">
                        Price
                      </label>
                      <input
                        id="price"
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder="0.05"
                        min="0"
                        step="0.01"
                        className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="currency" className="block text-sm font-medium mb-1">
                        Currency
                      </label>
                      <div className="relative">
                        <select
                          id="currency"
                          value={currency}
                          onChange={(e) => setCurrency(e.target.value)}
                          className="w-full appearance-none rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          {currencyOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                          {currency === "ETH" && <CircleDollarSign className="h-4 w-4 text-muted-foreground" />}
                          {currency === "BTC" && <CircleDollarSign className="h-4 w-4 text-muted-foreground" />}
                          {currency === "USDT" && <Coins className="h-4 w-4 text-muted-foreground" />}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <Button
                    onClick={handleMint}
                    disabled={!isFormValid || loading || !isConnected}
                    className="w-full"
                    size="lg"
                  >
                    {loading ? "Minting..." : "Mint NFT"}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

// Helper function to convert network IDs to readable names
function getNetworkName(networkId: string): string {
  switch (networkId) {
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
      return `Chain ${networkId}`;
  }
}
