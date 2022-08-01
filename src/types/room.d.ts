interface Room {
  id?: string;
  host_id: string;
  created_at: Date;
  name: string;
  description: string;
  participants: number;
  topics: string;
}
