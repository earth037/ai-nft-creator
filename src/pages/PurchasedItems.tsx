
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { NFTCard } from "@/components/ui/NFTCard";
import { useNFTs } from "@/context/NFTContext";
import { useWallet } from "@/context/WalletContext";
import { useThirdWeb } from "@/context/ThirdWebContext";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { NFT, ThirdWebNFT } from "@/types";

export default function PurchasedItems() {
  const { purchasedNFTs } = useNFTs();
  const { isConnected, address } = useWallet();
  const { ownedNfts, isLoadingOwnedNfts } = useThirdWeb();

  // Filter NFTs owned by the current user (from our context)
  const myPurchasedNFTs = isConnected 
    ? purchasedNFTs.filter(nft => nft.owner === address)
    : [];
    
  // Check if user has ThirdWeb NFTs
  const hasThirdWebNFTs = ownedNfts && ownedNfts.length > 0;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2">My NFTs</h1>
          <p className="text-muted-foreground mb-8">
            View the NFTs you've minted and purchased
          </p>
          
          {!isConnected ? (
            <div className="text-center py-20 glass rounded-xl">
              <h3 className="text-2xl font-semibold mb-2">Wallet not connected</h3>
              <p className="text-muted-foreground mb-6">
                Please connect your wallet to view your NFTs
              </p>
            </div>
          ) : isLoadingOwnedNfts ? (
            <div className="text-center py-20 glass rounded-xl">
              <Loader2 className="h-10 w-10 animate-spin mx-auto mb-4" />
              <h3 className="text-2xl font-semibold mb-2">Loading your NFTs...</h3>
              <p className="text-muted-foreground">
                Fetching your NFTs from the blockchain
              </p>
            </div>
          ) : !hasThirdWebNFTs && myPurchasedNFTs.length === 0 ? (
            <div className="text-center py-20 glass rounded-xl">
              <h3 className="text-2xl font-semibold mb-2">No NFTs Found</h3>
              <p className="text-muted-foreground mb-6">
                You haven't minted or purchased any NFTs yet. 
                Get started by creating your first NFT or exploring the marketplace!
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button asChild>
                  <Link to="/create">Create NFT</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link to="/">Explore Marketplace</Link>
                </Button>
              </div>
            </div>
          ) : (
            <div>
              {hasThirdWebNFTs && (
                <>
                  <h2 className="text-xl font-medium mb-4">ThirdWeb NFTs</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-10">
                    {ownedNfts.map((nft: ThirdWebNFT) => (
                      <div key={nft.metadata.id} className="group relative overflow-hidden rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-1">
                        <div className="relative aspect-square overflow-hidden rounded-t-xl bg-secondary/30">
                          <img
                            src={nft.metadata.image}
                            alt={nft.metadata.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="p-4 backdrop-blur-sm glass">
                          <h3 className="font-medium text-lg truncate">{nft.metadata.name}</h3>
                          <p className="text-muted-foreground text-sm line-clamp-2 mb-3">
                            {nft.metadata.description}
                          </p>
                          <div className="text-xs">
                            <span className="ml-auto px-2 py-1 bg-primary/10 text-primary rounded-full text-xs">
                              Owned by you
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
              
              {myPurchasedNFTs.length > 0 && (
                <>
                  <h2 className="text-xl font-medium mb-4">{hasThirdWebNFTs ? "Demo NFTs" : "Purchased NFTs"}</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {myPurchasedNFTs.map((nft) => (
                      <NFTCard key={nft.id} nft={nft} showPurchaseButton={false} />
                    ))}
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
