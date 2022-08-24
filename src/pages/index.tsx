import Hero from "../components/Home/Hero";
import WhatIsJazbahana from "../components/Home/WhatIsJazbahana";
import Features from "../components/Home/Features";
import Page from "../components/Layout/Page";

export default function Home() {
  return (
    <Page title="Home">
      <Hero />
      <WhatIsJazbahana />
      <Features />
    </Page>
  );
}
