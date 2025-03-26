
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { NFTCard } from "@/components/ui/NFTCard";
import { useNFTs } from "@/context/NFTContext";
import { useWallet } from "@/context/WalletContext";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function ListedItems() {
  const { listedNFTs } = useNFTs();
  const { isConnected, address } = useWallet();

  // Filter NFTs created by the current user
  const myListedNFTs = isConnected 
    ? listedNFTs.filter(nft => nft.creator === address)
    : [];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2">My Listed NFTs</h1>
          <p className="text-muted-foreground mb-8">
            View and manage your listed NFTs
          </p>
          
          {!isConnected ? (
            <div className="text-center py-20 glass rounded-xl">
              <h3 className="text-2xl font-semibold mb-2">Wallet not connected</h3>
              <p className="text-muted-foreground mb-6">
                Please connect your wallet to view your listed NFTs
              </p>
            </div>
          ) : myListedNFTs.length === 0 ? (
            <div className="text-center py-20 glass rounded-xl">
              <h3 className="text-2xl font-semibold mb-2">No listed NFTs found</h3>
              <p className="text-muted-foreground mb-6">
                You haven't minted any NFTs yet. Create your first NFT now!
              </p>
              <Button asChild>
                <Link to="/create">Create NFT</Link>
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {myListedNFTs.map((nft) => (
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
