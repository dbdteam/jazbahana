import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import Search from "./Search";

const Navbar = () => {
  const { push } = useRouter();
  const [session, setSession] = useState<any>(null);
  const [username, setUsername] = useState(null);
  const [avatar_url, setAvatarUrl] = useState(null);

  useEffect(() => {
    getProfile();
    setSession(supabase.auth.session());

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, [session]);

  async function getProfile() {
    try {
      const user = supabase.auth.user();
      if (!user) return;

      const { data } = await supabase
        .from("profiles")
        .select(`username, avatar_url`)
        .eq("id", user?.id)
        .single();

      if (data) {
        setUsername(data.username);
        setAvatarUrl(data.avatar_url);
      }
    } catch (error: any) {
      alert(error.message);
    }
  }

  return (
    <nav className="bg-dark border-b-2">
      <ul className="flex items-center justify-between px-8 py-2">
        <Link href="/">
          <Image
            className="cursor-pointer"
            src="/images/logo.png"
            width={55}
            height={52}
            alt="JazbaHana Logo"
          />
        </Link>
        <Search />
        {session ? (
          <div className="flex text-xl sm:text-2xl gap-4">
            <li>
              <Link href={`/profile/${username}`}>profile</Link>
            </li>
            <li className="text-primary">
              <Link href="/rooms">rooms</Link>
            </li>
          </div>
        ) : (
          <div className="flex text-xl sm:text-2xl">
            <button onClick={() => push("/profile/edit")}>sign in</button>
          </div>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
