"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from ".";

const AuthLayout = ({ children }) => {
  const { isAuth } = useAuth();
  const router = useRouter();
  
  useEffect(() => {
    if (!isAuth) {
      router.push("/sign-in");
    }
  }, [isAuth, router]);

  return <>{children}</>;
};

export default AuthLayout;
