import { useEffect, useState } from "react";
import EditAccount from "../../components/Account/Edit";
import Auth from "../../components/Auth";
import { supabase } from "../../utils/supabaseClient";

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
      {!session ? (
        <Auth />
      ) : (
        <div>
          <EditAccount key={session.user.id} session={session} />
        </div>
      )}
    </div>
  );
}
