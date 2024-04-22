import HomePage from "./components/HomePage.jsx";
import NavBar from "./components/NavBar.jsx";

const App = () => {
  return (
    <div className="flex flex-col gap-52">
      <NavBar />
      <HomePage />
    </div>
  );
};

export default App;
