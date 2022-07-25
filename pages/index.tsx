import type { NextPage } from "next";
import Head from "next/head";
import Hero from "../components/Hero";
import WhatIsJazbahana from "../components/WhatIsJazbahana";
import Features from "../components/Features";
import { useEffect, useState } from "react";
import { supabase } from "../utils/supabaseClient";
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
