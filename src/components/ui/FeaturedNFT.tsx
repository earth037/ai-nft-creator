
import { NFT } from "@/context/NFTContext";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useNFTs } from "@/context/NFTContext";
import { useWallet } from "@/context/WalletContext";
import { toast } from "sonner";
import { CircleDollarSign } from "lucide-react";

interface FeaturedNFTProps {
  nft: NFT;
}

export function FeaturedNFT({ nft }: FeaturedNFTProps) {
  const { purchaseNFT } = useNFTs();
  const { isConnected, address } = useWallet();
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const isOwner = address === nft.owner;
  const canPurchase = isConnected && !isOwner && !nft.purchasedAt;

  const handlePurchase = async () => {
    if (!isConnected) {
      toast.error("Please connect your wallet first");
      return;
    }

    try {
      setIsPurchasing(true);
      await purchaseNFT(nft.id);
      toast.success(`Successfully purchased ${nft.name}`);
    } catch (error) {
      toast.error("Failed to purchase NFT");
      console.error(error);
    } finally {
      setIsPurchasing(false);
    }
  };

  return (
    <div className="relative min-h-[400px] overflow-hidden rounded-xl">
      <div className="absolute inset-0 z-0">
        {!isImageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-secondary">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          </div>
        )}
        <img
          src={nft.image}
          alt={nft.name}
          className={`h-full w-full object-cover transition-opacity duration-700 ${isImageLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setIsImageLoaded(true)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
        <div className="flex items-center gap-2 mb-2">
          <span className="px-2 py-1 bg-primary/20 backdrop-blur-sm text-primary rounded-full text-xs font-medium">
            Featured
          </span>
        </div>
        <h2 className="text-3xl font-bold mb-2">{nft.name}</h2>
        <p className="text-muted-foreground mb-4 max-w-lg">{nft.description}</p>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-secondary/50 backdrop-blur-sm px-4 py-2 rounded-lg">
            <CircleDollarSign className="h-5 w-5 text-primary" />
            <span className="font-mono font-medium">{nft.price} {nft.currency}</span>
          </div>
          
          {canPurchase ? (
            <Button
              onClick={handlePurchase}
              disabled={isPurchasing}
              size="lg"
              className="bg-primary text-white hover:bg-primary/90"
            >
              {isPurchasing ? "Purchasing..." : "Purchase NFT"}
            </Button>
          ) : isOwner ? (
            <span className="px-3 py-2 bg-primary/10 text-primary rounded-lg text-sm">
              Owned by you
            </span>
          ) : null}
        </div>
      </div>
    </div>
  );
}
