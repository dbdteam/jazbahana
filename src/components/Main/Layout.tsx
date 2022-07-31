import { ReactNode } from "react";
import Head from "next/head";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="bg-star bg-cover">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Jazbahana is a note-trader app created to help students all around the world."
        />
        <meta name="author" content="Jazbahana - Get Notes Faster" />
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        <meta property="og:site_name" content="Jazbahana - Get Notes Faster" />
        <meta name="og:title" content="Jazbahana - Get Notes Faster" />
        <title>Jazbahana - Get Notes Faster</title>
      </Head>
      <Navbar />
      {children}
      <Footer />
    </main>
  );
};

export default Layout;
