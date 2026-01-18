import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { refreshSessionServer } from "./lib/api/serverApi";

export async function proxy(request: NextRequest) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;

  const { pathname } = request.nextUrl;

  const isPrivatePage =
    pathname.startsWith("/notes") || pathname.startsWith("/profile");
  const isAuthPage =
    pathname.startsWith("/sign-in") || pathname.startsWith("/sign-up");

  if (!accessToken && refreshToken && isPrivatePage) {
    try {
      const refreshResponse = await refreshSessionServer();
      const response = NextResponse.next();

      const setCookieHeader = refreshResponse.headers.get("set-cookie");

      if (setCookieHeader) {
        response.headers.set("set-cookie", setCookieHeader);
      }

      return response;
    } catch (error) {
      const response = NextResponse.redirect(new URL("/sign-in", request.url));
      response.cookies.delete("accessToken");
      response.cookies.delete("refreshToken");
      return response;
    }
  }

  if (!accessToken && isPrivatePage) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  if (accessToken && isAuthPage) {
    return NextResponse.redirect(new URL("/notes/filter/all", request.url));
  }

  return NextResponse.next();
}
