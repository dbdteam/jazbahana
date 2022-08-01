import Link from "next/link";
import { useEffect, useState } from "react";
import Auth from "../../components/Auth";
import Avatar from "../../components/Avatar";
import Page from "../../components/Main/Page";
import { supabase } from "../../lib/supabaseClient";

export default function EditProfile() {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [avatar_url, setAvatarUrl] = useState("");

  useEffect(() => {
    getProfile();

    setSession(supabase.auth.session());

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, [session]);

  async function getProfile() {
    try {
      setLoading(true);
      const user = supabase.auth.user()!;

      let { data, error, status } = await supabase
        .from("profiles")
        .select(`username, bio, avatar_url`)
        .eq("id", user.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setUsername(data.username);
        setBio(data.bio);
        setAvatarUrl(data.avatar_url);
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
  }: EditableCredentials) {
    try {
      setLoading(true);
      const user = supabase.auth.user()!;

      const updates = {
        id: user.id,
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

  if (!session) return <Auth />;
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
            <p className="my-2">{session.user.email}</p>

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
