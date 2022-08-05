import Link from "next/link";
import { IoChevronDown } from "react-icons/io5";
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
      <Link href="#ready">
        <div className="fixed bottom-0 right-0 cursor-pointer px-4 py-2 rounded-full hover:bg-dark hover:duration-300">
          <IoChevronDown width={48} height={48} />
        </div>
      </Link>
    </Page>
  );
}
