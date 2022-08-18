import type { GetServerSidePropsContext } from "next";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import Page from "../../../components/Layout/Page";
import Card from "../../../components/Card";
import { IconChevronLeft, IconEdit, IconTrash } from "@supabase/ui";
import Link from "next/link";
// import timeSince from "../../../lib/timeSince";
import { useRouter } from "next/router";

export async function getServerSideProps({ query }: GetServerSidePropsContext) {
  if (!query.id || typeof query.id !== "string") {
    alert("Query parameters for only one room can be taken.");
    return;
  }
  const { data: room, error } = await supabaseClient
    .from<Room>("rooms")
    .select()
    .eq("id", query.id)
    .single();

  if (!room || error) {
    return { notFound: true };
  }
  return { props: { room } };
}

export default function Room({ room }: { room: Room }) {
  const { push } = useRouter();
  const deleteRoom = async () => {
    try {
      const { error, status } = await supabaseClient
        .from("rooms")
        .delete({ returning: "minimal" })
        .eq("id", room.id);
      if (error && status !== 406) throw error;
      push("/rooms");
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <Page title={room.name}>
      <Card>
        <div className="flex items-center justify-between">
          <Link href="/rooms">
            <a className="px-2 py-1 cursor-pointer flex items-center gap-2 hover:rounded-full hover:bg-black hover:duration-500">
              <IconChevronLeft /> Back
            </a>
          </Link>
          {/* <div>created {timeSince(room.created_at)}</div> */}
          <div className="flex gap-2">
            <Link href={`/rooms/${room.id}/edit`}>
              <a>
                <IconEdit />
              </a>
            </Link>
            <button onClick={deleteRoom}>
              <IconTrash />
            </button>
          </div>
        </div>
        <h1 className="text-center text-[3rem] my-8">{room.name}</h1>
        <p>{room.description}</p>
      </Card>
    </Page>
  );
}
