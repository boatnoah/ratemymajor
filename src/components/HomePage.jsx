import SearchBar from "./SearchBar";

const HomePage = () => {
  return (
    <div className="flex flex-col gap-5 px-6 py-2">
      <h1 className="w-[250px] text-4xl font-bold">Your Major, Your Future.</h1>
      <SearchBar />
    </div>
  );
};

export default HomePage;
