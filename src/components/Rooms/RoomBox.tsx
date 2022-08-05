import { IoPeople } from "react-icons/io5";
import timeSince from "../../lib/timeSince";
import ProfilePicture from "./ProfilePicture";

export default function RoomBox({ room }: { room: Room }) {
  const iconStyles = { width: 24, height: 24 };

  return (
    <div className="max-w-[720px] w-[90%] sm:w-[60%] mx-auto my-10 bg-dark rounded-md p-5">
      {/* avatar, username, datetime */}
      <div className="flex items-center justify-between">
        <a
          href={`/u/${room.profiles.username}`}
          className="flex items-center gap-2"
        >
          <div className="border-2 border-primary rounded-full h-8">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <ProfilePicture url={room.profiles.avatar_url} size={28} />
          </div>
          <span>@{room.profiles.username}</span>
        </a>
        <span>{timeSince(room.created_at)}</span>
      </div>
      {/* room info */}
      <div className="border-b-2 py-4">
        <a href={`#room-${room.name}`} className="text-2xl">
          {room.name}
        </a>
        <p>{room.description}</p>
      </div>
      {/* participants count, topics */}
      <div className="flex items-center justify-between pt-4">
        <p className="flex items-center gap-2">
          <IoPeople style={iconStyles} /> Y participants
        </p>
        {/* <div className="flex gap-2">
          {room.topics &&
            room.topics.map((topic) => <span className="text-xs border-2 p-1 rounded-md" key={topic}>{topic}</span>)}
        </div> */}
      </div>
    </div>
  );
}
