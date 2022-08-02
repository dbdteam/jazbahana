import type { GetServerSidePropsContext } from "next";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Avatar from "../../components/Avatar";
import Page from "../../components/Layout/Page";
import { supabase } from "../../lib/supabaseClient";

export async function getServerSideProps({ query }: GetServerSidePropsContext) {
  const { data: user, error } = await supabase
    .from("profiles")
    .select()
    .eq("username", query.username)
    .single();

  if (!user || error) {
    return { notFound: true };
  }
  return { props: { user } };
}

export default function Profile({ user }: { user: User }) {
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    setSession(supabase.auth.session());

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <Page title="Profile">
      <div className="py-16">
        <div className="w-[90%] md:w-[50%] mx-auto bg-dark text-center py-8 rounded-xl z-1">
          <div className="w-[90%] mx-auto">
            <Avatar url={user.avatar_url} size={120} />
            <h1 className="mb-2 text-xl sm:text-4xl">{user.username}</h1>
            <h3 className="text-left my-2">Bio</h3>
            <div className="bg-input bg-opacity-[50%] h-[128px] px-1 rounded-md text-left">
              <p className="pt-2 pl-2">{user.bio}</p>
            </div>
            <h3 className="flex items-center text-left my-2">
              Balance: {user.balance}
              <Image
                src="/images/features/jazbapoint.png"
                width={36}
                height={36}
                alt="Economy Feature"
              />
            </h3>
            {session && (
              <div className="buttons">
                <Link href="/profile/edit/">
                  <button className="submit">Edit</button>
                </Link>
                <button
                  className="submit"
                  onClick={() => supabase.auth.signOut()}
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Page>
  );
}
