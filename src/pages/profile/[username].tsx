import { getUser, supabaseClient } from "@supabase/auth-helpers-nextjs";
import type { User } from "@supabase/supabase-js";
import type { GetServerSidePropsContext } from "next";
import Image from "next/image";
import Link from "next/link";
import Avatar from "../../components/Avatar";
import Page from "../../components/Layout/Page";

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const { user } = await getUser(ctx);
  const { data: profile, error } = await supabaseClient
    .from("profiles")
    .select()
    .eq("username", ctx.query.username)
    .single();

  if (!profile || error) {
    return { notFound: true };
  }
  return { props: { user, profile } };
}

export default function Profile({
  user,
  profile,
}: {
  user: User;
  profile: Profile;
}) {
  return (
    <Page title="Profile">
      <div className="py-16">
        <div className="w-[90%] md:w-[50%] mx-auto bg-dark text-center py-8 rounded-xl z-1">
          <div className="w-[90%] mx-auto">
            <Avatar url={profile.avatar_url} size={120} />
            <h1 className="mb-2 text-xl sm:text-4xl">{profile.username}</h1>
            <h3 className="text-left my-2">Bio</h3>
            <div className="bg-input bg-opacity-[50%] h-[128px] px-1 rounded-md text-left">
              <p className="pt-2 pl-2 font-bold text-xl">{profile.bio}</p>
            </div>
            <h3 className="flex items-center text-left my-2">
              Balance: {profile.balance}
              <Image
                src="/images/features/jazbapoint.png"
                width={36}
                height={36}
                alt="Economy Feature"
              />
            </h3>
            {user && (
              <div className="buttons">
                <Link href="/profile/edit/">
                  <button className="submit">Edit</button>
                </Link>
                <button
                  className="submit"
                  onClick={() => supabaseClient.auth.signOut()}
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Page>
  );
}
