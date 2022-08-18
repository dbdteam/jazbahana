import { supabaseClient, withPageAuth } from "@supabase/auth-helpers-nextjs";
import { useUser } from "@supabase/auth-helpers-react";
import Link from "next/link";
import { useEffect, useState } from "react";
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
      setDescription(room?.description || "");
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
    } catch (error: any) {
      console.log("error", error);
    }
  }

  return (
    <Page title="Edit Profile">
      <div className="py-16">
        <div className="w-[90%] md:w-[50%] mx-auto bg-dark text-center py-8 rounded-xl">
          <div className="w-[90%] mx-auto">
            <div className="my-4">
              <div className="labeled-input">
                <label htmlFor="name">Room Name</label>
                <input
                  className="mb-4 p-4"
                  id="name"
                  type="text"
                  value={name || ""}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="labeled-input">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  value={description || ""}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="labeled-input">
                <label htmlFor="is_private">Is Private</label>
                <input
                  type="checkbox"
                  id="is_private"
                  name="is_private"
                  checked={is_private}
                  onChange={() => setIsPrivate(!is_private)}
                />
              </div>

              <div className="buttons">
                <button
                  className="submit"
                  onClick={() => updateRoom({ name, description, is_private })}
                >
                  Update
                </button>
                <Link href={`/rooms`}>
                  <button className="submit">Back</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
}

export const getServerSideProps = withPageAuth({ redirectTo: "/login" });
