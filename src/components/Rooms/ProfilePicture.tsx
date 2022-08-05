/* eslint-disable @next/next/no-img-element */
import { supabaseClient } from "@supabase/auth-helpers-nextjs";

export default function ProfilePicture({
  url,
  size,
}: {
  url: string;
  size: number;
}) {
  const { publicURL, error }: any = supabaseClient.storage
    .from("avatars")
    .getPublicUrl(url);

  if (error) throw error;

  const avatarPath = url ? publicURL : "/images/avatar.svg";

  return (
    <img
      src={avatarPath}
      alt="Profile Picture"
      className="rounded-full object-cover"
      style={{ height: size, width: size }}
    />
  );
}
