import { auth } from "@clerk/nextjs/server";
import HomePage from "./components/landingpage";

export default async function Page() {
  const { userId } = await auth();
  return <HomePage userId={userId} />;
}