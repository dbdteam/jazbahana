import Head from "next/head";
import { useEffect, useState } from "react";
import EditAccount from "../../components/Account/Edit";
import Auth from "../../components/Auth";
import { supabase } from "../../lib/supabaseClient";

export default function EditProfile() {
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    setSession(supabase.auth.session());

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <div>
      <Head>
        <title>Edit Profile | Jazbahana</title>
      </Head>
      {!session ? (
        <Auth />
      ) : (
        <EditAccount key={session.user.id} session={session} />
      )}
    </div>
  );
}
