import { Auth } from "@supabase/ui";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import { useUser } from "@supabase/auth-helpers-react";

export default function SignIn() {
  const { user, error } = useUser();

  if (!user) {
    return (
      <div className="flex items-center h-screen">
        <div className="bg-dark max-w-[48ch] mx-auto p-10 m-10">
          {error && <p>{error.message}</p>}
          <Auth
            supabaseClient={supabaseClient}
            providers={["google"]}
            socialLayout="vertical"
            socialButtonSize="xlarge"
            magicLink
          />
        </div>
      </div>
    );
  }
  return (
    <div className="flex items-center h-screen">
      <div className="bg-dark max-w-[48ch] mx-auto p-10 m-10">
        <h1>You are already signed in.</h1>
        <button className="main" onClick={() => supabaseClient.auth.signOut()}>
          Sign Out
        </button>
      </div>
    </div>
  );
}
