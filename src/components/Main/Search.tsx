import { IoSearch } from "react-icons/io5";

export default function Search() {
  return (
    <div className="hidden sm:flex items-center bg-gray-100 rounded-full">
      <IoSearch className="m-4 text-dark" width={20} height={20} />
      <input
        className="outline-none text-dark bg-gray-100 mr-4"
        type="text"
        placeholder="Search Notes, Rooms..."
      />
    </div>
  );
}
