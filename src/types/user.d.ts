interface User {
  id: string;
  updated_at: Date;
  username: string;
  bio: string;
  avatar_url: string;
  balance?: number;
}

interface EditableCredentials {
  username: string;
  bio: string;
  avatar_url: string;
}
