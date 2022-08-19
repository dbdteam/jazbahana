import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import { FormEvent, useState } from "react";

export default function Avatar({
  url,
  size,
  onUpload,
}: {
  url: string;
  size: number;
  onUpload?: (url: string) => void;
}) {
  const [uploading, setUploading] = useState(false);

  const { publicURL, error } = supabaseClient.storage
    .from("avatars")
    .getPublicUrl(url);

  if (error) throw error;

  async function uploadAvatar(event: FormEvent) {
    const t = event.currentTarget as HTMLInputElement;
    try {
      setUploading(true);
      if (!t.files || t.files.length === 0) {
        throw new Error("You must select an image to upload.");
      }

      const file = t.files[0];
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      let { error } = await supabaseClient.storage
        .from("avatars")
        .upload(filePath, file);

      if (error) throw error;

      if (onUpload) onUpload(filePath);
    } catch (error) {
      console.log("error", error);
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      <div className="flex justify-center py-4">
        <img
          src={publicURL || "/images/avatar.svg"}
          alt="Avatar"
          className="rounded-full object-cover"
          width={size}
          height={size}
        />
      </div>
      {onUpload && (
        <div style={{ width: size }} className="mx-auto">
          <label
            className="text-gray-100 font-bold text-xl sm:text-2xl bg-blue-500 rounded-md p-2 block cursor-pointer"
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
      )}
    </div>
  );
}
