import {
    COMPANY_LOGO_STYLES,
    STATUS_BADGE_STYLES,
} from "@/lib/constants/applications";
import type { ApplicationStatus } from "@/lib/types/applications";

export function getCompanyInitial(companyName: string) {
    return companyName.trim().charAt(0).toUpperCase() || "?";
}

export function getCompanyLogoClass(companyName: string) {
    return (
        COMPANY_LOGO_STYLES[companyName] ??
        "border border-white/10 bg-[#222228] text-[#EDEDEF]"
    );
}

export function getStatusBadgeClass(status: ApplicationStatus) {
    return STATUS_BADGE_STYLES[status];
}

export function formatAppliedAt(value: string) {
    const appliedTime = new Date(value).getTime();
    if (Number.isNaN(appliedTime)) return "Recently";

    const hours = Math.floor((Date.now() - appliedTime) / (60 * 60 * 1000));
    if (hours < 1) return "Just now";
    if (hours < 24) {
        return `${hours} hour${hours === 1 ? "" : "s"} ago`;
    }

    const days = Math.floor(hours / 24);
    if (days < 7) return `${days} day${days === 1 ? "" : "s"} ago`;

    const weeks = Math.floor(days / 7);
    if (weeks < 4) return `${weeks} week${weeks === 1 ? "" : "s"} ago`;

    return new Date(appliedTime).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });
}
