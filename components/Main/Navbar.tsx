import Image from "next/image";
import Link from "next/link";
import Search from "./Search";

const Navbar = () => {
  return (
    <nav className="bg-star bg-cover">
      <ul className="flex items-center justify-between px-8 py-2">
        <Link href="/">
          <Image
            className="cursor-pointer"
            src="/images/logo.png"
            width={200}
            height={48}
            alt="JazbaHana Logo"
          />
        </Link>
        <Search />
        <div className="flex text-xl sm:text-2xl gap-4">
          <li>
            <Link href="/profile">profile</Link>
          </li>
          <li className="text-primary">
            <Link href="/rooms">rooms</Link>
          </li>
        </div>
      </ul>
    </nav>
  );
};

export default Navbar;
