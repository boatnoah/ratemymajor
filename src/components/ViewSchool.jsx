import { useParams, Link } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import { formatDistanceStrict } from "date-fns";
import NavBar from "@/components/NavBar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/client";
import { Loader2 } from "lucide-react";
import { GraduationCap } from "lucide-react";
import { ThumbsUp } from "lucide-react";
import { ThumbsDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CalendarFold } from "lucide-react";
const ViewSchool = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const getUserData = async () => {
      const { data, error } = await supabase.auth.getUser();

      if (error) {
        console.log("error", error);
        return;
      } else {
        console.log("user data", data.user);
        setUser(data.user);
      }
    };

    getUserData();
  }, []);
  const school = useParams();
  const [allMajors, setAllMajors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showRecent, setShowRecent] = useState(true);
  const [orderBy, setOrderBy] = useState("created_at");
  const [buttonPressed, setButtonPressed] = useState("secondary");
  const [otherButton, setOtherButton] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const { data } = await supabase
        .from("posts")
        .select("*")
        .eq("school", school.uniName)
        .order(`${orderBy}`, { ascending: showRecent });

      setAllMajors(data);
      setIsLoading(false);
    };

    fetchData();
    console.error();
  }, [school.uniName, showRecent, orderBy]);

  const formatTimestamp = useMemo(() => {
    return (timestamp) => {
      const date = new Date(timestamp);
      return formatDistanceStrict(date, new Date(), {
        addSuffix: true,
        includeSeconds: true,
      });
    };
  }, []);
  console.log("user state", user);
  return (
    <div className="flex flex-col gap-5">
      <div>
        <NavBar />
        <h1 className="text-3xl font-bold m-10 text-center">
          {school.uniName.replace("-", ", ")}
        </h1>
      </div>
      <Separator />
      {allMajors && allMajors.length > 0 && (
        <div className="flex gap-2 pl-10">
          <Button
            variant={`${buttonPressed}`}
            onClick={() => {
              setShowRecent(!showRecent);
              setButtonPressed("");
              setOtherButton("secondary");
            }}
          >
            Recent
          </Button>
          <Button
            variant={`${otherButton}`}
            onClick={() => {
              setOrderBy(orderBy === "likes" ? "created_at" : "likes");
              setButtonPressed("secondary");
              setOtherButton("");
            }}
          >
            Trending
          </Button>
        </div>
      )}
      <div className="mx-auto grid max-4xl grid-cols-3 gap-4 p-10 justify-center">
        {isLoading ? (
          <Loader2 className="justify-center animate-spin" />
        ) : allMajors && allMajors.length > 0 ? (
          allMajors.map((post) => (
            <div
              key={post.id}
              className="block transition-transform duration-300 hover:scale-105"
            >
              <Link to={`/viewMore/${post.id}`} className="block">
                <Card className="shadow-lg">
                  <CardHeader className="flex">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={`${post.picture}`} />
                        <AvatarFallback>
                          {post.name[0] + post.name[post.name.length - 1]}
                        </AvatarFallback>
                      </Avatar>
                      <CardTitle>{post.name}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Badge className="flex gap-2 w-[175px] mt-[-10px]">
                      <span>
                        <GraduationCap />
                      </span>
                      <span>{post.major}</span>
                    </Badge>
                    <CardTitle className="text-lg mt-5">
                      {post.name + "'s"} review
                    </CardTitle>
                    <CardDescription className="mt-2">
                      {post.description}
                    </CardDescription>
                  </CardContent>
                  <CardFooter className="flex h-5 items-center space-x-4 text-sm">
                    <ThumbsUp />
                    <span>{post.likes}</span>
                    <ThumbsDown />
                    <span>{post.dislikes}</span>
                    <CalendarFold />
                    <span>{formatTimestamp(post.created_at)}</span>
                  </CardFooter>
                </Card>
              </Link>
            </div>
          ))
        ) : (
          <div className="col-span-3 flex justify-center items-center">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  Be the first to make a post for your school!
                </CardTitle>
              </CardHeader>
              <CardFooter className="flex justify-center items-center">
                {user.aud === "authenticated" ? (
                  <Link to="/create-post">
                    <Button>Make a Post</Button>
                  </Link>
                ) : (
                  <Link to="/login">
                    <Button>Login</Button>
                  </Link>
                )}
              </CardFooter>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewSchool;
