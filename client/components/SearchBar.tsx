import { useState } from "react";
import { Search, X, ChevronDown } from "lucide-react";
import { GlobeIcon } from "@/components/Icons";
import { cn } from "@/lib/utils";

const COUNTRIES = [
  "Afghanistan",
  "Albania",
  "Algeria",
  "Andorra",
  "Angola",
  "Argentina",
  "Armenia",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bhutan",
  "Bolivia",
  "Bosnia and Herzegovina",
  "Botswana",
  "Brazil",
  "Brunei",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Cambodia",
  "Cameroon",
  "Canada",
  "Cape Verde",
  "Central African Republic",
  "Chad",
  "Chile",
  "China",
  "Colombia",
  "Comoros",
  "Congo",
  "Costa Rica",
  "Croatia",
  "Cuba",
  "Cyprus",
  "Czech Republic",
  "Czechia",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Dominican Republic",
  "East Timor",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "Eritrea",
  "Estonia",
  "Ethiopia",
  "Fiji",
  "Finland",
  "France",
  "Gabon",
  "Gambia",
  "Georgia",
  "Germany",
  "Ghana",
  "Greece",
  "Grenada",
  "Guatemala",
  "Guinea",
  "Guinea-Bissau",
  "Guyana",
  "Haiti",
  "Honduras",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran",
  "Iraq",
  "Ireland",
  "Israel",
  "Italy",
  "Jamaica",
  "Japan",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kiribati",
  "Kuwait",
  "Kyrgyzstan",
  "Laos",
  "Latvia",
  "Lebanon",
  "Lesotho",
  "Liberia",
  "Libya",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Madagascar",
  "Malawi",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "Marshall Islands",
  "Mauritania",
  "Mauritius",
  "Mexico",
  "Micronesia",
  "Moldova",
  "Monaco",
  "Mongolia",
  "Montenegro",
  "Morocco",
  "Mozambique",
  "Myanmar",
  "Namibia",
  "Nauru",
  "Nepal",
  "Netherlands",
  "New Zealand",
  "Nicaragua",
  "Niger",
  "Nigeria",
  "North Korea",
  "North Macedonia",
  "Norway",
  "Oman",
  "Pakistan",
  "Palau",
  "Palestine",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Peru",
  "Philippines",
  "Poland",
  "Portugal",
  "Qatar",
  "Romania",
  "Russia",
  "Rwanda",
  "Saint Kitts and Nevis",
  "Saint Lucia",
  "Saint Vincent and the Grenadines",
  "Samoa",
  "San Marino",
  "Sao Tome and Principe",
  "Saudi Arabia",
  "Senegal",
  "Serbia",
  "Seychelles",
  "Sierra Leone",
  "Singapore",
  "Slovakia",
  "Slovenia",
  "Solomon Islands",
  "Somalia",
  "South Africa",
  "South Korea",
  "South Sudan",
  "Spain",
  "Sri Lanka",
  "Sudan",
  "Suriname",
  "Sweden",
  "Switzerland",
  "Syria",
  "Taiwan",
  "Tajikistan",
  "Tanzania",
  "Thailand",
  "Togo",
  "Tonga",
  "Trinidad and Tobago",
  "Tunisia",
  "Turkey",
  "Turkmenistan",
  "Tuvalu",
  "Uganda",
  "Ukraine",
  "United Arab Emirates",
  "United Kingdom",
  "United States",
  "Uruguay",
  "Uzbekistan",
  "Vanuatu",
  "Vatican City",
  "Venezuela",
  "Vietnam",
  "Yemen",
  "Zambia",
  "Zimbabwe",
].sort();

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
  selectedCountry,
  selectedServer,
  servers,
  onSearchChange,
  onCountryChange,
  onServerChange,
}: SearchBarProps) {
  const [isCountryOpen, setIsCountryOpen] = useState(false);
  const [countrySearch, setCountrySearch] = useState("");

  const filteredCountries = COUNTRIES.filter((country) =>
    country.toLowerCase().includes(countrySearch.toLowerCase()),
  );

  const displayCategory = selectedCountry || "Category";

  return (
    <div className="w-full max-w-3xl mx-auto animate-scaleUpFadeIn" style={{ animationDelay: "0.2s" }}>
      {/* Main Search Bar - Single Line */}
      <div className="relative flex items-stretch gap-0 bg-[#1a1a1a] border border-[#666666] rounded-full hover:border-[#0088CC]/50 transition-all duration-300 overflow-hidden shadow-lg">
        {/* Search Input */}
        <input
          type="text"
          placeholder="What are you looking for?"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="flex-1 px-5 sm:px-6 md:px-7 py-3 sm:py-4 bg-transparent text-white placeholder-[#979797] focus:outline-none text-sm sm:text-base transition-all"
        />

        {/* Divider */}
        <div className="w-px bg-[#666666]" />

        {/* Category Dropdown */}
        <div className="relative group">
          <button
            onClick={() => setIsCountryOpen(!isCountryOpen)}
            className="flex items-center gap-2 px-5 sm:px-6 py-3 sm:py-4 text-[#979797] hover:text-[#0088CC] transition-colors text-sm sm:text-base font-medium min-w-max"
            aria-expanded={isCountryOpen}
          >
            <GlobeIcon className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="hidden sm:inline">{displayCategory}</span>
            <span className="sm:hidden">
              {displayCategory.length > 10 ? displayCategory.slice(0, 10) + "..." : displayCategory}
            </span>
            <ChevronDown
              className={cn(
                "w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300",
                isCountryOpen && "rotate-180",
              )}
            />
          </button>

          {/* Category Dropdown Menu */}
          {isCountryOpen && (
            <div className="absolute top-full right-0 mt-2 w-64 bg-[#1a1a1a] border border-[#666666] rounded-xl z-[999] shadow-2xl overflow-hidden">
              <div className="p-3 border-b border-[#666666]">
                <input
                  type="text"
                  placeholder="Search category..."
                  value={countrySearch}
                  onChange={(e) => setCountrySearch(e.target.value)}
                  className="w-full px-3 py-2 bg-[#0a0a0a] border border-[#666666] rounded-lg text-white placeholder-[#979797] focus:outline-none focus:border-[#0088CC] text-sm transition-all"
                  autoFocus
                />
              </div>
              <div className="max-h-64 overflow-y-auto">
                {filteredCountries.length > 0 ? (
                  filteredCountries.map((country) => (
                    <button
                      key={country}
                      onClick={() => {
                        onCountryChange(country);
                        setIsCountryOpen(false);
                        setCountrySearch("");
                      }}
                      className={cn(
                        "w-full text-left px-4 py-3 text-sm transition-all duration-200 border-b border-[#666666]/50 last:border-b-0 hover:bg-[#0088CC]/20 flex items-center justify-between group",
                        selectedCountry === country && "bg-[#0088CC]/30 text-[#0088CC]",
                        selectedCountry !== country && "text-white hover:text-[#0088CC]",
                      )}
                    >
                      <span>{country}</span>
                      {selectedCountry === country && (
                        <svg className="w-4 h-4 text-[#0088CC]" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </button>
                  ))
                ) : (
                  <div className="px-4 py-6 text-[#979797] text-sm text-center">
                    No categories found
                  </div>
                )}
              </div>
              {selectedCountry && (
                <div className="p-3 border-t border-[#666666]">
                  <button
                    onClick={() => {
                      onCountryChange("");
                      setCountrySearch("");
                    }}
                    className="w-full px-3 py-2 text-sm text-[#979797] hover:text-white hover:bg-[#666666]/20 rounded-lg transition-all flex items-center justify-center gap-2"
                  >
                    <X className="w-4 h-4" />
                    Clear Selection
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="w-px bg-[#666666]" />

        {/* Search Button */}
        <button className="px-5 sm:px-6 md:px-7 py-3 sm:py-4 bg-[#0088CC] hover:bg-[#0077AA] text-white font-semibold text-sm sm:text-base transition-all duration-200 flex items-center justify-center gap-2 min-w-max">
          <Search className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="hidden sm:inline">Search</span>
        </button>
      </div>
    </div>
  );
}
