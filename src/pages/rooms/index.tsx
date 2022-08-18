import { supabaseClient, withPageAuth } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import Card from "../../components/Card";
import Page from "../../components/Layout/Page";
import RoomBox from "../../components/Rooms/RoomBox";

export default function Rooms({ rooms }: { rooms: Room[] }) {
  if (!rooms) {
    return (
      <Card>
        <h1 className="text-center text-4xl">No rooms yet...</h1>
      </Card>
    );
  }
  return (
    <Page title="Rooms" className="min-h-screen">
      <Link href="/create/room">
        <a>
          <button className="submit">Create Room</button>
        </a>
      </Link>
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
