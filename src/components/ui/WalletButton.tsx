
import { useState, useRef } from "react";
import { useWallet } from "@/context/WalletContext";
import { Wallet, LogOut, ChevronDown, ChevronUp, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useOutsideClick } from "@/hooks/useOutsideClick";

export function WalletButton() {
  const { isConnected, connecting, address, walletInfo, connectWallet, disconnectWallet, changeWallet } = useWallet();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useOutsideClick(dropdownRef, () => setIsOpen(false));

  const truncateAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  if (!isConnected) {
    return (
      <Button 
        onClick={connectWallet} 
        disabled={connecting} 
        className="relative overflow-hidden group"
      >
        {connecting ? (
          <div className="flex items-center gap-2">
            <RefreshCw className="h-4 w-4 animate-spin" />
            <span>Connecting...</span>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Wallet className="h-4 w-4" />
            <span>Connect Wallet</span>
          </div>
        )}
      </Button>
    );
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <Button 
        onClick={toggleDropdown} 
        variant="outline" 
        className="flex items-center gap-2"
      >
        <Wallet className="h-4 w-4" />
        <span className="hidden sm:inline">{truncateAddress(address || '')}</span>
        {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
      </Button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 p-2 rounded-lg glass animate-fadeIn z-50">
          <div className="p-3 mb-2 rounded-md bg-secondary/50 backdrop-blur-sm">
            <p className="text-xs text-muted-foreground">Connected Wallet</p>
            <p className="font-mono text-sm truncate">{address}</p>
            
            {walletInfo && (
              <>
                <div className="mt-2 pt-2 border-t border-border/40">
                  <p className="text-xs text-muted-foreground">Network</p>
                  <p className="font-medium text-sm">{walletInfo.network}</p>
                </div>
                <div className="mt-2 pt-2 border-t border-border/40">
                  <p className="text-xs text-muted-foreground">Balance</p>
                  <p className="font-mono text-sm">{walletInfo.balance} ETH</p>
                </div>
              </>
            )}
          </div>
          <div className="grid gap-1">
            <Button 
              variant="ghost" 
              size="sm" 
              className="justify-start" 
              onClick={() => {
                changeWallet();
                setIsOpen(false);
              }}
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Change Wallet
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="justify-start text-destructive hover:text-destructive/90 hover:bg-destructive/10" 
              onClick={() => {
                disconnectWallet();
                setIsOpen(false);
              }}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Disconnect
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
