import { useState, useCallback, useEffect } from "react";
import universities from "/us_institutions.json";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Card,
  CardHeader,
  CardContent,
  CardDescription,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import NavBar from "@/components/NavBar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import Fuse from "fuse.js";
import { supabase } from "@/client";

const CreatePost = () => {
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

  const [post, setPost] = useState({
    description: "",
    major: "",
    rating: null,
    difficulty: null,
    school: "",
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredUniversities, setFilteredUniversities] = useState([]);
  const { toast } = useToast();
  const difficulty = {
    1: "Very Easy",
    2: "Easy",
    3: "Average",
    4: "Difficult",
    5: "Very Difficult",
  };
  const ratings = {
    1: "Awful Major",
    2: "OK Major",
    3: "Good Major",
    4: "Great Major",
    5: "Awesome Major",
  };
  const fuse = new Fuse(universities, {
    keys: ["institution"],
    includeMatches: true,
    threshold: 0.3,
  });

  const handleSearch = useCallback(
    (query) => {
      const results = fuse.search(query, { limit: 10 });
      setFilteredUniversities(results);
    },
    [fuse],
  );

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      handleSearch(searchQuery);
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery, handleSearch]);

  const handleChange = (id, value) => {
    setPost((prev) => {
      return {
        ...prev,
        [id]: value,
      };
    });
  };

  const makePost = async (event) => {
    event.preventDefault();
    if (
      !post.description ||
      !post.difficulty ||
      !post.rating ||
      !post.school ||
      !post.major
    ) {
      toast({
        title: "Uh oh!",
        description: "Please fill out all input fields",
      });
      return;
    }

    await supabase
      .from("posts")
      .insert({
        name: user.user_metadata.full_name,
        picture: user.user_metadata.picture,
        user_id: user.id,
        description: post.description,
        difficulty: post.difficulty,
        rating: post.rating,
        school: post.school,
        major: post.major,
      })
      .select();
    window.location = `/${post.school}`;
  };

  return (
    <div>
      <NavBar />
      <Card>
        <CardHeader>
          <CardTitle>Make a Post</CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          <Select
            className="w-[180px]"
            onValueChange={(value) => handleChange("school", value)}
          >
            <SelectTrigger className="w-[500px]">
              <SelectValue placeholder="Select College" />
            </SelectTrigger>
            <SelectContent>
              <Input
                placeholder="Search..."
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {filteredUniversities &&
                filteredUniversities.map((option, i) => (
                  <SelectItem key={i} value={option.item.institution}>
                    {option.item.institution}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
          <Input
            id="major"
            onChange={(event) => handleChange("major", event.target.value)}
            placeholder="Major"
          />
          <div className="flex flex-col gap-5">
            <h1 className="text-lg font-bold">
              Rating: {post.rating} - {ratings[post.rating]}
            </h1>
            <Slider
              className="w-[100px]"
              min={1}
              max={5}
              step={1}
              onValueChange={(value) => handleChange("rating", value[0])}
            />
          </div>
          <div className="flex flex-col gap-5">
            <h1 className="text-lg font-bold">
              Difficulty: {post.difficulty} - {difficulty[post.difficulty]}
            </h1>
            <Slider
              className="w-[100px]"
              min={1}
              max={5}
              step={1}
              onValueChange={(value) => handleChange("difficulty", value[0])}
            />
          </div>
          <CardDescription>
            <Textarea
              id="description"
              onChange={(event) =>
                handleChange("description", event.target.value)
              }
              placeholder="Share your thoughts..."
            />
          </CardDescription>
          <CardFooter>
            <Button onClick={makePost}>Submit</Button>
          </CardFooter>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreatePost;
