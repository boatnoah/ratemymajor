import { useState, useCallback, useEffect } from "react";
import universities from "/us_institutions.json";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardDescription,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
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

const CreatePost = () => {
  const [post, setPost] = useState({
    description: "",
    major: "",
    rating: null,
    difficulty: null,
  });
  const [school, setSchool] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredUniversities, setFilteredUniversities] = useState([]);

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

  const handleChange = (event) => {
    const { id, value } = event.target;
    setPost((prev) => {
      return {
        ...prev,
        [id]: value,
      };
    });
  };
  return (
    <div>
      <NavBar />
      <Card>
        <CardHeader>Make a Post</CardHeader>
        <CardContent className="space-y-5">
          <Select className="w-[180px]" onValueChange={setSchool}>
            <SelectTrigger className="w-[500px]">
              <SelectValue id="school" placeholder="Select College" />
            </SelectTrigger>
            <SelectContent>
              <Input
                placeholder="Search..."
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {filteredUniversities &&
                filteredUniversities.map((option, i) => (
                  <SelectItem
                    key={i}
                    id="school"
                    value={option.item.institution}
                  >
                    {option.item.institution}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
          <Input id="major" onChange={handleChange} placeholder="Major" />
        </CardContent>
      </Card>
    </div>
  );
};

export default CreatePost;
