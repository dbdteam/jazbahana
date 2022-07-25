import Image from "next/image";
import { IoPeople } from "react-icons/io5";

interface RoomParams {
  author: string;
  title: string;
  description: string;
  participants: number;
  topics: string;
  date: string;
}

const RoomBox = ({ room }: { room: RoomParams }) => {
  const iconStyles = { width: 24, height: 24 };
  return (
    <div className="max-w-[720px] mx-auto my-10 bg-gray-100 rounded-md p-5">
      <div className="flex items-center justify-between">
        <a href={`#${room.author}`} className="flex items-center gap-2">
          <div className="border-2 border-primary rounded-full">
            <Image
              src="/images/avatar.svg"
              alt="Avatar"
              width={28}
              height={28}
            />
          </div>
          <span>@{room.author}</span>
        </a>
        <span>{room.date}</span>
      </div>
      <div className="border-b-2 py-4">
        <a href={`#room-${room.title}`} className="text-2xl">
          {room.title}
        </a>
        <p>{room.description}</p>
      </div>
      <p className="flex items-center gap-2 pt-4">
        <IoPeople style={iconStyles} /> {room.participants}{" "}
        participants
      </p>
    </div>
  );
};

export default RoomBox;
