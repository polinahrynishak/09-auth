"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/lib/store/authStore";
import { checkSession, getUser } from "@/lib/api/clientApi";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { setUser, clearIsAuthenticated } = useAuthStore();

  useEffect(() => {
    const initAuth = async () => {
      try {
        await checkSession();
        const user = await getUser();

        if (user) {
          setUser(user);
        } else {
          clearIsAuthenticated();
        }
      } catch (error) {
        console.error("Session check failed", error);
        clearIsAuthenticated();
      }
    };

    initAuth();
  }, [setUser, clearIsAuthenticated]);

  return <>{children}</>;
};
