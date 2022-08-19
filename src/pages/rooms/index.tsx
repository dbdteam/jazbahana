import { supabaseClient, withPageAuth } from "@supabase/auth-helpers-nextjs";
import { IconUsers } from "@supabase/ui";
import { useTheme } from "next-themes";
import Link from "next/link";
import Button from "../../components/Button";
import Card from "../../components/Card";
import Page from "../../components/Layout/Page";
import timeSince from "../../lib/timeSince";

function Room({ room }: { room: Room }) {
  const { theme } = useTheme();
  const { publicURL, error } = supabaseClient.storage
    .from("avatars")
    .getPublicUrl(room.profiles.avatar_url);

  if (error) throw error;

  return (
    <Card className="max-w-[720px]">
      <div className="flex items-center justify-between">
        <a
          href={`/u/${room.profiles.username}`}
          className="flex items-center gap-2 font-semibold"
        >
          <div className="border-2 border-blue-500 rounded-full h-8">
            <img
              src={publicURL || "/images/avatar.svg"}
              alt="Profile Picture"
              className="rounded-full object-cover"
              width={28}
              height={28}
            />
          </div>
          <span>@{room.profiles.username}</span>
        </a>
        <span>{timeSince(room.created_at)}</span>
      </div>
      <div className="border-b-2 py-4">
        <a href={`/rooms/${room.id}`} className="text-2xl font-extrabold">
          {room.name}
        </a>
        <p>{room.description}</p>
      </div>
      <div className="flex items-center justify-between pt-4">
        <p className="flex items-center gap-2">
          <IconUsers
            style={{
              width: 24,
              height: 24,
              fill: theme === "light" ? "black" : "white",
            }}
          />{" "}
          {room.participants.length} participants
        </p>
        {/* <div className="flex gap-2">
          {room.topics &&
            room.topics.map((topic) => <span className="text-xs border-2 p-1 rounded-md" key={topic}>{topic}</span>)}
        </div> */}
      </div>
    </Card>
  );
}

export default function Rooms({ rooms }: { rooms: Room[] }) {
  if (!rooms) {
    return (
      <Card>
        <h1 className="text-center text-4xl font-extrabold">No rooms yet...</h1>
      </Card>
    );
  }
  return (
    <Page title="Rooms" className="min-h-screen">
      <Link href="/rooms/create">
        <a>
          <Button className="text-xl sm:text-2xl p-2 w-full">
            Create Room
          </Button>
        </a>
      </Link>
      {rooms.map((room) => (
        <Room key={room.name} room={room} />
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
      .select("*, profiles!inner(username, avatar_url), participants(*)")
      .order("created_at", { ascending: false });

    if (error && status !== 406) throw error;

    return { props: { rooms } };
  },
});
