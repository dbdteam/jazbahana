import { useState, useEffect } from "react";
import { supabase } from "../../utils/supabaseClient";
import Avatar from "../Avatar";
import { EditableCredentials } from "../../interfaces/user";
import Link from "next/link";

export default function EditAccount({ session }: any) {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [avatar_url, setAvatarUrl] = useState("");

  useEffect(() => {
    getProfile();
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

  return (
    <div className="py-16">
      <div className="w-[90%] md:w-[50%] mx-auto bg-dark text-center py-8 rounded-xl">
        <Avatar
          url={avatar_url}
          size={120}
          onUpload={(url: string) => {
            setAvatarUrl(url);
            updateProfile({ username, bio, avatar_url: url });
          }}
        />
        <p>{session.user.email}</p>

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
            <button className="submit">
              <Link href="/profile">Back</Link>
            </button>
            <button
              className="submit"
              onClick={() => updateProfile({ username, bio, avatar_url })}
              disabled={loading}
            >
              {loading ? "Loading ..." : "Update"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
