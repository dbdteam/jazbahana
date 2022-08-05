import Image from "next/image";
import Section from "../Section";

export default function WhatIsJazbahana() {
  return (
    <Section id="what-is-jazbahana" className="text-center">
      <h1 className="text-primary">What is Jazbahana?</h1>
      <div className="text-xl sm:text-3xl max-w-[720px] mx-auto">
        <p className="mt-12 pb-6">
          Jazbahana is a platform specialized for students all around the world
          to trade notes as simple as opening tabs
        </p>
        <p className="pb-24">
          The name Jazbahana comes from Kazakh where `Jazba` means `a note` and
          `Hana` describes a place where a certain thing is common. So
          `Jazbahana` is a place full of notes!
        </p>
      </div>
      <Image
        src="/images/what-is-jazbahana.png"
        width={720}
        height={293}
        alt="What is Jazbahana?"
      />
    </Section>
  );
}
