/* eslint-disable @next/next/no-img-element */
import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import { useState } from "react";

export default function Avatar({
  url,
  size,
  onUpload = null,
}: {
  url: string;
  size: number;
  onUpload?: any;
}) {
  const [uploading, setUploading] = useState(false);

  const { publicURL, error }: any = supabaseClient.storage
    .from("avatars")
    .getPublicUrl(url);

  if (error) throw error;

  async function uploadAvatar(event: any) {
    try {
      setUploading(true);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error("You must select an image to upload.");
      }

      const file = event.target.files[0];
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      let { error: uploadError } = await supabaseClient.storage
        .from("avatars")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      if (onUpload) onUpload(filePath);
    } catch (error: any) {
      alert(error.message);
    } finally {
      setUploading(false);
    }
  }

  const avatarPath = url ? publicURL : "/images/avatar.svg";

  return (
    <div>
      <div className="flex justify-center py-4">
        <img
          src={avatarPath}
          alt="Avatar"
          className="rounded-full object-cover"
          style={{ height: size, width: size }}
        />
      </div>
      {onUpload ? (
        <div style={{ width: size }} className="mx-auto">
          <label
            className="text-xl sm:text-2xl bg-primary rounded-md p-2 block cursor-pointer"
            htmlFor="single"
          >
            {uploading ? "..." : "Upload"}
          </label>
          <input
            className="hidden absolute"
            type="file"
            id="single"
            accept="image/*"
            onChange={uploadAvatar}
            disabled={uploading}
          />
        </div>
      ) : (
        <div hidden></div>
      )}
    </div>
  );
}
