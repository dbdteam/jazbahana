import Hero from "../components/Home/Hero";
import WhatIsJazbahana from "../components/Home/WhatIsJazbahana";
import Features from "../components/Home/Features";
import Page from "../components/Layout/Page";
import ReadyToStart from "../components/Home/ReadyToStart";

export default function Home() {
  return (
    <Page title="Home">
      <Hero />
      <WhatIsJazbahana />
      <Features />
      <ReadyToStart />
    </Page>
  );
}
