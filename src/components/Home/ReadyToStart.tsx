import { useRouter } from "next/router";

export default function ReadyToStart() {
  const { push } = useRouter();

  return (
    <div className="bg-star bg-cover flex items-center h-screen">
      <div className="max-w-[480px] mx-auto text-center">
        <h1>Ready to Start Trading?</h1>
        <button className="main" onClick={() => push("/profile/edit")}>
          Join Now &rarr;
        </button>
      </div>
    </div>
  );
}
