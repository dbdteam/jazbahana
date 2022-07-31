import { useRouter } from "next/router";

const ReadyToStart = () => {
  const { push } = useRouter();
  return (
    <div className="bg-dark py-20">
      <div className="max-w-[480px] mx-auto text-center">
        <h1>Ready to Start Sharing?</h1>
        <button className="main text-2xl" onClick={() => push("/profile/edit")}>
          Join Now &rarr;
        </button>
      </div>
    </div>
  );
};

export default ReadyToStart;
