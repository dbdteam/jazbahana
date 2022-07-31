import { useEffect, useState } from "react";
import ViewAccount from "../../components/Account/View";
import Auth from "../../components/Auth";
import Page from "../../components/Main/Page";
import { supabase } from "../../lib/supabaseClient";

export default function Profile() {
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    setSession(supabase.auth.session());

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  if (!session) return <Auth />;

  return (
    <Page title="Profile">
      <ViewAccount key={session.user.id} session={session} />
    </Page>
  );
}
