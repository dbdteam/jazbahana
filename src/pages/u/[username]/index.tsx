import { getUser, supabaseClient } from "@supabase/auth-helpers-nextjs";
import type { User } from "@supabase/supabase-js";
import type { GetServerSidePropsContext } from "next";
import Image from "next/image";
import Link from "next/link";
import Avatar from "../../../components/Avatar";
import Button from "../../../components/Button";
import Card from "../../../components/Card";
import Page from "../../../components/Layout/Page";

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const { user } = await getUser(ctx);
  const { data: profile, error } = await supabaseClient
    .from("profiles")
    .select()
    .eq("username", ctx.query.username)
    .single();

  if (!profile || error) {
    return {
      redirect: {
        destination: `/u/${user.id}/edit`,
        permanent: false,
      },
    };
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
    <Page title="Profile" className="min-h-screen flex items-center">
      <Card>
        <Avatar user={user} url={profile.avatar_url} />
        <h1 className="text-center my-2 text-2xl font-extrabold">
          @{profile.username}
        </h1>
        <h3 className="text-xl font-bold text-left my-2">Bio</h3>
        <div className="bg-gray-400 bg-opacity-[50%] h-[128px] px-1 rounded-md text-left">
          <p className="py-2 px-2 font-bold text-xl">{profile.bio}</p>
        </div>
        <h3 className="text-xl font-bold flex items-center text-left my-4">
          Balance: {profile.balance} JP
        </h3>
        {user && user.id === profile.id && (
          <div className="flex flex-col gap-4">
            <Link href={`/u/${profile.username}/edit`}>
              <a>
                <Button className="text-xl sm:text-2xl p-2 w-full">Edit</Button>
              </a>
            </Link>
            <Button
              className="text-xl sm:text-2xl p-2 w-full"
              onClick={() => supabaseClient.auth.signOut()}
            >
              Sign Out
            </Button>
          </div>
        )}
      </Card>
    </Page>
  );
}
