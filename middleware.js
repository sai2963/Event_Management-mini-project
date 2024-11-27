import {
  clerkClient,
  clerkMiddleware,
  createRouteMatcher,
} from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Create route matchers for protected routes
const isProtectedRoute = createRouteMatcher([
  "/maine(.*)",
  "/maine/contact-response",
  "/maine/registerd-people",
]);

export default clerkMiddleware(async (auth, req) => {
  // Protect routes that require authentication
  if (isProtectedRoute(req)) {
    // First, ensure the user is authenticated
    await auth.protect();

    // If authenticated, check for admin role for specific routes
    if (auth.userId) {
      try {
        const user = await clerkClient.users.getUser(auth.userId);
        const userRole = user?.publicMetadata?.role;

        // Check if the user is an admin for specific admin-only routes
        // if ((req.nextUrl.pathname === '/maine/contact-response' ||
        //      req.nextUrl.pathname === '/maine/registerd-people') &&
        //     userRole !== 'admin') {
        //   // Redirect non-admin users
        //   return auth.redirect('/maine');
        // }

        if (
          role !== "admin" &&
          (req.nextUrl.pathname === "/maine/contact-response" ||
            req.nextUrl.pathname === "/maine/registerd-people")
        ) {
          return NextResponse.redirect(new URL("/maine",req.url));
        }
      } catch (error) {
        console.error("Error checking user role:", error);
        // Handle potential errors in user retrieval
        return auth.redirect("/maine");
      }
    }
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
