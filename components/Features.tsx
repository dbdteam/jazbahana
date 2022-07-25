import Image from "next/image";

function Features() {
  return (
    <div className="text-center my-24">
      <h1 className="text-secondary pb-5 font-bold">Features</h1>
      <div className="grid grid-cols-1 my-12 max-w-[1080px] mx-auto">
        <div className="feature">
          <Image
            className="rounded-md"
            src="/images/features/notes.png"
            width={190}
            height={250}
            alt="Notes Feature"
          />
          <p>
            It solves the task by opening a chat-like room <br /> with an invite
            link, that is sent to people you ask notes from
          </p>
        </div>

        <div className="feature">
          <p className="hidden sm:flex">
            Notes are uploaded via file-select form. They can be images, PDFs
            and Word documents.
          </p>
          <Image
            className="rounded-md"
            src="/images/features/form.png"
            width={300}
            height={250}
            alt="Upload Notes Feature"
          />
          <p className="sm:hidden">
            Notes are uploaded via file-select form. They can be images, PDFs
            and Word documents.
          </p>
        </div>

        <div className="feature">
          <Image
            className="rounded-md"
            src="/images/features/jazbapoint.png"
            width={250}
            height={250}
            alt="Economy Feature"
          />
          <p>Economy. Jazbahana offers its own currency called `JazbaPoint`</p>
        </div>
      </div>
    </div>
  );
}

export default Features;
