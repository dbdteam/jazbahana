import Image from "next/image";
import Section from "../Section";
import H from "../Highlight";

export default function WhatIsJazbahana() {
  return (
    <Section id="what-is-jazbahana" className="text-center">
      <div className="text-xl sm:text-2xl max-w-[720px] mx-auto flex flex-col gap-8">
        <h1 className="text-4xl font-extrabold">
          What is Jazbahana?
        </h1>
        <p>
          <H>Jazbahana</H> is a platform specialized for students all around the
          world to <H>trade notes as simple as opening tabs.</H>
        </p>
        <p>
          The name Jazbahana comes from <H>Kazakh</H> where <H>`Jazba`</H> means{" "}
          <H>`a note`</H> and <H>`Hana`</H> describes a place where a certain
          thing is common. So, <H>`Jazbahana`</H> is a place full of notes!
        </p>
        <Image
          src="/images/what-is-jazbahana.png"
          width={720}
          height={293}
          alt="What is Jazbahana?"
        />
      </div>
    </Section>
  );
}
