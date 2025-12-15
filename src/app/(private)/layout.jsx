// Implement in the layout.jsx
import AuthLayout from "@/auth/layout";
import { Skeleton } from "@/components/ui/skeleton";
import SideBar from "@/components/user/SideBar";
import { Suspense } from "react";

export default function Layout({ children }) {
  return (
    <Suspense
      fallback={
        <div className="w-full h-[400px] bg-white flex items-center justify-center">
          <Skeleton />
        </div>
      }
    >
      <AuthLayout>
        <section className="w-full md:flex block gap-5">
          <SideBar />
          <div className="w-full md:w-[calc(100%_-_200px)] md:mt-5">
            {children}
          </div>
        </section>
      </AuthLayout>
    </Suspense>
  );
}
