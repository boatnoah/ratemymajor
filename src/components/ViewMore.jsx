import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/client";
import {
  Card,
  CardHeader,
  CardContent,
  CardDescription,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ThumbsUpIcon } from "@/assets/thumbsupIcon";
import { ThumbsDownIcon } from "@/assets/thumbsDownIcon";

const ViewMore = () => {
  const postId = useParams();
  const [post, setPost] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await supabase
        .from("posts")
        .select("*")
        .eq("id", postId.postid)
        .single();

      setPost(data);
    };

    fetchData();
  }, [postId.postid]);

  const [likes, setLikes] = useState(post.likes || 0);
  const [dislikes, setDislikes] = useState(post.dislikes || 0);

  const editPost = (postId) => {
    // Add logic to navigate to the edit post page with the postId
    window.location = `/${post.school}/${postId}`;
  };

  const deletePost = async (id) => {
    await supabase.from("posts").delete().eq("id", id);
    window.location = `/${post.school}`;
  };
  // TODO
  const incrementLikes = async () => {
    setLikes(likes + 1);
    const { data, error } = await supabase
      .from("posts")
      .update({ likes: likes + 1 })
      .eq("id", postId.postid)
      .single();

    if (error) {
      throw new Error(error.message);
    }
    setPost(data);
  };

  const decrementLikes = async () => {
    setDislikes(dislikes + 1);
    const { data, error } = await supabase
      .from("posts")
      .update({ dislikes: dislikes + 1 })
      .eq("id", postId.postid)
      .single();

    if (error) {
      throw new Error(error.message);
    }
    setPost(data);
  };

  // Comments
  const [commentData, setCommentData] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await supabase
        .from("comments")
        .select("*")
        .eq("post_id", postId.postid)
        .single();

      setCommentData(data);
    };

    fetchData();
  }, [postId.postid]);

  return (
    <div>
      <Card>
        <CardHeader>
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
                  This action cannot be undone. This will permanently delete
                  your post.
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
        </CardHeader>
        <CardContent>
          <CardDescription>{post.school}</CardDescription>
          <CardDescription>{post.major}</CardDescription>
          <CardDescription>{post.description}</CardDescription>
          <CardDescription>Rating: {post.rating}</CardDescription>
          <CardDescription>Diffcult: {post.difficulty}</CardDescription>
        </CardContent>
        <CardFooter>
          <div className="flex items-center gap-2">
            <Button
              className="inline-flex items-center rounded-full bg-green-500 px-3 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              onClick={incrementLikes}
            >
              <ThumbsUpIcon className="mr-2 h-5 w-5" />
              <span>{post.likes}</span>
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <Button
              className="inline-flex items-center rounded-full bg-red-500 px-3 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              onClick={decrementLikes}
            >
              <ThumbsDownIcon className="mr-2 h-5 w-5" />
              <span>{post.dislikes}</span>
            </Button>
          </div>
        </CardFooter>
      </Card>

      <Button className="w-full rounded-full" variant="outline">
        Add a comment
      </Button>

      {commentData && (
        <Card>
          <CardHeader>
            <CardTitle>Random User</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>{commentData.text}</CardDescription>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ViewMore;
