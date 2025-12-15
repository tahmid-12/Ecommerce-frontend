"use server";
import { deleteCookie, getCookie, setCookie } from "cookies-next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

const options = {
  domain:
    process.env.NODE_ENV === "production" ? ".darkak.com.bd" : "localhost",
  expires: new Date(Date.now() + 60 * 60 * 24 * 1000),
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  path: "/",
};

export async function setCookies(key, value) {
  setCookie(key, value, {
    ...options,
    cookies: cookies,
  });

  redirect("/profile");
}

export async function getCookies(key) {
  return new Promise((resolve) => {
    const cookie = getCookie(key, {
      ...options,
      cookies: cookies,
    });

    const cookie2= getCookie('__auth_token')

    console.log(cookies().getAll());
    
    resolve(cookie);
  });
}

export async function deleteCookies(key) {
  deleteCookie(key, { ...options, cookies });
  redirect("/sign-in");
}
