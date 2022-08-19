import { useEffect, useState } from "react";
import Link from "next/link";
import {
  getUser,
  supabaseClient,
  withPageAuth,
} from "@supabase/auth-helpers-nextjs";
import { useUser } from "@supabase/auth-helpers-react";
import Avatar from "../../../components/Avatar";
import Page from "../../../components/Layout/Page";
import Button from "../../../components/Button";

export default function EditProfile({ profile }: { profile: Profile }) {
  const { user } = useUser();
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [avatar_url, setAvatarUrl] = useState("");

  useEffect(() => {
    async function setProfile() {
      if (profile) {
        setUsername(profile.username);
        setBio(profile.bio);
        setAvatarUrl(profile.avatar_url);
      }
      return;
    }
    setProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  async function updateProfile({
    username,
    bio,
    avatar_url,
  }: {
    username: string;
    bio: string;
    avatar_url: string;
  }) {
    try {
      const { error, status } = await supabaseClient
        .from("profiles")
        .upsert(
          { id: user?.id, username, bio, avatar_url },
          { returning: "minimal" }
        );

      if (error && status !== 406) throw error;
    } catch (error) {
      console.log("error", error);
    }
  }

  return (
    <Page title="Edit Profile" className="min-h-screen flex items-center">
      <div className="w-[90%] md:w-[50%] mx-auto bg-dark text-center py-8 rounded-xl">
        <div className="w-[90%] mx-auto">
          <Avatar
            url={avatar_url}
            size={120}
            onUpload={(url: string) => {
              setAvatarUrl(url);
              updateProfile({ username, bio, avatar_url: url });
            }}
          />
          <h1 className="text-2xl font-bold my-2">{user?.email}</h1>

          <div className="my-4">
            <div className="flex flex-col text-xl text-left font-bold my-4">
              <label htmlFor="username">Username</label>
              <input
                className="p-4"
                id="username"
                type="text"
                value={username || ""}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="flex flex-col text-left text-xl font-bold my-4">
              <label htmlFor="bio">Bio</label>
              <textarea
                id="bio"
                value={bio || ""}
                onChange={(e) => setBio(e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-4">
              <Button
                className="text-xl sm:text-2xl p-2"
                onClick={() => updateProfile({ username, bio, avatar_url })}
              >
                Update
              </Button>
              <Link href={`/u/${username}`}>
                <Button className="text-xl sm:text-2xl p-2">Back</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
}

export const getServerSideProps = withPageAuth({
  redirectTo: "/login",
  async getServerSideProps(ctx) {
    const { user } = await getUser(ctx);
    const {
      data: profile,
      error,
      status,
    } = await supabaseClient
      .from<Profile>("profiles")
      .select("username, bio, avatar_url")
      .eq("id", user?.id)
      .single();

    if (error && status !== 406) throw error;

    return { props: { profile } };
  },
});
