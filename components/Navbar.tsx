import Image from "next/image";
import Link from "next/link";
import { IoSearch } from "react-icons/io5";

const Navbar = () => {
  return (
    <nav className="shadow-dark dark:shadow-light shadow-sm">
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
        <div className="hidden sm:flex items-center bg-gray-100 rounded-full">
          <IoSearch className="m-4" width={20} height={20} />
          <input
            className="outline-none bg-gray-100 pr-4"
            type="text"
            placeholder="Search Notes, Rooms..."
          />
        </div>
        <div className="flex text-2xl gap-4">
          <li>
            <Link href="#signin">sign in</Link>
          </li>
          <li className="text-primary">
            <Link href="#login">log in</Link>
          </li>
        </div>
      </ul>
    </nav>
  );
};

export default Navbar;
