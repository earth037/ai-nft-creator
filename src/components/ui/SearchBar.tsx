
import { Search } from "lucide-react";
import { useState } from "react";
import { useNFTs } from "@/context/NFTContext";

interface SearchBarProps {
  onSearch: (results: any[]) => void;
  className?: string;
}

export function SearchBar({ onSearch, className = "" }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const { searchNFTs } = useNFTs();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const results = searchNFTs(query);
    onSearch(results);
  };

  return (
    <form onSubmit={handleSearch} className={`relative ${className}`}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search NFTs..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="h-10 w-full rounded-full bg-secondary pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background transition-all duration-200"
        />
      </div>
    </form>
  );
}
