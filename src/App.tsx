
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/context/ThemeContext";
import { WalletProvider } from "@/context/WalletContext";
import { NFTProvider } from "@/context/NFTContext";
import { ThirdWebProviderWrapper } from "@/context/ThirdWebContext";

// Pages
import Home from "./pages/Home";
import Create from "./pages/Create";
import ListedItems from "./pages/ListedItems";
import PurchasedItems from "./pages/PurchasedItems";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <WalletProvider>
        <ThirdWebProviderWrapper>
          <NFTProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/create" element={<Create />} />
                  <Route path="/listed-items" element={<ListedItems />} />
                  <Route path="/purchased-items" element={<PurchasedItems />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </TooltipProvider>
          </NFTProvider>
        </ThirdWebProviderWrapper>
      </WalletProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
