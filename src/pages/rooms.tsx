import { supabaseClient, withPageAuth } from "@supabase/auth-helpers-nextjs";
import Page from "../components/Layout/Page";
import RoomBox from "../components/Rooms/RoomBox";

export default function Rooms({ rooms }: { rooms: Room[] }) {
  return (
    <Page title="Rooms">
      {rooms.map((room) => (
        <RoomBox key={room.name} room={room} />
      ))}
    </Page>
  );
}

export const getServerSideProps = withPageAuth({
  redirectTo: "/login",
  async getServerSideProps() {
    const {
      data: rooms,
      error,
      status,
    } = await supabaseClient
      .from<Room>("rooms")
      .select("*, profiles!inner(username, avatar_url)")
      .order("created_at", { ascending: false });

    if (error && status !== 406) throw error;

    return { props: { rooms } };
  },
});
