import { useUser } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";

export default function ReadyToStart() {
  const { user } = useUser();
  const { push } = useRouter();

  const url = user ? "/rooms" : "/login";

  return (
    <div className="bg-star bg-cover flex items-center h-screen">
      <div className="max-w-[480px] mx-auto text-center">
        <h1>Ready to Start Trading?</h1>
        <button className="main" onClick={() => push(url)}>
          Join Now &rarr;
        </button>
      </div>
    </div>
  );
}
