/* eslint @next/next/no-img-element: 0 */
import { useEffect, useState } from "react";
import Avatar from "../Avatar";
import User from "../../interfaces/user";
import fetchUser from "../../utils/fetchUser";
import Link from "next/link";
import { supabase } from "../../utils/supabaseClient";

export default function ViewAccount({ session }: any) {
  const [user, setUser] = useState<User>({
    username: "",
    bio: "",
    avatar_url: "",
    balance: 300,
  });

  useEffect(() => {
    fetchUser(session, setUser);
  }, [session]);

  return (
    <div className="py-16">
      <div className="w-[90%] md:w-[50%] mx-auto bg-dark text-center py-8 rounded-xl">
        <Avatar url={user.avatar_url} size={120} />
        <h1 className="mb-2 text-xl sm:text-4xl">{user.username}</h1>
        <h3 className="text-left mx-4 sm:mx-16">Bio</h3>
        <div className="mx-4 sm:mx-16 bg-input bg-opacity-[50%] h-[128px] px-1 rounded-md text-left">
          <p className="pt-2 pl-2">{user.bio}</p>
        </div>
        <h3 className="text-left sm:mx-16 my-2 mx-4">
          Balance: {user.balance}
        </h3>
        <div className="flex sm:flex-row flex-col sm:mx-16">
          <button className="submit">
            <Link href="/profile/edit/">Edit</Link>
          </button>
          <button className="submit" onClick={() => supabase.auth.signOut()}>
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}
