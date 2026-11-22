import type { RawUser } from "@/lib/types/users";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URI || "http://localhost:5000";

/**
 * All platform users for the admin Users page.
 *
 * NOTE: uses the Express API — Better Auth's `listUsers` only exists behind
 * the admin plugin, which this project doesn't enable. `role` may be missing
 * on older accounts; normalize with `toAdminUsers` before rendering.
 */
export const getUsers = async (): Promise<RawUser[]> => {
    const res = await fetch(`${BASE_URL}/users`, { cache: "no-store" });
    if (!res.ok) {
        throw new Error("Failed to load users");
    }
    return res.json();
};

export const getUserPremiumById = async (userId: string) => {
    const res = await fetch(`${BASE_URL}/users/${userId}/premium`);
    return res.json();
};
