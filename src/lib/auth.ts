export const ADMIN_SESSION_COOKIE = "atl_admin_session";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "atlanteos-admin";
const SALT = "atlanteos-admin-salt-v1";

if (!process.env.ADMIN_PASSWORD) {
  console.warn(
    "[admin] ADMIN_PASSWORD is not set — using the default password, which is public in this repo's source. Set ADMIN_PASSWORD in your hosting environment before going live."
  );
}

async function sha256(input: string): Promise<string> {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(input));
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export function getSessionToken(): Promise<string> {
  return sha256(`${ADMIN_PASSWORD}:${SALT}`);
}

export async function checkPassword(password: string): Promise<boolean> {
  return (await sha256(password)) === (await sha256(ADMIN_PASSWORD));
}

export async function isValidSessionToken(token: string | undefined): Promise<boolean> {
  if (!token) return false;
  return token === (await getSessionToken());
}
