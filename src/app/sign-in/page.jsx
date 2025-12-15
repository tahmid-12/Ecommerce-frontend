"use client";
import { useState, useEffect } from "react";
import { useAuth } from "@/auth";
import SignIn from "@/components/auth/SignIn";
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const { isAuth } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    if (isAuth) {
      setLoading(true);
      window.location.reload();
      router.push("/profile"); 
    }
  }, [isAuth, router]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg font-semibold">Redirecting...</p>
      </div>
    );
  }

  return <SignIn setLoading={setLoading} />;
}