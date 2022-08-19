import { ReactNode, useEffect, useState } from "react";
import Head from "next/head";
import { useUser } from "@supabase/auth-helpers-react";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout({ children }: { children: ReactNode }) {
  const [parent] = useAutoAnimate<HTMLDivElement>();
  const { user } = useUser();
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    async function getProfile() {
      if (!user) return;
      try {
        const { data, error, status } = await supabaseClient
          .from<Profile>("profiles")
          .select("username")
          .eq("id", user?.id)
          .single();

        if (error && status !== 406) throw error;

        if (data) {
          setProfile(data);
        }
      } catch (error) {
        console.log("error", error);
      }
    }
    getProfile();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const links = user
    ? [
        {
          label: "Profile",
          href: `/u/${profile?.username}`,
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
      <Navbar links={links} />
      <div ref={parent}>{children}</div>
      <Footer links={links} />
    </main>
  );
}
