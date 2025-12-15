"use client";
import { thirdParty } from "@/constants";
import Image from "next/image";
import React from "react";
import { signIn } from "next-auth/react";
import { defaultRedirectPath } from "@/routes";

export default function ThirdPartyAuth() {
  return (
    <div className="flex justify-between gap-5 pb-5">
      {thirdParty.map((item) => (
        <div
          onClick={() => {
            if (item.title === "Google") {
              signIn("google", {
                callbackUrl: defaultRedirectPath,
              });
            } else {
              signIn("facebook", {
                callbackUrl: defaultRedirectPath,
              });
            }
          }}
          key={item.id}
          className="cursor-pointer border-[1px] shadow-3xl rounded-full py-3 w-1/2 text-md centerAll gap-3"
        >
          <Image src={item.img} alt={item.title} className="w-10 h-10" />
          <p className="pt-[5px]">{item.title}</p>
        </div>
      ))}
    </div>
  );
}
