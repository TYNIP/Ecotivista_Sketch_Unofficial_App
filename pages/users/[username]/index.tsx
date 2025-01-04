import PublicProfilePage from "@/components/dynamicRendering/PublicProfilePage";
import { cleanPathName } from "@/components/functions";

export async function getServerSideProps(context:any) {
  const { username } = context.params; 
  const host = context.req.headers.host; 
  const protocol = context.req.headers["x-forwarded-proto"] || "http"; 
  const baseUrl = `${protocol}://${host}`;
  const res = await fetch(`${baseUrl}/api/social/users?username=${cleanPathName(username)}`);

  const userData = await res.json();

  return {
    props: {
      userData,
    },
  };
}

export default function UserProfile({ userData }:any) {
  return <PublicProfilePage userData={userData} />;
}
 