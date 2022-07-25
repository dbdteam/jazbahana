import Image from "next/image";

function Features() {
  return (
    <div className="text-center my-24">
      <h1 className="text-secondary pb-5 font-bold">Features</h1>
      <div className="grid grid-cols-1 my-12 mx-10">
        <div className="feature">
          <Image
            src="/images/features/notes.png"
            width={330}
            height={250}
            alt="solve feature"
          />
          <p>
            It solves the task by opening a chat-like room <br /> with an invite link,
            that is sent to people you ask notes from
          </p>
        </div>

        <div className="feature">
          <p className="hidden sm:flex">Notes are uploaded via file-select form.</p>
          <Image
            src="/images/features/form.png"
            width={300}
            height={250}
            alt="Upload Notes Feature"
          />
          <p className="sm:hidden">Notes are uploaded via file-select form.</p>
        </div>

        <div className="feature">
          <Image
            src="/images/features/form.png"
            width={300}
            height={250}
            alt="Upload Notes Feature"
          />
          <p>Notes are uploaded via file-select form.</p>
        </div>
      </div>
    </div>
  );
}

export default Features;
