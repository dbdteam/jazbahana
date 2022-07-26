import { useState, useEffect } from "react";
import { supabase } from "../../utils/supabaseClient";
import Avatar from "../Avatar";
import getProfile from "../../utils/getProfile";

interface Profile {
  username: string;
  bio: string;
  avatar_url: string;
}

export default function EditAccount({ session }: any) {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [avatar_url, setAvatarUrl] = useState("");

  useEffect(() => {
    getProfile(setLoading, setUsername, setBio, setAvatarUrl);
  }, [session]);

  // async function getProfile() {
  //   try {
  //     setLoading(true);
  //     const user: any = supabase.auth.user();

  //     let { data, error, status } = await supabase
  //       .from("profiles")
  //       .select(`username, bio, avatar_url`)
  //       .eq("id", user.id)
  //       .single();

  //     if (error && status !== 406) {
  //       throw error;
  //     }

  //     if (data) {
  //       setUsername(data.username);
  //       setBio(data.bio);
  //       setAvatarUrl(data.avatar_url);
  //     }
  //   } catch (error: any) {
  //     alert(error.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // }

  async function updateProfile({ username, bio, avatar_url }: Profile) {
    try {
      setLoading(true);
      const user: any = supabase.auth.user();

      const updates = {
        id: user.id,
        username,
        bio,
        avatar_url,
        updated_at: new Date(),
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
    <div className="form-widget">
      <Avatar
        url={avatar_url}
        size={150}
        onUpload={(url: string) => {
          setAvatarUrl(url);
          updateProfile({ username, bio, avatar_url: url });
        }}
      />
      <div>
        <label htmlFor="email">Email</label>
        <input
          className="text-2xl border-2 outline-none my-4 p-4"
          id="email"
          type="text"
          value={session.user.email}
          disabled
        />
      </div>
      <div>
        <label htmlFor="username">Name</label>
        <input
          className="text-2xl border-2 outline-none my-4 p-4"
          id="username"
          type="text"
          value={username || ""}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="bio">Bio</label>
        <textarea
          className="text-2xl border-2 outline-none my-4 p-4"
          id="bio"
          value={bio || ""}
          onChange={(e) => setBio(e.target.value)}
        />
      </div>

      <div>
        <button
          className="text-2xl my-4 sm:text-5xl rounded-md bg-primary text-light p-4"
          onClick={() => updateProfile({ username, bio, avatar_url })}
          disabled={loading}
        >
          {loading ? "Loading ..." : "Update"}
        </button>
      </div>

      <div>
        <button
          className="text-2xl my-4 sm:text-5xl rounded-md bg-primary text-light p-4"
          onClick={() => supabase.auth.signOut()}
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}
