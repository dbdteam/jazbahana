import Section from "../Section";
import H from "../Highlight";
import Link from "next/link";
import { useUser } from "@supabase/auth-helpers-react";

function Feature({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  return (
    <div className="p-4 rounded-md max-w-[40ch] bg-[#202020]">
      <h1 className="text-3xl font-extrabold my-3">{title}</h1>
      <p>{children}</p>
    </div>
  );
}

export default function Features() {
  const { user } = useUser();
  return (
    <Section id="features" className="min-h-screen mx-4">
      <h1 className="text-4xl lg:text-6xl font-extrabold">Features</h1>
      <div className="py-10 grid gap-8 xl:grid-cols-3 justify-items-center text-gray-100">
        <Feature title="Rooms">
          You get to choose whether the room you&apos;re creating is public or
          private. Go to{" "}
          <Link href="/rooms">
            <a>
              <H>/rooms</H> and look around numerous different topics and
              people!
            </a>
          </Link>
        </Feature>
        <Feature title="Profiles">
          Jazbahana uses the minimal set of data it gets from Google Sign In
          when you register. Your profile is customizable. Go check{" "}
          <Link href={user ? `/u/${user?.id}` : "/login"}>
            <a>
              <H>your profile</H> and set a fancy avatar!
            </a>
          </Link>
        </Feature>
        <Feature title="Economy">
          Jazbahana offers its own inner currency called <H>JazbaPoint</H>,
          where you get 300JP (or 100,00KZT) after you register. Use JazbaPoints
          to <H>create rooms, buy notes or donate</H> to your friends!
        </Feature>
      </div>
    </Section>
  );
}
