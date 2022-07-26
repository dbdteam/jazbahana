/* eslint @next/next/no-img-element: 0 */
import Image from "next/image";
import { useState } from "react";
import { supabase } from "../utils/supabaseClient";

interface AvatarParams {
  url: string;
  size: number;
  onUpload?: any;
}

export default function Avatar({ url, size, onUpload = null }: AvatarParams) {
  const [uploading, setUploading] = useState(false);

  const { publicURL, error }: any = supabase.storage
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

      let { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      if (onUpload) onUpload(filePath);
    } catch (error: any) {
      alert(error.message);
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      <div className="flex justify-center py-4">
        {url ? (
          <img
            src={publicURL}
            alt="Avatar"
            className="rounded-full object-cover"
            style={{ height: size, width: size }}
          />
        ) : (
          <Image
            alt="default avatar"
            src="/images/avatar.svg"
            width={size}
            height={size}
            style={{ height: size, width: size }}
          />
        )}
      </div>
      {onUpload ? (
        <div style={{ width: size }} className="mx-auto">
          <label className="submit block" htmlFor="single">
            {uploading ? "Uploading..." : "Upload"}
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
        <div hidden={true}></div>
      )}
    </div>
  );
}
