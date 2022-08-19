import Image from "next/image";
import { ReactNode } from "react";
import Section from "../Section";

export default function Features() {
  return (
    <Section id="features">
      <h1 className="text-primary text-4xl font-extrabold">Features</h1>
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
            It solves the task by opening a chat-like room <br /> with an invite
            link, that is sent to people you ask notes from.
          </p>
        </Feature>

        <Feature>
          <p className="hidden sm:flex mt-4 mx-4 text-2xl">
            Notes are uploaded via file-select form. They can be images, PDFs
            and Word documents.
          </p>
          <Image
            className="rounded-md"
            src="/images/features/form.png"
            width={300}
            height={250}
            alt="Upload Notes Feature"
          />
          <p className="sm:hidden mt-4 mx-4 text-2xl">
            Notes are uploaded via file-select form. They can be images, PDFs
            and Word documents.
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
            Economy. Jazbahana offers its own currency called{" "}
            <span className="text-secondary">JazbaPoint</span>.
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
