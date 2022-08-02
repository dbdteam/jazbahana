import Image from "next/image";

export default function WhatIsJazbahana() {
  return (
    <div
      id="what-is-jazbahana"
      className="bg-wij bg-cover text-center py-24 px-4"
    >
      <h1 className="text-primary font-bold">What is Jazbahana?</h1>
      <p className="text-lg sm:text-4xl max-w-[720px] mx-auto mt-12 pb-24">
        Jazbahana is a platform specialized for students all around the world to
        trade notes as simple as opening tabs
      </p>
      <Image
        src="/images/wij/what-is-jazbahana.png"
        width={720}
        height={293}
        alt="What is Jazbahana?"
      />
    </div>
  );
}
