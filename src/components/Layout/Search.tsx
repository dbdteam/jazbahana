import { IconSearch } from "@supabase/ui";

export default function Search() {
  return (
    <div className="hidden sm:flex items-center bg-gray-700 rounded-full">
      <IconSearch className="m-4" width={20} height={20} />
      <input
        className="outline-none mr-4 bg-gray-700"
        type="text"
        placeholder="Search for rooms..."
      />
    </div>
  );
}
