import Image from "next/image";
import { IoPeople } from "react-icons/io5";

interface RoomParams {
  id: string;
  host: string;
  created_at: string;
  name: string;
  description: string;
  participants: number;
  topics: string;
}

const RoomBox = ({ room }: { room: RoomParams }) => {
  const iconStyles = { width: 24, height: 24 };

  return (
    <div className="max-w-[720px] mx-auto my-10 bg-dark rounded-md p-5">
      <div className="flex items-center justify-between">
        <a href={`#${room.host}`} className="flex items-center gap-2">
          <div className="border-2 border-primary rounded-full h-8">
            <Image
              src="/images/avatar.svg"
              alt="Avatar"
              width={28}
              height={28}
            />
          </div>
          <span>@{room.host}</span>
        </a>
        <span>Created {room.created_at}</span>
      </div>
      <div className="border-b-2 py-4">
        <a href={`#room-${room.name}`} className="text-2xl">
          {room.name}
        </a>
        <p>{room.description}</p>
      </div>
      <p className="flex items-center gap-2 pt-4">
        <IoPeople style={iconStyles} /> {room.participants} participants
      </p>
    </div>
  );
};

export default RoomBox;
