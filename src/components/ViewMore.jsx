import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { Textarea } from "@/components/ui/textarea";
import NavBar from "@/components/NavBar";
import { Badge } from "@/components/ui/badge";
import { GraduationCap } from "lucide-react";

const ViewMore = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const getUserData = async () => {
      const { data, error } = await supabase.auth.getUser();

      if (error) {
        console.log("error", error);
        setUser({ aud: "not" });
      } else {
        setUser(data.user);
      }
    };

    getUserData();
  }, []);

  const postId = useParams();
  const [post, setPost] = useState({});
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [canMakeComments, setMakeComments] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await supabase
        .from("posts")
        .select("*")
        .eq("id", postId.postid)
        .single();

      setPost(data);
      setLikes(data.likes);
      setDislikes(data.dislikes);
    };

    fetchData();
  }, [postId.postid]);

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
    await supabase
      .from("posts")
      .update({ likes: post.likes + 1 })
      .eq("id", postId.postid)
      .single();

    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .eq("id", postId.postid)
      .single();

    if (error) {
      console.log("failed look up");
    }

    setPost(data);
    setLikes(data.likes);
  };

  const decrementLikes = async () => {
    await supabase
      .from("posts")
      .update({ dislikes: post.dislikes + 1 })
      .eq("id", postId.postid)
      .single();

    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .eq("id", postId.postid)
      .single();

    if (error) {
      console.error();
    }

    setPost(data);
    setDislikes(data.dislikes);
  };

  // Comments
  const [commentData, setCommentData] = useState({});
  const [userComment, setUserComment] = useState({
    text: "",
    upvotes: 0,
    downvotes: 0,
  });
  const [triggerRefresh, setTriggerRefresh] = useState(false);
  const { toast } = useToast();

  // Fetch all comments
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await supabase
        .from("comments")
        .select()
        .eq("post_id", postId.postid)
        .order("created_at", { ascending: false });

      setCommentData(data);
      setTriggerRefresh(false);
    };

    fetchData();
  }, [postId.postid, triggerRefresh]);

  const handleClick = () => {
    setMakeComments(true);
  };

  const handleChange = (id, value) => {
    setUserComment((prev) => {
      return {
        ...prev,
        [id]: value,
      };
    });
  };

  const handleComment = async (event) => {
    event.preventDefault();

    if (!userComment.text) {
      toast({
        title: "Uh oh!",
        description: "Comment cannot be empty.",
      });
      return;
    }

    // todo make sure logout users cannot make comments
    await supabase
      .from("comments")
      .insert({
        name: user.user_metadata.name,
        picture: user.user_metadata.picture,
        user_id: user.id,
        post_id: postId.postid,
        text: userComment.text,
      })
      .select();

    setTriggerRefresh(true);
    setMakeComments(false);
  };

  const handleUpVotes = async (user_Id) => {
    const { data } = await supabase
      .from("comments")
      .select("upvotes")
      .eq("id", user_Id)
      .single();

    const upVoteData = data.upvotes;

    await supabase
      .from("comments")
      .update({ upvotes: upVoteData + 1 })
      .eq("id", user_Id)
      .single();

    setTriggerRefresh(true);
  };

  const handleDownVotes = async (user_Id) => {
    const { data, error } = await supabase
      .from("comments")
      .select("downvotes")
      .eq("id", user_Id)
      .single();

    if (error) {
      console.log(error);
    }

    const downVoteData = data.downvotes;
    await supabase
      .from("comments")
      .update({ downvotes: downVoteData + 1 })
      .eq("id", user_Id)
      .single();

    setTriggerRefresh(true);
  };
  return (
    <div>
      <NavBar />

      <div className="flex flex-col items-center justify-center gap-5 mt-10">
        {post && (
          <Card className="w-1/2">
            <CardHeader>
              <CardTitle className="flex justify-between">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={`${post.picture}`} />
                    <AvatarFallback>OP</AvatarFallback>
                  </Avatar>
                  {post.name}
                </div>
                {user.id === post.user_id ? (
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
                ) : (
                  <></>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              <CardTitle>{post.school}</CardTitle>
              <Badge className="flex gap-2 w-[175px] my-2">
                <span>
                  <GraduationCap />
                </span>
                <span>{post.major}</span>
              </Badge>

              <div className="flex gap-5">
                <span className="text-xl">Rating: {post.rating}</span>
                <span className="text-xl">Difficulty: {post.difficulty}</span>
              </div>
              <CardDescription>{post.description}</CardDescription>
            </CardContent>
            <CardFooter className="flex gap-3">
              <div className="flex items-center gap-2">
                <Button
                  className="inline-flex items-center rounded-full bg-green-500 px-3 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                  onClick={incrementLikes}
                >
                  <ThumbsUpIcon className="mr-2 h-5 w-5" />
                  <span>{likes}</span>
                </Button>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  className="inline-flex items-center rounded-full bg-red-500 px-3 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                  onClick={decrementLikes}
                >
                  <ThumbsDownIcon className="mr-2 h-5 w-5" />
                  <span>{dislikes}</span>
                </Button>
              </div>
            </CardFooter>
          </Card>
        )}

        {commentData && commentData.length > 0
          ? commentData.map((comment) => (
              <Card className="w-1/2" key={comment.user_id}>
                <CardHeader>
                  <CardTitle>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={`${comment.picture}`} />
                        <AvatarFallback>OP</AvatarFallback>
                      </Avatar>
                      {comment.name}
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{comment.text}</CardDescription>
                </CardContent>
                <CardFooter className="flex gap-3">
                  <div className="flex items-center gap-2">
                    <Button
                      className="inline-flex items-center rounded-full bg-green-500 px-3 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                      onClick={() => handleUpVotes(comment.id)}
                    >
                      <ThumbsUpIcon className="mr-2 h-5 w-5" />
                      <span>{comment.upvotes}</span>
                    </Button>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      className="inline-flex items-center rounded-full bg-red-500 px-3 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                      onClick={() => handleDownVotes(comment.id)}
                    >
                      <ThumbsDownIcon className="mr-2 h-5 w-5" />
                      <span>{comment.downvotes}</span>
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))
          : user.aud === "authenticated" && (
              <h1 className="text-lg font-bold">Be first to comment!</h1>
            )}

        {canMakeComments && (
          <Card className="w-1/2">
            <CardHeader>
              <CardTitle className="text-md">Add a Comment</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                onChange={(e) => handleChange("text", e.target.value)}
              />
            </CardContent>
            <CardFooter>
              <Button onClick={handleComment}>Comment</Button>
            </CardFooter>
          </Card>
        )}

        {user.aud === "authenticated" ? (
          <Button
            onClick={handleClick}
            className="w-1/2 rounded-full"
            variant="outline"
          >
            Add a comment
          </Button>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default ViewMore;
