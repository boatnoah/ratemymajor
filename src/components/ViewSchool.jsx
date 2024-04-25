import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
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
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const ViewSchool = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const getUserData = async () => {
      const { data, error } = await supabase.auth.getUser();

      if (error) {
        console.log("error", error);
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

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const { data } = await supabase
        .from("posts")
        .select("*")
        .eq("school", school.uniName)
        .order("created_at", { ascending: true });

      setAllMajors(data);
      setIsLoading(false);
    };

    fetchData();
    console.error();
  }, [school.uniName]);

  return (
    <div className="flex flex-col gap-5">
      <NavBar />

      <Separator />
      <h1 className="text-3xl font-bold m-10 text-center">
        {school.uniName.replace("-", ", ")}
      </h1>
      <Separator />
      <div className="flex justify-center items-center">
        {isLoading ? (
          <Loader2 className="justify-center animate-spin" />
        ) : allMajors.length > 0 ? (
          allMajors.map((post) => (
            <Link key={post.id} to={`/viewMore/${post.id}`}>
              <Card key={post.id} className="w-[472px]">
                <CardHeader>
                  <Avatar>
                    <AvatarImage src={`${post.picture}`} />
                    <AvatarFallback>
                      {post.name[0] + post.name[post.name.length - 1]}
                    </AvatarFallback>
                  </Avatar>
                  <CardTitle>{post.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <Badge>{post.major}</Badge>
                  <CardDescription>{post.description}</CardDescription>
                </CardContent>
              </Card>
            </Link>
          ))
        ) : (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">
                Be the first to make a post for your school!
              </CardTitle>
            </CardHeader>
            <CardFooter className="flex justify-center items-center">
              <Link to="/create-post">
                <Button>Make a Post</Button>
              </Link>
            </CardFooter>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ViewSchool;
