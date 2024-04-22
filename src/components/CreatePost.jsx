import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import NavBar from "@/components/NavBar";
const CreatePost = () => {
  return (
    <div>
      <NavBar />
      <Link to="/">
        <Button>Home</Button>
      </Link>
    </div>
  );
};

export default CreatePost;
