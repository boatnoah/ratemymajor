import NavBar from "@/components/NavBar";
import { useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const ViewSchool = () => {
  const school = useParams();
  return (
    <div>
      <NavBar />
      <h1 className="text-2xl font-bold m-10 text-center">
        {school.uniName.replace("-", ", ")}
      </h1>
      <Card className="w-[472px]">
        <CardHeader>
          <CardTitle>Random User</CardTitle>
          <Badge>Computer Science</Badge>
        </CardHeader>
        <CardContent>
          <CardDescription>
            Pretty mid program. Very underfunded, horrible profs, and they only
            teach in python
          </CardDescription>
        </CardContent>
      </Card>
    </div>
  );
};

export default ViewSchool;
