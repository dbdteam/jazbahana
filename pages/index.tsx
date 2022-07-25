import type { NextPage } from "next";
import Head from "next/head";
import Hero from "../components/Hero";
import Layout from "../components/Layout";
import WhatIsJazbahana from "../components/WhatIsJazbahana";
import Features from '../components/Features'

const Home: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title>Home | Jazbahana</title>
      </Head>
      {/* Landing Page */}
      <Hero />
      <WhatIsJazbahana />
      <Features />
    </Layout>
  );
};

export default Home;
