import { NextRequest, NextResponse } from "next/server";

const privateRoutes = ["/create-discussion"];

export const proxy = (request: NextRequest) => {
  const token = request.cookies.get("apiToken")?.value;
  const { pathname } = request.nextUrl;

  const isPrivateRoute = privateRoutes.some((route) =>
    pathname.startsWith(route),
  );

  if (!token && isPrivateRoute) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (token && pathname === "/") {
    return NextResponse.redirect(new URL("/browse", request.url));
  }

  return NextResponse.next();
};

export const config = {
  matcher: ["/", "/create-discussion"],
};
