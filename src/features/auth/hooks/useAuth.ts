import Cookies from "js-cookie";
import { useEffect, useState } from "react";

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setIsAuthenticated(Cookies.get("isAuthenticated") === "true");
  }, []);

  return { isAuthenticated };
};
