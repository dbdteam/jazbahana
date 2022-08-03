import { withPageAuth } from "@supabase/auth-helpers-nextjs";
import Page from "../components/Layout/Page";
import RoomBox from "../components/RoomBox";
import rooms from "../data/rooms.json";

export default function Rooms() {
  return (
    <Page title="Rooms">
      {rooms.map((room) => (
        <RoomBox key={room.name} room={room} />
      ))}
    </Page>
  );
}

export const getServerSideProps = withPageAuth({ redirectTo: "/login" });
