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

const ViewMore = () => {
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
      .eq("user_id", user_Id)
      .single();

    const upVoteData = data.upvotes;

    await supabase
      .from("comments")
      .update({ upvotes: upVoteData + 1 })
      .eq("user_id", user_Id)
      .single();

    setTriggerRefresh(true);
  };

  const handleDownVotes = async (user_Id) => {
    const { data } = await supabase
      .from("comments")
      .select("downvotes")
      .eq("user_id", user_Id)
      .single();

    const downVoteData = data.downvotes;

    await supabase
      .from("comments")
      .update({ downvotes: downVoteData + 1 })
      .eq("user_id", user_Id)
      .single();

    setTriggerRefresh(true);
  };
  console.log(post);
  return (
    <div>
      <NavBar />
      {post && (
        <Card>
          <CardHeader>
            <CardTitle>
              <Avatar>
                <AvatarImage src={`${post.picture}`} />
                <AvatarFallback>OP</AvatarFallback>
              </Avatar>
              {post.name}
            </CardTitle>
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
            ) : (
              <></>
            )}
          </CardHeader>
          <CardContent>
            <CardDescription>{post.school}</CardDescription>
            <CardDescription>{post.major}</CardDescription>
            <CardDescription>{post.description}</CardDescription>
            <CardDescription>Rating: {post.rating}</CardDescription>
            <CardDescription>Diffculty: {post.difficulty}</CardDescription>
          </CardContent>
          <CardFooter>
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

      {commentData && commentData.length > 0 ? (
        commentData.map((comment) => (
          <Card key={comment.user_id}>
            <CardHeader>
              <Avatar>
                <AvatarImage src={`${comment.picture}`} />
                <AvatarFallback>C</AvatarFallback>
              </Avatar>
              <CardTitle>{comment.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>{comment.text}</CardDescription>
            </CardContent>
            <CardFooter>
              <div className="flex items-center gap-2">
                <Button
                  className="inline-flex items-center rounded-full bg-green-500 px-3 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                  onClick={() => handleUpVotes(comment.user_id)}
                >
                  <ThumbsUpIcon className="mr-2 h-5 w-5" />
                  <span>{comment.upvotes}</span>
                </Button>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  className="inline-flex items-center rounded-full bg-red-500 px-3 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                  onClick={() => handleDownVotes(comment.user_id)}
                >
                  <ThumbsDownIcon className="mr-2 h-5 w-5" />
                  <span>{comment.downvotes}</span>
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))
      ) : (
        <>Be first to comment!</>
      )}

      {canMakeComments && (
        <Card>
          <CardHeader>
            <CardTitle className="text-md">Add a Comment</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea onChange={(e) => handleChange("text", e.target.value)} />
          </CardContent>
          <CardFooter>
            <Button onClick={handleComment}>Comment</Button>
          </CardFooter>
        </Card>
      )}

      <Button
        onClick={handleClick}
        className="w-full rounded-full"
        variant="outline"
      >
        Add a comment
      </Button>
    </div>
  );
};

export default ViewMore;
