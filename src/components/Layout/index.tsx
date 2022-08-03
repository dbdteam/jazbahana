import type { Session, User } from "@supabase/supabase-js";
import { ReactNode, useEffect, useState } from "react";
import Head from "next/head";
import Header from "./Header";
import Footer from "./Footer";
import { supabase } from "../../lib/supabaseClient";

export default function Layout({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(
    supabase.auth.session()
  );
  const [user, setUser] = useState<User | null>(session?.user ?? null);
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    getProfile();

    supabase.auth.onAuthStateChange(async (_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  async function getProfile() {
    if (!user) return;
    try {
      const { data, error, status } = await supabase
        .from<Profile>("profiles")
        .select(`username`)
        .eq("id", user?.id)
        .single();
      
      if (error && status !== 406) throw error

      if (data) {
        setProfile(data);
      }
    } catch (error: any) {
      alert(error.message);
    }
  }

  const links = session
    ? [
        {
          label: "Profile",
          href: `/profile/${profile?.username}`,
        },
        {
          label: "Rooms",
          href: "/rooms",
        },
      ]
    : [
        {
          label: "Log In",
          href: "/login",
        },
      ];

  return (
    <main>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Jazbahana is a note-trader app created to help students all around the world."
        />
        <meta name="author" content="DBD Team" />
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        <meta name="twitter:title" content="Jazbahana - Get Notes Faster" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content="@dastanozgeldi" />
        <meta name="twitter:creator" content="@sbek22_" />
        <meta
          name="twitter:image"
          content="https://jazbahana.vercel.app/card.png"
        />
        <meta property="og:site_name" content="Jazbahana" />
        <meta name="og:title" content="Jazbahana - Get Notes Faster" />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content="https://jazbahana.vercel.app/card.png"
        />
        <title>Jazbahana - Get Notes Faster</title>
      </Head>
      <Header links={links} />
      {children}
      <Footer links={links} />
    </main>
  );
}
