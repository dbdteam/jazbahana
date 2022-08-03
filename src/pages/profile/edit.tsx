import { Session, User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import Link from "next/link";
import { withPageAuth } from "@supabase/auth-helpers-nextjs";
import Avatar from "../../components/Avatar";
import Page from "../../components/Layout/Page";
import { supabase } from "../../lib/supabaseClient";

export default function EditProfile() {
  const [session, setSession] = useState<Session | null>(
    supabase.auth.session()
  );
  const [user, setUser] = useState<User | null>(session?.user ?? null);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [avatar_url, setAvatarUrl] = useState("");

  useEffect(() => {
    getProfile();

    supabase.auth.onAuthStateChange(async (_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  async function getProfile() {
    try {
      setLoading(true);

      let {
        data: profile,
        error,
        status,
      } = await supabase
        .from<Profile>("profiles")
        .select(`username, bio, avatar_url`)
        .eq("id", user?.id)
        .single();

      if (error && status !== 406) throw error;

      if (profile) {
        setUsername(profile.username);
        setBio(profile.bio);
        setAvatarUrl(profile.avatar_url);
      }
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

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
      setLoading(true);

      const updates = {
        id: user?.id,
        username,
        bio,
        avatar_url,
      };

      let { error } = await supabase.from("profiles").upsert(updates, {
        returning: "minimal", // Don't return the value after inserting
      });

      if (error) {
        throw error;
      }
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
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
                  className="text-xl mb-4 p-4"
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
                <Link href={`/profile/${username}`}>
                  <button className="submit">Back</button>
                </Link>
                <button
                  className="submit"
                  onClick={() => updateProfile({ username, bio, avatar_url })}
                  disabled={loading}
                >
                  {loading ? "Loading..." : "Update"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
}

export const getServerSideProps = withPageAuth({ redirectTo: "/login" });
