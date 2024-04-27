import { supabase } from "@/client";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const LoginPage = () => {
  const navigate = useNavigate();
  supabase.auth.onAuthStateChange(async (event) => {
    if (event === "SIGNED_OUT") {
      navigate("/");
    }
  });
  return (
    <div className="flex flex-row min-h-screen justify-center items-center">
      <Card className="w-[500px] p-10">
        <CardHeader>
          <CardTitle>Log In</CardTitle>
        </CardHeader>
        <CardContent>
          <Auth
            supabaseClient={supabase}
            appearance={{ theme: ThemeSupa }}
            providers={["google"]}
            onlyThirdPartyProviders
          />
        </CardContent>
        <CardFooter>
          <Button asChild>
            <Link to="/">Go Back</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoginPage;
