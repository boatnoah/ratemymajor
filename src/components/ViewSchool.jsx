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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";

import { Badge } from "@/components/ui/badge";
import { supabase } from "@/client";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const ViewSchool = () => {
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

  // Define the deletePost function here
  const deletePost = async (id) => {
    await supabase.from("posts").delete().eq("id", id);
    window.location = `/${school.uniName}`;
  };

  // Define the editPost function here
  const editPost = (postId) => {
    // Add logic to navigate to the edit post page with the postId
    window.location = `/${school.uniName}/${postId}`;
  };

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
                  <div className="flex justify-between">
                    <CardTitle>Random User</CardTitle>
                    <Dialog>
                      <DropdownMenu>
                        <DropdownMenuTrigger>...</DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem onClick={() => editPost(post.id)}>
                            Edit
                          </DropdownMenuItem>

                          <DialogTrigger asChild>
                            <DropdownMenuItem>Delete</DropdownMenuItem>
                          </DialogTrigger>
                        </DropdownMenuContent>
                      </DropdownMenu>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Are you absolutely sure?</DialogTitle>
                          <DialogDescription>
                            This action cannot be undone. This will permanently
                            delete your post.
                          </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                          <Button
                            variant="destructive"
                            onClick={() => deletePost(post.id)}
                          >
                            Yes, I understand
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
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
