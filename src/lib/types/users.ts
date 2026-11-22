// Shared user-management types for the admin Users page.

export type PlatformRole = "seeker" | "recruiter" | "admin";

// Role filter used by the toolbar — "all" shows every account.
export type RoleFilter = "all" | PlatformRole;

// Normalized user row rendered in the admin table.
export type AdminUser = {
    id: string;
    name: string;
    email: string;
    role: PlatformRole;
    createdAt: string; // ISO date
    emailVerified: boolean;
};

// Raw shape returned by the users API. Older accounts predate the role field,
// so several properties are optional and normalized before rendering.
export type RawUser = {
    _id?: string;
    id?: string;
    name?: string | null;
    email?: string;
    role?: string | null;
    createdAt?: string;
    emailVerified?: boolean;
};
