import { ROLE_LABELS } from "@/lib/constants/users";
import type {
    AdminUser,
    PlatformRole,
    RawUser,
    RoleFilter,
} from "@/lib/types/users";

// Accounts created before the role field existed default to seeker
// (matches the Better Auth signUp defaultValue).
function normalizeRole(role: string | null | undefined): PlatformRole {
    return role === "admin" || role === "recruiter" ? role : "seeker";
}

/** Maps raw API docs to the normalized rows the table renders. */
export function toAdminUsers(rawUsers: RawUser[]): AdminUser[] {
    return rawUsers
        .map((raw) => ({
            id: String(raw._id ?? raw.id ?? ""),
            name:
                (raw.name ?? "").trim() ||
                raw.email?.split("@")[0] ||
                "Unknown user",
            email: raw.email ?? "",
            role: normalizeRole(raw.role),
            createdAt: raw.createdAt ?? "",
            emailVerified: Boolean(raw.emailVerified),
        }))
        .filter((user) => user.id)
        .sort((a, b) => b.createdAt.localeCompare(a.createdAt)); // newest first
}

/** Toolbar filtering — free-text (name/email) + role dropdown. */
export function filterUsers(
    users: AdminUser[],
    query: string,
    role: RoleFilter,
): AdminUser[] {
    const needle = query.trim().toLowerCase();
    return users.filter((user) => {
        const matchesRole = role === "all" || user.role === role;
        const matchesQuery =
            needle === "" ||
            user.name.toLowerCase().includes(needle) ||
            user.email.toLowerCase().includes(needle);
        return matchesRole && matchesQuery;
    });
}

export type UserStat = {
    label: string;
    value: string;
    hint: string;
};

/** Bento stat cards — all values computed from the real user list. */
export function getUserStats(users: AdminUser[]): UserStat[] {
    const total = users.length;
    const count = (role: PlatformRole) =>
        users.filter((user) => user.role === role).length;
    const recruiters = count("recruiter");
    const admins = count("admin");
    const signupsLast24h = users.filter((user) => {
        const created = new Date(user.createdAt).getTime();
        return !Number.isNaN(created) && created >= Date.now() - 86_400_000;
    }).length;
    const share = (value: number) =>
        total === 0 ? "0% of total" : `${Math.round((value / total) * 100)}% of total`;

    return [
        {
            label: "Total Users",
            value: String(total),
            hint: `${count("seeker")} seekers`,
        },
        {
            label: "Recruiters",
            value: String(recruiters),
            hint: share(recruiters),
        },
        {
            label: "Admins",
            value: String(admins),
            hint: share(admins),
        },
        {
            label: "New Signups (24h)",
            value: String(signupsLast24h),
            hint: "Last 24 hours",
        },
    ];
}

export function getUserInitial(user: Pick<AdminUser, "name" | "email">) {
    return (
        user.name.trim().charAt(0).toUpperCase() ||
        user.email.charAt(0).toUpperCase() ||
        "?"
    );
}

/** "Nov 21, 2026" style join date for the table. */
export function formatJoinDate(iso: string) {
    const time = new Date(iso).getTime();
    if (Number.isNaN(time)) return "—";
    return new Date(time).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });
}

export function getRoleLabel(role: PlatformRole) {
    return ROLE_LABELS[role];
}
