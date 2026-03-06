import { User } from "@/global/types";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

type AuthState = {
  isAuthenticated: boolean;
  user: User | null;
};

export const useAuth = (): AuthState => {
  const [state, setState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
  });

  useEffect(() => {
    const isAuthenticated = Cookies.get("isAuthenticated") === "true";
    const rawUser = Cookies.get("authUser");

    const user: User | null = (() => {
      try {
        return rawUser ? (JSON.parse(rawUser) as User) : null;
      } catch {
        return null;
      }
    })();

    setState({ isAuthenticated, user });
  }, []);

  return state;
};
