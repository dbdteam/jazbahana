import Image from "next/image";
import { ReactNode } from "react";
import Section from "../Section";
import H from "../Highlight";

export default function Features() {
  return (
    <Section id="features">
      <h1 className="text-4xl font-extrabold">Features</h1>
      <div className="grid grid-cols-1 my-6 max-w-[1080px] mx-auto">
        <Feature>
          <Image
            className="rounded-md"
            src="/images/features/notes.png"
            width={190}
            height={250}
            alt="Notes Feature"
          />
          <p className="mt-4 mx-4 text-2xl">
            It solves the task by opening either a{" "}
            <H>public or private chat-like room.</H>
            <br />
            The public one is available to <H>everybody</H> on the Internet
            whilst the private is only open to <H>you and your friends</H>!
          </p>
        </Feature>

        <Feature>
          <p className="hidden sm:block mt-4 mx-4 text-2xl">
            Notes are uploaded via <H>file-select form</H>. They can be images,
            PDFs and Word documents.
          </p>
          <Image
            className="rounded-md"
            src="/images/features/form.png"
            width={300}
            height={250}
            alt="Upload Notes Feature"
          />
          <p className="sm:hidden mt-4 mx-4 text-2xl">
            Notes are uploaded via <H>file-select form</H>. They can be images,
            PDFs and Word documents.
          </p>
        </Feature>

        <Feature>
          <Image
            className="rounded-md"
            src="/images/features/jazbapoint.png"
            width={250}
            height={250}
            alt="Economy Feature"
          />
          <p className="mt-4 mx-4 text-2xl">
            <H>Economy</H>. Jazbahana offers its own currency called JazbaPoint.
          </p>
        </Feature>
      </div>
    </Section>
  );
}

function Feature({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center justify-evenly flex-col sm:flex-row p-8 rounded-md">
      {children}
    </div>
  );
}
