import type { GetServerSidePropsContext } from "next";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import Page from "../../components/Layout/Page";
import Card from "../../components/Card";
import { IconChevronLeft, IconDelete, IconEdit, IconTrash } from "@supabase/ui";
import Link from "next/link";
import timeSince from "../../lib/timeSince";

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
  return (
    <Page title={room.name}>
      <Card>
        <div className="flex items-center justify-between">
          <Link href="/rooms">
            <div className="px-2 py-1 cursor-pointer flex items-center gap-2 hover:rounded-full hover:bg-black hover:duration-500">
              <IconChevronLeft /> Back
            </div>
          </Link>
          <div>created {timeSince(room.created_at)}</div>
          <div className="flex gap-2">
            <Link href="#edit">
              <IconEdit />
            </Link>
            <Link href="#delete">
              <IconTrash />
            </Link>
          </div>
        </div>
        <h1 className="text-center text-[3rem] my-8">{room.name}</h1>
        <p>{room.description}</p>
      </Card>
    </Page>
  );
}
