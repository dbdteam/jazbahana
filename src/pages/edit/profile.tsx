import { useState } from "react";
import Link from "next/link";
import {
  getUser,
  supabaseClient,
  withPageAuth,
} from "@supabase/auth-helpers-nextjs";
import { useUser } from "@supabase/auth-helpers-react";
import Avatar from "../../components/Avatar";
import Page from "../../components/Layout/Page";

export default function EditProfile({ profile }: { profile: Profile }) {
  const { user } = useUser();
  const [username, setUsername] = useState(profile.username);
  const [bio, setBio] = useState(profile.bio);
  const [avatar_url, setAvatarUrl] = useState(profile.avatar_url);

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
      const updates = {
        id: user?.id,
        username,
        bio,
        avatar_url,
      };

      const { error } = await supabaseClient.from("profiles").upsert(updates, {
        returning: "minimal", // Don't return the value after inserting
      });

      if (error) {
        throw error;
      }
    } catch (error: any) {
      alert(error.message);
    }
  }

  return (
    <Page title="Edit Profile">
      <div className="py-16">
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
            <p className="my-2">{user?.email}</p>

            <div className="my-4">
              <div className="labeled-input">
                <label htmlFor="username">Username</label>
                <input
                  className="mb-4 p-4"
                  id="username"
                  type="text"
                  value={username || ""}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="labeled-input">
                <label htmlFor="bio">Bio</label>
                <textarea
                  id="bio"
                  value={bio || ""}
                  onChange={(e) => setBio(e.target.value)}
                />
              </div>

              <div className="buttons">
                <button
                  className="submit"
                  onClick={() => updateProfile({ username, bio, avatar_url })}
                >
                  Update
                </button>
                <Link href={`/u/${username}`}>
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
