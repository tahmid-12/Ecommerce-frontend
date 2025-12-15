"use client";
import { useAuth } from "@/auth";
import { useGetCartsQuery } from "@/redux/api/cart";
import { useGetCurrentUserQuery } from "@/redux/api/currentUser";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";

export default function CartIcon() {
  const { isAuth } = useAuth();
  const { data: carts } = useGetCartsQuery(undefined, {
    skip: !isAuth,
  });
  return (
    <div className="relative">
      <Link href={"/cart"}>
        <ShoppingCart size={30} className="border-0 " />
      </Link>
      <p className="absolute -top-2 -right-2 w-5 h-5 centerAll rounded-full  bg-white text-primary text-[14px]">
        {carts?.length || 0}
      </p>
    </div>
  );
}
