import Image from "next/image";
import Link from "next/link";
import Button from "../Button";
import Section from "../Section";

export default function Hero() {
  return (
    <Section id="hero" className="uppercase md:flex-row gap-8 py-24">
      <div className="p-4">
        <h1 className="text-4xl font-extrabold">
          Having problems with school?
        </h1>
        <h1 className="text-4xl font-extrabold my-4">
          Easily trade your notes
        </h1>
        <h1 className="text-4xl font-extrabold text-secondary">
          with Jazbahana
        </h1>
        <Link href="#what-is-jazbahana">
          <a>
            <Button className="text-2xl sm:text-4xl my-4 p-4">
              GET STARTED &rarr;
            </Button>
          </a>
        </Link>
      </div>
      <Image
        src="/images/jp-card.png"
        width={439}
        height={421}
        alt="JazbaPoint Card"
      />
    </Section>
  );
}
