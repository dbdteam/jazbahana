import type { NextPage } from "next";
import Head from "next/head";
import Hero from "../components/Home/Hero";
import WhatIsJazbahana from "../components/Home/WhatIsJazbahana";
import Features from "../components/Home/Features";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import Auth from "../components/Auth";

const Home: NextPage = () => {
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    setSession(supabase.auth.session());

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <>
      <Head>
        <title>Home | Jazbahana</title>
      </Head>
      {!session ? (
        <Auth />
      ) : (
        <main>
          <Hero />
          <WhatIsJazbahana />
          <Features />
        </main>
      )}
    </>
  );
};

export default Home;
