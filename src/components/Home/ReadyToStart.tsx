import { useUser } from "@supabase/auth-helpers-react";
import Link from "next/link";
import Button from "../Button";
import Card from "../Card";

export default function ReadyToStart() {
  const { user } = useUser();
  const url = user ? "/rooms" : "/login";

  return (
    <Card id="ready" className="max-w-[480px] mx-auto text-center">
      <h1 className="text-4xl font-extrabold">Ready to Start Exploring?</h1>
      <Link href={url}>
        <a>
          <Button className="text-2xl sm:text-4xl my-4 p-4">
            Join Now &rarr;
          </Button>
        </a>
      </Link>
    </Card>
  );
}
