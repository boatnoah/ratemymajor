import SearchBar from "./SearchBar";

const HomePage = () => {
  return (
    <div className="flex justify-center px-6 py-2">
      <div className="flex flex-col items-start">
        <div className="flex flex-col items-start mb-5">
          <h1 className="text-4xl font-bold">Your Major,</h1>
          <h1 className="text-4xl font-bold">Your Future.</h1>
        </div>
        <SearchBar />
      </div>
    </div>
  );
};

export default HomePage;
