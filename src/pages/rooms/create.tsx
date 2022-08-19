import { supabaseClient, withPageAuth } from "@supabase/auth-helpers-nextjs";
import { useUser } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import Button from "../../components/Button";
import Page from "../../components/Layout/Page";

export default function CreateRoom() {
  const { user } = useUser();
  const { push } = useRouter();
  const [room, setRoom] = useState({
    name: "",
    description: "",
    is_private: false,
  });
  const { name, description, is_private } = room;

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const content = { name, description, host_id: user?.id, is_private };
    console.log(content);
    try {
      const { error, status } = await supabaseClient
        .from("rooms")
        .insert(content, { returning: "minimal" });

      if (error && status !== 406) throw error;
      push("/rooms");
    } catch (error) {
      console.log("error", error);
    }
  }

  return (
    <Page title="Create Room" className="min-h-screen flex items-center">
      <div className="w-[90%] md:w-[50%] mx-auto bg-gray-100 dark:bg-gray-800 text-center py-8 rounded-xl">
        <h1 className="text-4xl font-extrabold">Create Room</h1>
        <form className="w-[90%] mx-auto my-4" onSubmit={handleSubmit}>
          <div className="flex flex-col text-xl font-bold text-left my-4">
            <label htmlFor="name">Room Name</label>
            <input
              className="bg-gray-400/50 rounded-md p-4"
              id="name"
              type="text"
              onChange={(e) => setRoom({ ...room, name: e.target.value })}
            />
          </div>
          <div className="flex flex-col text-xl font-bold text-left my-4">
            <label htmlFor="description">Room Description</label>
            <textarea
              id="description"
              className="bg-gray-400/50 rounded-md h-32 resize-none py-2 px-4"
              onChange={(e) =>
                setRoom({ ...room, description: e.target.value })
              }
            />
          </div>

          <div className="flex flex-col text-xl font-bold text-left my-4">
            <label htmlFor="is_private">Should Your Room be Private</label>
            <input
              type="checkbox"
              id="is_private"
              name="is_private"
              checked={room.is_private}
              onChange={() =>
                setRoom({ ...room, is_private: !room.is_private })
              }
            />
          </div>

          <Button className="text-xl sm:text-2xl p-2 w-full">Create</Button>
        </form>
      </div>
    </Page>
  );
}

export const getServerSideProps = withPageAuth({ redirectTo: "/login" });
