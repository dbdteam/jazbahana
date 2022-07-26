export default interface User {
  id: string;
  updated_at: Date;
  username: string;
  bio: string;
  avatar_url: string;
  balance?: number;
}

export interface EditableCredentials {
  username: string;
  bio: string;
  avatar_url: string;
}
