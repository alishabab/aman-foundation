import { Button } from "components";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Component() {
  const { data: session } = useSession();
  const router = useRouter();
  // useEffect(() => {
  //   if (session?.user) {
  //     router.push("/");
  //   }
  // }, [session, router]);
  if (session) {
    return (
      <>
        Signed in as {session.user?.email} <br />
        <Button className="w-auto" onClick={() => signOut()}>
          Sign out
        </Button>
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <Button className="w-auto" onClick={() => signIn()}>
        Sign in
      </Button>
    </>
  );
}
