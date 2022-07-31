import Page from "../components/Main/Page";
import RoomBox from "../components/RoomBox";
import rooms from "../data/rooms.json";

const Rooms = () => {
  // const [rooms, setRooms] = useState<any>([]);

  // useEffect(() => {
  //   fetchRooms();
  // }, []);

  // const fetchRooms = async () => {
  //   let { data: rooms, error } = await supabase.from("rooms").select("*");
  //   if (error) console.log("error", error);
  //   else setRooms(rooms);
  // };

  return (
    <Page title="Rooms">
      {rooms.map((room: any) => (
        <RoomBox key={room.name} room={room} />
      ))}
    </Page>
  );
};

export default Rooms;
