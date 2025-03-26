
import { useState, useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { NFTCard } from "@/components/ui/NFTCard";
import { FeaturedNFT } from "@/components/ui/FeaturedNFT";
import { SearchBar } from "@/components/ui/SearchBar";
import { useNFTs } from "@/context/NFTContext";
import { useWallet } from "@/context/WalletContext";
import { NFT } from "@/types";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { toast } from "sonner";

export default function Home() {
  const { listedNFTs, featuredNFTs } = useNFTs();
  const { isConnected, networkId } = useWallet();
  const [searchResults, setSearchResults] = useState<NFT[]>(listedNFTs);
  const [isSearchActive, setIsSearchActive] = useState(false);

  useEffect(() => {
    // Update search results when listedNFTs changes (due to network change)
    if (!isSearchActive) {
      setSearchResults(listedNFTs);
    }
  }, [listedNFTs, isSearchActive]);

  const handleSearch = (results: NFT[]) => {
    setSearchResults(results);
    setIsSearchActive(true);
  };

  const clearSearch = () => {
    setSearchResults(listedNFTs);
    setIsSearchActive(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-16">
        {/* Hero Section */}
        <section className="py-16 md:py-24 lg:py-32">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 gap-12 md:grid-cols-2 items-center">
              <div className="space-y-6 animate-fadeIn">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                  Create & Collect <br /> 
                  <span className="text-gradient">Unique AI NFTs</span>
                </h1>
                <p className="text-xl text-muted-foreground max-w-lg">
                  Generate stunning AI artwork and mint it as NFTs on our next-generation marketplace.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button size="lg" asChild>
                    <Link to="/create">Create NFT</Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link to="/">Explore Collection</Link>
                  </Button>
                </div>
              </div>
              <div className="relative">
                <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl shadow-primary/20 animate-float">
                  <img 
                    src="https://images.unsplash.com/photo-1619535214137-60a342b4849c?q=80&w=2069&auto=format&fit=crop" 
                    alt="AI Generated NFT" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 w-48 h-48 rounded-2xl overflow-hidden shadow-xl rotate-12 animate-float" style={{ animationDelay: '0.7s' }}>
                  <img 
                    src="https://images.unsplash.com/photo-1635053350372-ab25dfcaa7cd?q=80&w=2016&auto=format&fit=crop" 
                    alt="AI Generated NFT" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured NFT Section */}
        <section className="py-16 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold">Featured NFT</h2>
              {networkId && (
                <div className="px-3 py-1 bg-primary/10 rounded-full text-sm">
                  <span className="text-primary">Network: </span>
                  <span>{getNetworkName(networkId)}</span>
                </div>
              )}
            </div>
            
            {featuredNFTs.length > 0 ? (
              <FeaturedNFT nft={featuredNFTs[0]} />
            ) : (
              <div className="text-center py-20 glass rounded-xl">
                <h3 className="text-2xl font-semibold mb-2">No NFTs on this network</h3>
                <p className="text-muted-foreground mb-6">
                  {isConnected 
                    ? "There are no NFTs available on your current network. Try changing networks or create your own NFT!"
                    : "Connect your wallet to see NFTs on your network"}
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Marketplace Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
              <div>
                <h2 className="text-3xl font-bold">Marketplace</h2>
                <p className="text-muted-foreground">Discover unique AI-generated NFTs</p>
              </div>
              <div className="w-full md:w-auto">
                <SearchBar 
                  onSearch={handleSearch} 
                  className="w-full md:w-80" 
                />
                {isSearchActive && (
                  <div className="mt-2 text-sm">
                    <button 
                      onClick={clearSearch}
                      className="text-primary hover:underline"
                    >
                      Clear search
                    </button>
                    <span className="ml-2 text-muted-foreground">
                      Found {searchResults.length} items
                    </span>
                  </div>
                )}
              </div>
            </div>

            {!isConnected ? (
              <div className="text-center py-20 glass rounded-xl">
                <h3 className="text-2xl font-semibold mb-2">Connect Wallet to View NFTs</h3>
                <p className="text-muted-foreground mb-6">Please connect your wallet to see NFTs on your current network</p>
                <Button onClick={() => toast.info("Click the Connect Wallet button in the navigation bar")}>
                  Connect Wallet
                </Button>
              </div>
            ) : searchResults.length === 0 ? (
              <div className="text-center py-20 glass rounded-xl">
                <h3 className="text-2xl font-semibold mb-2">No NFTs Found</h3>
                <p className="text-muted-foreground mb-6">
                  {isSearchActive 
                    ? "No NFTs match your search criteria. Try a different search or clear filters." 
                    : "No NFTs available on your current network. Try creating your own!"}
                </p>
                <Button asChild>
                  <Link to="/create">Create NFT</Link>
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {searchResults.map((nft) => (
                  <NFTCard key={nft.id} nft={nft} />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary/5">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Start Creating Your NFTs Today</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              Use our cutting-edge AI technology to create stunning artwork and mint it as NFTs on the blockchain.
            </p>
            <Button size="lg" asChild>
              <Link to="/create">Create Your First NFT</Link>
            </Button>
          </div>
        </section>
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
