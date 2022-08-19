import Link from "next/link";
import Hero from "../components/Home/Hero";
import WhatIsJazbahana from "../components/Home/WhatIsJazbahana";
import Features from "../components/Home/Features";
import Page from "../components/Layout/Page";
import ReadyToStart from "../components/Home/ReadyToStart";
import { IconChevronDown } from "@supabase/ui";

export default function Home() {
  return (
    <Page title="Home">
      <Hero />
      <WhatIsJazbahana />
      <Features />
      <ReadyToStart />
      <Link href="#ready">
        <div className="fixed bottom-0 right-0 cursor-pointer px-4 py-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 hover:duration-300">
          <IconChevronDown width={24} height={24} />
        </div>
      </Link>
    </Page>
  );
}
