import { Link, Outlet } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ModeToggle } from "./mode-toggle";

const NavBar = () => {
  return (
    <div>
      <nav>
        <ul className="flex justify-between items-center px-4 py-2 h-[80px]">
          <li>
            <Link to="/">
              <span className="text-lg font-semibold">RateMyMajor</span>
            </Link>
          </li>
          <li className="flex gap-5">
            <Link to="/create-post">
              <Button className="rounded-3xl">Make a Post</Button>
            </Link>
            <ModeToggle />
          </li>
        </ul>
        <Separator />
        <Outlet />
      </nav>
    </div>
  );
};

export default NavBar;
