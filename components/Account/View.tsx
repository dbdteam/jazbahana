/* eslint @next/next/no-img-element: 0 */
import { useEffect, useState } from "react";
import getProfile from "../../utils/getProfile";

export default function ViewAccount({ session }: any) {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [balance, setBalance] = useState("");
  const [avatar_url, setAvatarUrl] = useState("");

  useEffect(() => {
    getProfile(setLoading, setUsername, setBio, setAvatarUrl);
  }, [session]);

  return (
    <div>
      {avatar_url ? (
        <img
          src={avatar_url}
          alt="Avatar"
          className="avatar image"
          style={{ height: 150, width: 150 }}
        />
      ) : (
        <div className="avatar no-image" style={{ height: 150, width: 150 }} />
      )}
      <h1>{username}</h1>
      <p>{bio}</p>
      <h3>{balance}</h3>
    </div>
  );
}
