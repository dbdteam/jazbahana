import { useUser } from "@supabase/auth-helpers-react";
import Link from "next/link";
import Button from "../Button";

export default function ReadyToStart() {
  const { user } = useUser();
  return (
    <div
      id="ready"
      className="px-4 max-w-[480px] mx-auto text-center"
    >
      <div>
        <h1 className="text-3xl sm:text-4xl font-extrabold">Ready to Start Exploring?</h1>
        <Link href={user ? "/rooms" : "/login"}>
          <a>
            <Button className="text-2xl sm:text-3xl my-4 p-4">
              Join Now &rarr;
            </Button>
          </a>
        </Link>
      </div>
    </div>
  );
}
