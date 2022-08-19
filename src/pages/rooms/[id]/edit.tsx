import { supabaseClient, withPageAuth } from "@supabase/auth-helpers-nextjs";
import { useUser } from "@supabase/auth-helpers-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import Button from "../../../components/Button";
import Page from "../../../components/Layout/Page";

export default function EditRoom() {
  const { user } = useUser();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [is_private, setIsPrivate] = useState(false);

  useEffect(() => {
    async function setRoom() {
      const {
        data: room,
        error,
        status,
      } = await supabaseClient
        .from<Room>("rooms")
        .select()
        .eq("host_id", user?.id)
        .single();

      if (error && status !== 406) throw error;

      setName(room?.name || "jojo");
      setDescription(room?.description || "kimi yo no boken, eyes of heaven");
      setIsPrivate(room?.is_private || false);
    }
    setRoom();
  });

  async function updateRoom({
    name,
    description,
    is_private,
  }: {
    name: string;
    description: string;
    is_private: boolean;
  }) {
    try {
      const { error, status } = await supabaseClient
        .from("rooms")
        .upsert({ name, description, is_private }, { returning: "minimal" });

      if (error && status !== 406) throw error;
    } catch (error) {
      console.log("error", error);
    }
  }

  return (
    <Page title="Edit Profile" className="min-h-screen flex items-center">
      <div className="w-[90%] md:w-[50%] mx-auto bg-gray-100 dark:bg-gray-800 text-center py-8 rounded-xl">
        <div className="w-[90%] mx-auto">
          <h1 className="text-4xl font-extrabold">Edit Room</h1>
          <div className="my-4">
            <div className="flex flex-col text-xl font-bold text-left my-4">
              <label htmlFor="name">Room Name</label>
              <input
                className="p-4"
                id="name"
                type="text"
                value={name || ""}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="flex flex-col text-xl font-bold text-left my-4">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                value={description || ""}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="flex flex-col text-xl font-bold text-left my-4">
              <label htmlFor="is_private">Is Private</label>
              <input
                type="checkbox"
                id="is_private"
                name="is_private"
                checked={is_private}
                onChange={() => setIsPrivate(!is_private)}
              />
            </div>

            <div className="flex flex-col gap-4">
              <Button
                className="text-xl sm:text-2xl p-2 w-full"
                onClick={() => updateRoom({ name, description, is_private })}
              >
                Update
              </Button>
              <Link href={`/rooms`}>
                <Button className="text-xl sm:text-2xl p-2 w-full">Back</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
}

export const getServerSideProps = withPageAuth({ redirectTo: "/login" });
