import Cookies from "js-cookie";

export const useAuth = () => {
  const isAuthenticated = Cookies.get("isAuthenticated") === "true";

  return { isAuthenticated };
};
