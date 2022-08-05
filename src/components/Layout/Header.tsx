import Image from "next/image";
import Link from "next/link";
import Search from "./Search";

export default function Header({
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
    <nav className="border-b-2">
      <div className="flex items-center justify-between px-8 py-2">
        <Link href="/">
          <Image
            className="cursor-pointer"
            src="/images/logo.png"
            width={55}
            height={52}
            alt="JazbaHana Logo"
          />
        </Link>
        <Search />
        <div className="flex text-xl sm:text-2xl gap-4">{items}</div>
      </div>
    </nav>
  );
}
