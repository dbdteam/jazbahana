import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <div className="uppercase  flex flex-col md:flex-row items-center justify-center gap-8 my-24">
      <div className="p-4 font-montserrat font-bold">
        <h1>Having problems with school?</h1>
        <h1>Easily trade your notes</h1>
        <h1 className="text-secondary">with Jazbahana</h1>
        <button className="text-2xl my-4 sm:text-5xl rounded-md bg-primary text-light p-4 sm:mt-24">
          <Link href="#what-is-jazbahana">GET STARTED &rarr;</Link>
        </button>
      </div>
      <Image
        src="/images/jp-card.png"
        width={382}
        height={518}
        alt="JazbaPoint Card"
      />
    </div>
  );
};

export default Hero;
