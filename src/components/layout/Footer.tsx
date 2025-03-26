
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="border-t border-border/40">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <h3 className="text-lg font-medium mb-4">AI-NFT ZONE</h3>
            <p className="text-muted-foreground text-sm max-w-xs">
              Create, buy, and sell unique AI-generated NFTs on our cutting-edge marketplace.
            </p>
          </div>
          
          <div>
            <h4 className="text-sm font-medium uppercase tracking-wider mb-4">Marketplace</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
                  All NFTs
                </Link>
              </li>
              <li>
                <Link to="/create" className="text-muted-foreground hover:text-foreground transition-colors">
                  Create New NFT
                </Link>
              </li>
              <li>
                <Link to="/listed-items" className="text-muted-foreground hover:text-foreground transition-colors">
                  My Listed Items
                </Link>
              </li>
              <li>
                <Link to="/purchased-items" className="text-muted-foreground hover:text-foreground transition-colors">
                  My Purchased Items
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm font-medium uppercase tracking-wider mb-4">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Platform Status
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Partners
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Blog
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm font-medium uppercase tracking-wider mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border/40 mt-12 pt-8">
          <p className="text-center text-muted-foreground text-sm">
            &copy; {new Date().getFullYear()} AI-NFT ZONE. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
