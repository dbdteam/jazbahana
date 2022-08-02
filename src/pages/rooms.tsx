import { useEffect, useState } from "react";
import Auth from "../components/Auth";
import Page from "../components/Layout/Page";
import RoomBox from "../components/RoomBox";
import rooms from "../data/rooms.json";
import { supabase } from "../lib/supabaseClient";

export default function Rooms() {
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    setSession(supabase.auth.session());

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  if (!session) return <Auth />;
  return (
    <Page title="Rooms">
      {rooms.map((room) => (
        <RoomBox key={room.name} room={room} />
      ))}
    </Page>
  );
}
