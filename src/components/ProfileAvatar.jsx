"use client";
import { Heart, LogOut, ShoppingBag, Star, User, XCircle } from "lucide-react";
import { Man } from "@/assets/images";
import { useLogoutUserMutation } from "@/redux/api/currentUser";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useAuth } from "@/auth";

export function ProfileAvatar() {
  const {logout} = useAuth()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer">
          <AvatarImage
            src={Man.src}
            alt="@shadcn"
            className="object-cover w-full h-full"
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[300px] mt-2  shadow-5xl px-3 text-gray-400">
        <DropdownMenuItem className="cursor-pointer gap-2">
          <User className=" h-6 w-6 text-primary" />
          <Link href={"/my-account"} className="text-md">
            Manage My Account
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer gap-2">
          <ShoppingBag className=" h-6 w-6 text-primary" />
          <Link href={"/my-order"} className="text-md">
            My Orders
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer gap-2">
          <Heart className=" h-6 w-6 text-primary" />
          <Link href={"/wishlist"} className="text-md">
            My WishList & Followed Store
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer gap-2">
          <Star className=" h-6 w-6 text-primary" />
          <Link href={"/my-reviews"} className="text-md">
            My Reviews
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer gap-2">
          <XCircle className=" h-6 w-6 text-primary" />
          <Link href={"/my-returns"} className="text-md">
            My Returns & Cancellations
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => {
            logout();
          }}
          className="cursor-pointer gap-2 pl-3"
        >
          <LogOut className=" h-6 w-6 text-primary" />
          <span className="text-md">Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
