import Layout from "../components/Layout";
import RoomBox from "../components/RoomBox";
import rooms from "../data/rooms.json";

const Rooms = () => {
  return (
    <Layout>
      <div>
        {rooms.map((room) => (
          <RoomBox key={room.title} room={room} />
        ))}
      </div>
    </Layout>
  );
};

export default Rooms;
