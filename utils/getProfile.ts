import { supabase } from "./supabaseClient";

export default async function getProfile(
  setLoading: any,
  setUsername: any,
  setBio: any,
  setAvatarUrl: any
) {
  try {
    setLoading(true);
    const user: any = supabase.auth.user();

    let { data, error, status } = await supabase
      .from("profiles")
      .select(`username, bio, avatar_url`)
      .eq("id", user.id)
      .single();

    if (error && status !== 406) {
      throw error;
    }

    if (data) {
      setUsername(data.username);
      setBio(data.bio);
      setAvatarUrl(data.avatar_url);
    }
  } catch (error: any) {
    alert(error.message);
  } finally {
    setLoading(false);
  }
}