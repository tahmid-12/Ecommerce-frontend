import { NextResponse } from "next/server";
import { authRoutes, privateRoutes } from "./routes";

export default function middleware(req, res) {
  const url = req.nextUrl;

  const cookies = req.cookies;

  const isAuth = !!cookies.get("__auth")?.value;
  
  if (!isAuth) {
    if (privateRoutes.includes(url.pathname)) {
      return NextResponse.redirect(new URL("/sign-in", req.url));
    }
  }

  if (isAuth) {
    if (authRoutes.includes(url.pathname)) {
      return NextResponse.redirect(new URL("/profile", req.url));
    }
  }
  NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
  ],
};
