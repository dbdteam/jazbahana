interface Room {
  id?: string;
  // Foreign field that uses host_id
  profiles: { username: string; avatar_url: string };
  host_id: string;
  created_at: string;
  name: string;
  description?: string;
  is_private: boolean;
  // participants: any;
  // topics: string;
}
