import { useState } from "react";
import universities from "/us_institutions.json";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Link } from "react-router-dom";
import Fuse from "fuse.js";

const SearchBar = () => {
  const [searchInput, setSearchInput] = useState("");

  const fuse = new Fuse(universities, {
    keys: ["institution"],
    includeMatches: true,
    threshold: 0.3,
  });

  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const filteredUniversities = fuse.search(searchInput, { limit: 15 });

  return (
    <div className="flex items-center gap-5">
      <div className="flex-1 w-[472px] rounded-lg bg-transparent focus-within:outline focus-within:outline-gray-400 dark:focus-within:outline-gray-600 flex items-center relative">
        <div className="relative flex items-center w-full">
          <Input
            className="w-full py-2 pl-8 pr-4 leading-none text-gray-800 dark:text-white bg-transparent focus:outline-none rounded-lg"
            placeholder="Search College..."
            value={searchInput}
            onChange={handleSearchInputChange}
          />
          <Search className="absolute left-2 h-4 w-4 shrink-0 opacity-50" />
        </div>
        {searchInput && (
          <div className="absolute top-full bg-background left-0 w-full max-h-48 overflow-y-auto shadow-lg dark:border rounded-lg mt-2 z-10">
            {filteredUniversities &&
              filteredUniversities.map((uni, index) => (
                <Link key={index} to={`/${uni.item.institution}`}>
                  <div className="px-4 text-sm hover:bg-gray-300 py-2 dark:hover:bg-gray-700 dark:text-gray-400 cursor-pointer rounded-lg">
                    {uni.item.institution}
                  </div>
                </Link>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
