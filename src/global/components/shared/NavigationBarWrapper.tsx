import { cookies } from "next/headers";
import NavigationBar from "./NavigationBar";

const NavigationBarWrapper = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("apiToken")?.value;
  const userRaw = cookieStore.get("authUser")?.value;
  const user = userRaw ? JSON.parse(userRaw) : null;

  return <NavigationBar isAuthenticated={!!token} user={user} />;
};

export default NavigationBarWrapper;
