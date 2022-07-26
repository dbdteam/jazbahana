
import RoomBox from "../components/RoomBox";
import rooms from "../data/rooms.json";

const Rooms = () => {
  return (
      <div>
        {rooms.map((room) => (
          <RoomBox key={room.title} room={room} />
        ))}
      </div>
  );
};

export default Rooms;
