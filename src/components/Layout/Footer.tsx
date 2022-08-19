import { IconGitHub, IconMail } from "@supabase/ui";
import Image from "next/image";
import Link from "next/link";

export default function Footer({
  links,
}: {
  links: { label: string; href: string }[];
}) {
  const items = links.map((link) => (
    <Link key={link.label} href={link.href}>
      {link.label}
    </Link>
  ));

  return (
    <footer className="border-t-2 py-4 grid gap-4 grid-cols-1 sm:grid-cols-3 items-center justify-items-center">
      <Link href="/">
        <div className="flex items-center gap-2 text-xl font-bold cursor-pointer">
          <Image
            src="/images/logo.png"
            width={40}
            height={38}
            alt="Jazbahana Logo"
          />
          Jazbahana
        </div>
      </Link>
      <div className="flex gap-4 text-lg">{items}</div>
      <div className="flex gap-4">
        <a
          target="_blank"
          rel="noreferrer"
          href="https://github.com/jolshylar/"
        >
          <IconGitHub size={32} strokeWidth={2} />
        </a>
        <a target="_blank" rel="noreferrer" href="mailto:ozgdastan@gmail.com">
          <IconMail size={32} strokeWidth={2} />
        </a>
      </div>
    </footer>
  );
}
