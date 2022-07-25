import Image from "next/image";
import React from "react";

const WhatIsJazbahana = () => {
  return (
    <div className="bg-dark dark:bg-light text-center py-24 px-4">
      <h1 className="text-secondary font-bold">What is Jazbahana?</h1>
      <p className="text-lg sm:text-4xl text-light dark:text-dark max-w-[720px] mx-auto my-12">
        JazbaHana is a platform specialized for students all around the world to
        trade notes as simple as opening tabs
      </p>
      <Image
        src="/images/what-is-jazbahana.png"
        width={720}
        height={293}
        alt="What is Jazbahana?"
      />
    </div>
  );
};

export default WhatIsJazbahana;