/* eslint @next/next/no-img-element: 0 */
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { gsap } from "gsap";
import { supabase } from "../../lib/supabaseClient";
import Avatar from "../Avatar";
import { useRouter } from "next/router";

export default function ViewAccount({ session }: any) {
  const { push } = useRouter();
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [balance, setBalance] = useState("");
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
        .select(`username, bio, avatar_url, balance`)
        .eq("id", user.id)
        .single();

      if (error && status !== 406) throw error;

      if (data) {
        setUsername(data.username);
        setAvatarUrl(data.avatar_url);
        setBio(data.bio);
        setBalance(data.balance);
      }
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  const handleSignOut = () => {
    supabase.auth.signOut();
    push("/");
  };

  return (
    <div className="py-16">
      <div className="w-[90%] md:w-[50%] mx-auto bg-dark text-center py-8 rounded-xl z-1">
        <div className="w-[90%] mx-auto">
          <Avatar url={avatar_url} size={120} />
          <h1 className="mb-2 text-xl sm:text-4xl">{username}</h1>
          <h3 className="text-left my-2">Bio</h3>
          <div className="bg-input bg-opacity-[50%] h-[128px] px-1 rounded-md text-left">
            <p className="pt-2 pl-2">{bio}</p>
          </div>
          <h3 className="flex items-center text-left my-2">
            Balance: {balance}
            <Image
              src="/images/features/jazbapoint.png"
              width={36}
              height={36}
              alt="Economy Feature"
            />
          </h3>
          <div className="buttons">
            <Link href="/profile/edit/">
              <button className="submit">Edit</button>
            </Link>
            <button className="submit" onClick={handleSignOut}>
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
