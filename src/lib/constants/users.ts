import type { PlatformRole } from "@/lib/types/users";

// Order matches the dropdown on each table row.
export const ROLE_OPTIONS: PlatformRole[] = ["seeker", "recruiter", "admin"];

export const ROLE_LABELS: Record<PlatformRole, string> = {
    seeker: "Seeker",
    recruiter: "Recruiter",
    admin: "Admin",
};

// Same color language as the application status badges.
// The trailing `!` is required: the shared SelectTrigger ships dark:bg/border
// utilities that would otherwise win the cascade over these pill colors.
export const ROLE_BADGE_STYLES: Record<PlatformRole, string> = {
    admin: "border-[#645BFF]/40! bg-[#645BFF]/15! text-[#645BFF]!",
    recruiter: "border-[#60A5FA]/40! bg-[#60A5FA]/15! text-[#60A5FA]!",
    seeker: "border-white/10! bg-[#A1A4AA]/15! text-[#A0A0AB]!",
};
