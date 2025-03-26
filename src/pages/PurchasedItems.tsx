
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { NFTCard } from "@/components/ui/NFTCard";
import { useNFTs } from "@/context/NFTContext";
import { useWallet } from "@/context/WalletContext";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function PurchasedItems() {
  const { purchasedNFTs } = useNFTs();
  const { isConnected, address } = useWallet();

  // Filter NFTs owned by the current user
  const myPurchasedNFTs = isConnected 
    ? purchasedNFTs.filter(nft => nft.owner === address)
    : [];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2">My Purchased NFTs</h1>
          <p className="text-muted-foreground mb-8">
            View the NFTs you've purchased
          </p>
          
          {!isConnected ? (
            <div className="text-center py-20 glass rounded-xl">
              <h3 className="text-2xl font-semibold mb-2">Wallet not connected</h3>
              <p className="text-muted-foreground mb-6">
                Please connect your wallet to view your purchased NFTs
              </p>
            </div>
          ) : myPurchasedNFTs.length === 0 ? (
            <div className="text-center py-20 glass rounded-xl">
              <h3 className="text-2xl font-semibold mb-2">No purchased NFTs found</h3>
              <p className="text-muted-foreground mb-6">
                You haven't purchased any NFTs yet. Explore the marketplace to find unique NFTs!
              </p>
              <Button asChild>
                <Link to="/">Explore Marketplace</Link>
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {myPurchasedNFTs.map((nft) => (
                <NFTCard key={nft.id} nft={nft} showPurchaseButton={false} />
              ))}
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
