import { Auth } from "@supabase/ui";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import { useUser } from "@supabase/auth-helpers-react";
import Card from "../components/Card";

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
    <Card>
      <h1>You are already signed in.</h1>
      <button className="main" onClick={() => supabaseClient.auth.signOut()}>
        Sign Out
      </button>
    </Card>
  );
}
