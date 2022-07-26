import { useEffect, useState } from "react";
import ViewAccount from "../../components/Account/View";
import Auth from "../../components/Auth";
import { supabase } from "../../utils/supabaseClient";

export default function Profile() {
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    setSession(supabase.auth.session());

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <div>
      {!session ? (
        <Auth />
      ) : (
        <div>
          <ViewAccount key={session.user.id} session={session} />
        </div>
      )}
    </div>
  );
}
