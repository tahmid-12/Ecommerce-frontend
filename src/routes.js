/**
 * An Array of routes that are accessible without authentication
 * @type {string[]}
 */

export const publicRoutes = ["/sign-in", "/cart", "/sign-up"];

/**
 * An Array of routes that are need to be authenticated
 * @type {string[]}
 */
export const privateRoutes = [
  "/profile",
  "/reset-password",
  "/wishlist",
  "/my-order",
  "/my-returs",
  "/my-cancellation",
  "/my-account",
  "/edit-profile",
];

/**
 * Prefix of the API Authentication Route
 * @type {string}
 */

export const apiAuthPrefix = "/api/auth";

/**
 * External API Prefix
 */

export const apiUrl = process.env.NEXT_PUBLIC_API_URL;

/**
 * Default Redirect Path after user logging in
 */

export const defaultRedirectPath = "/profile";

/**
 * Authentication Routes
 */

export const authRoutes = ["/sign-in", "/sign-up"];
