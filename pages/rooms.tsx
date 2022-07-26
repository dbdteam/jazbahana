import Head from "next/head";
import RoomBox from "../components/RoomBox";
import rooms from "../data/rooms.json";

const Rooms = () => {
  return (
    <div>
      <Head>
        <title>Rooms | Jazbahana</title>
      </Head>
      {rooms.map((room) => (
        <RoomBox key={room.title} room={room} />
      ))}
    </div>
  );
};

export default Rooms;
