import { IoSearch } from "react-icons/io5";

export default function Search() {
  return (
    <div className="hidden sm:flex items-center bg-gray-700 rounded-full">
      <IoSearch className="m-4" width={20} height={20} />
      <input
        className="outline-none mr-4 bg-gray-700"
        type="text"
        placeholder="Search for rooms..."
      />
    </div>
  );
}
