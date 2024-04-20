import { Input } from "@/components/ui/input";
const SearchBar = () => {
  return (
    <div className="flex items-center gap-5">
      <Input
        className="flex-1 w-[472px] rounded-lg py-2 px-4 leading-none text-gray-800 dark:text-white bg-transparent focus:outline-none"
        placeHolder="Search by Major"
      />
      <SearchIcon className="w-5 h-5 text-gray-800 dark:text-white" />
    </div>
  );
};

function SearchIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

export default SearchBar;
