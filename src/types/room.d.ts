interface Room {
  id?: string;
  profiles: { username: string; avatar_url: string };
  host_id: string;
  created_at: string;
  name: string;
  description?: string;
  is_private: boolean;
  participants: { user_id: string; room_id: string }[];
  // topics: string[];
}
