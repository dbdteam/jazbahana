import { useEffect, useState } from "react";
import type { NextPage } from "next";
import { supabase } from "../lib/supabaseClient";
import Hero from "../components/Home/Hero";
import WhatIsJazbahana from "../components/Home/WhatIsJazbahana";
import Features from "../components/Home/Features";
import Auth from "../components/Auth";
import Page from "../components/Main/Page";

const Home: NextPage = () => {
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    setSession(supabase.auth.session());

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  if (!session) return <Auth />;

  return (
    <Page title="Home">
      <Hero />
      <WhatIsJazbahana />
      <Features />
    </Page>
  );
};

export default Home;
