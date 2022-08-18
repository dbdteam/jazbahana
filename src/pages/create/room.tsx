import { supabaseClient, withPageAuth } from "@supabase/auth-helpers-nextjs";
import { useUser } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
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
    } catch (error: any) {
      console.log("error", error.message);
    }
  }

  return (
    <Page title="Create Room" className="flex h-screen items-center">
      <div className="w-[90%] md:w-[50%] mx-auto bg-dark text-center py-8 rounded-xl">
        <h1>Create Room</h1>
        <form className="w-[90%] mx-auto my-4" onSubmit={handleSubmit}>
          <div className="labeled-input">
            <label htmlFor="name">Room Name</label>
            <input
              className="mb-4 p-4"
              id="name"
              type="text"
              onChange={(e) => setRoom({ ...room, name: e.target.value })}
            />
          </div>
          <div className="labeled-input">
            <label htmlFor="description">Room Description</label>
            <textarea
              id="description"
              onChange={(e) =>
                setRoom({ ...room, description: e.target.value })
              }
            />
          </div>

          <label htmlFor="is_private">Should Your Room be Private</label>
          <input
            type="checkbox"
            id="is_private"
            name="is_private"
            checked={room.is_private}
            onChange={() => setRoom({ ...room, is_private: !room.is_private })}
          />

          <button className="submit">Create</button>
        </form>
      </div>
    </Page>
  );
}

export const getServerSideProps = withPageAuth({ redirectTo: "/login" });
