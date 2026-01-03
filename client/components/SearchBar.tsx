import { Search } from "lucide-react";

interface SearchBarProps {
  searchQuery: string;
  selectedCountry: string;
  selectedServer: string;
  servers: string[];
  onSearchChange: (value: string) => void;
  onCountryChange: (value: string) => void;
  onServerChange: (value: string) => void;
}

export default function SearchBar({
  searchQuery,
  onSearchChange,
}: SearchBarProps) {
  return (
    <div className="w-full max-w-2xl mx-auto animate-scaleUpFadeIn mt-6" style={{ animationDelay: "0.2s" }}>
      {/* Main Search Bar - Search Input + Button */}
      <div className="relative flex items-stretch gap-0 bg-[#1a1a1a] border border-[#666666] rounded-lg md:rounded-xl hover:border-[#0088CC]/50 transition-all duration-300 overflow-hidden shadow-lg">
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search by name, username, or details..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="flex-1 px-4 sm:px-5 md:px-6 py-3 sm:py-3.5 md:py-4 bg-transparent text-white placeholder-[#979797] focus:outline-none text-sm sm:text-base transition-all"
        />

        {/* Search Button */}
        <button className="px-4 sm:px-5 md:px-6 py-3 sm:py-3.5 md:py-4 bg-[#0088CC] hover:bg-[#0077AA] text-white font-semibold text-sm sm:text-base transition-all duration-200 flex items-center justify-center gap-2 min-w-max">
          <Search className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="hidden sm:inline">Search</span>
        </button>
      </div>
    </div>
  );
}
