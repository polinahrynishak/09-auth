"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/lib/store/authStore";
import { User } from "@/types/user";
import { checkSession, getUser } from "@/lib/api/clientApi";
import Loader from "@/components/Status/Loader";

export const AuthProvider = ({
  children,
  initialUser,
}: {
  children: React.ReactNode;
  initialUser: User | null;
}) => {
  const { setUser, clearIsAuthenticated } = useAuthStore();
  const [isLoading, setIsLoading] = useState(!initialUser);

  useEffect(() => {
    if (initialUser === null) {
      clearIsAuthenticated();
      setIsLoading(false);
      return;
    }

    if (initialUser) {
      setUser(initialUser);
      setIsLoading(false);
      return;
    }

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
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, [initialUser, setUser, clearIsAuthenticated]);

  if (isLoading && !initialUser) {
    return <Loader />;
  }

  return <>{children}</>;
};
