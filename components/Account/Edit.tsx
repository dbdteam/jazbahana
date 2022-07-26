import { useState, useEffect } from "react";
import { supabase } from "../../utils/supabaseClient";
import Avatar from "../Avatar";
import User from "../../interfaces/user";
import fetchUser from "../../utils/fetchUser";

export default function EditAccount({ session }: any) {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [avatar_url, setAvatarUrl] = useState("");
  const [user, setUser] = useState<User>({
    username: "",
    bio: "",
    avatar_url: "",
    balance: 300,
  });

  useEffect(() => {
    fetchUser(session, setUser);
  }, [session]);

  async function updateProfile({ username, bio, avatar_url, balance }: User) {
    try {
      setLoading(true);
      const user: any = supabase.auth.user();

      const updates = {
        id: user.id,
        username,
        bio,
        avatar_url,
        balance,
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
    <div className="w-[50%] mx-auto bg-dark text-center">
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
          className="text-dark text-2xl border-2 outline-none my-4 p-4"
          id="username"
          type="text"
          value={username || ""}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="bio">Bio</label>
        <textarea
          className="text-dark text-2xl border-2 outline-none my-4 p-4"
          id="bio"
          value={bio || ""}
          onChange={(e) => setBio(e.target.value)}
        />
      </div>

      <div>
        <button
          className="submit"
          onClick={() => updateProfile({ username, bio, avatar_url })}
          disabled={loading}
        >
          {loading ? "Loading ..." : "Update"}
        </button>
      </div>
    </div>
  );
}
