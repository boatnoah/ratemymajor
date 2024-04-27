import { Link, Outlet } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ModeToggle } from "@/components/mode-toggle";
import { supabase } from "@/client";
import { useState, useEffect } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
const NavBar = () => {
  const [isSignedIn, setSignedIn] = useState(false);
  const [user, setUser] = useState({});
  const { toast } = useToast();
  const navigate = useNavigate();
  useEffect(() => {
    const getUserData = async () => {
      const { data, error } = await supabase.auth.getUser();

      if (error) {
        console.log("error", error);
      }
      if (!data.user) {
        console.log("logged out");
        return;
      }

      if (data.user.aud === "authenticated") {
        console.log("logged in");
        setSignedIn(true);
        setUser(data.user);
      } else {
        setSignedIn(false);
      }
    };

    getUserData();
  }, []);

  const logOut = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.log("Failed to logout", error);
    }

    setSignedIn(false);

    navigate("/");

    toast({
      title: "Log Out Success",
      description: "You are logged out.",
    });
  };

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
              <>
                <Link to="/create-post">
                  <Button className="rounded-3xl">Make a Post</Button>
                </Link>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Avatar>
                      <AvatarImage src={`${user.user_metadata.picture}`} />
                      <AvatarFallback>OP</AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={logOut}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
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
