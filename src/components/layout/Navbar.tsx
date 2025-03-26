
import { Link } from "react-router-dom";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { WalletButton } from "@/components/ui/WalletButton";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/80 backdrop-blur-xl shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <span className="text-xl font-bold text-gradient">
                AI-NFT ZONE
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            <Link 
              to="/" 
              className="text-foreground hover:text-primary transition-colors"
            >
              Home
            </Link>
            <Link 
              to="/create" 
              className="text-foreground hover:text-primary transition-colors"
            >
              Create
            </Link>
            <Link 
              to="/listed-items" 
              className="text-foreground hover:text-primary transition-colors"
            >
              Listed Items
            </Link>
            <Link 
              to="/purchased-items" 
              className="text-foreground hover:text-primary transition-colors"
            >
              Purchased Items
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <WalletButton />
            
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="ml-2 inline-flex items-center justify-center p-2 rounded-md text-foreground md:hidden"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden glass animate-fadeIn">
          <div className="px-4 pt-2 pb-4 space-y-1 sm:px-3">
            <Link
              to="/"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-primary/10"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/create"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-primary/10"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Create
            </Link>
            <Link
              to="/listed-items"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-primary/10"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Listed Items
            </Link>
            <Link
              to="/purchased-items"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-primary/10"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Purchased Items
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
