
import { NFT } from "@/context/NFTContext";
import { useWallet } from "@/context/WalletContext";
import { useNFTs } from "@/context/NFTContext";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";
import { Ethereum } from "lucide-react";

interface NFTCardProps {
  nft: NFT;
  showPurchaseButton?: boolean;
}

export function NFTCard({ nft, showPurchaseButton = true }: NFTCardProps) {
  const { isConnected, address } = useWallet();
  const { purchaseNFT, loading } = useNFTs();
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const isOwner = address === nft.owner;
  const canPurchase = isConnected && !isOwner && !nft.purchasedAt && showPurchaseButton;

  const truncateAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

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
    <div className="group relative overflow-hidden rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-1">
      <div className="relative aspect-square overflow-hidden rounded-t-xl bg-secondary/30">
        {!isImageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-secondary">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
          </div>
        )}
        <img
          src={nft.image}
          alt={nft.name}
          className={`h-full w-full object-cover transition-opacity duration-500 ${isImageLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setIsImageLoaded(true)}
        />
      </div>
      <div className="p-4 backdrop-blur-sm glass">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-medium text-lg truncate">{nft.name}</h3>
          <div className="flex items-center">
            <Ethereum className="h-4 w-4 text-primary mr-1" />
            <span className="font-mono">{nft.price}</span>
          </div>
        </div>
        <p className="text-muted-foreground text-sm line-clamp-2 mb-3">
          {nft.description}
        </p>
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">
            Creator: {truncateAddress(nft.creator)}
          </span>
          {canPurchase && (
            <Button
              size="sm"
              onClick={handlePurchase}
              disabled={isPurchasing || loading}
              className="ml-auto"
            >
              {isPurchasing ? "Purchasing..." : "Purchase"}
            </Button>
          )}
          {isOwner && !showPurchaseButton && (
            <span className="ml-auto px-2 py-1 bg-primary/10 text-primary rounded-full text-xs">
              Owned by you
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
