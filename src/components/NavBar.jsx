import { Link, Outlet } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ModeToggle } from "./mode-toggle";

const NavBar = () => {
  return (
    <div>
      <nav>
        <ul className="flex flex-col md:flex-row justify-between items-center px-4 py-2 md:h-[80px]">
          <li className="mb-4 md:mb-0">
            <Link to="/">
              <span className="text-4xl sm:text-xl font-semibold">
                RateMyMajor
              </span>
            </Link>
          </li>
          <li className="flex gap-5">
            <Link to="/create-post">
              <Button className="rounded-3xl">Make a Post</Button>
            </Link>
            <ModeToggle />
          </li>
        </ul>
        <Separator className="w-full" />
        <Outlet />
      </nav>
    </div>
  );
};

export default NavBar;
