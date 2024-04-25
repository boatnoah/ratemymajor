import { Link, Outlet } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ModeToggle } from "@/components/mode-toggle";
import { supabase } from "@/client";
import { useState, useEffect } from "react";
const NavBar = () => {
  const [isSignedIn, setSignedIn] = useState(false);
  useEffect(() => {
    const getUserData = async () => {
      const { data, error } = await supabase.auth.getUser();

      if (error) {
        console.log("error", error);
      }
      if (data.user.aud === "authenticated") {
        console.log("logged in");
        setSignedIn(true);
      } else {
        console.log("user data", data.user);
        setSignedIn(false);
      }
    };

    getUserData();
  }, []);
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
            {isSignedIn ? (
              <Link to="/create-post">
                <Button className="rounded-3xl">Make a Post</Button>
              </Link>
            ) : (
              <Link to="/login">
                <Button variant="link">Log In</Button>
              </Link>
            )}
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
