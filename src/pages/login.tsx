import { Auth } from "@supabase/ui";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import { useUser } from "@supabase/auth-helpers-react";
import Card from "../components/Card";
import Button from "../components/Button";

export default function SignIn() {
  const { user, error } = useUser();

  if (!user) {
    return (
      <Card>
        {error && <p>{error.message}</p>}
        <Auth
          supabaseClient={supabaseClient}
          providers={["google"]}
          socialLayout="vertical"
          socialButtonSize="xlarge"
          magicLink
        />
      </Card>
    );
  }
  return (
    <Card className="flex justify-center flex-col items-center text-center">
      <h1 className="text-4xl font-extrabold">You are already signed in.</h1>
      <Button
        className="text-2xl sm:text-4xl my-4 p-4"
        onClick={() => supabaseClient.auth.signOut()}
      >
        Sign Out
      </Button>
    </Card>
  );
}
