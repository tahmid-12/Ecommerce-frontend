"use client";
import { useAuth } from "@/auth";
import SignUp from "@/components/auth/SignUp";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const { isAuth } = useAuth();
  const router = useRouter();

  if (isAuth) {
    router.push("/profile");
  }
  return (
    <section className="pb-10 pt-5">
      <div className="w-full max-w-md mx-auto">
        <SignUp />
      </div>
    </section>
  );
}
