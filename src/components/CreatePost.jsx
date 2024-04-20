import { Link } from "react-router-dom";
import { Button } from "./ui/button";
const CreatePost = () => {
  return (
    <div>
      <Link to="/">
        <Button>Home</Button>
      </Link>
    </div>
  );
};

export default CreatePost;
