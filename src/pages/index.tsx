import type { NextPage } from "next";
import Hero from "../components/Home/Hero";
import WhatIsJazbahana from "../components/Home/WhatIsJazbahana";
import Features from "../components/Home/Features";
import Page from "../components/Main/Page";
import ReadyToStart from "../components/Home/ReadyToStart";

const Home: NextPage = () => {
  return (
    <Page title="Home">
      <Hero />
      <WhatIsJazbahana />
      <Features />
      <ReadyToStart />
    </Page>
  );
};

export default Home;
