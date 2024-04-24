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

  return (
    <div>
      <Card>
        <CardHeader></CardHeader>
      </Card>
    </div>
  );
};

export default ViewMore;
