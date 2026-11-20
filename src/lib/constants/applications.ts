import type { ApplicationStatus } from "@/lib/types/applications";

export const APPLICATION_STATUSES: ApplicationStatus[] = [
    "Applied",
    "Review",
    "Shortlisted",
    "Rejected",
    "Offered",
];

export const STATUS_BADGE_STYLES: Record<ApplicationStatus, string> = {
    Applied: "border-white/10 bg-[#A1A4AA]/15 text-[#A0A0AB]",
    Review: "border-[#F59E0B]/40 bg-[#F59E0B]/15 text-[#F59E0B]",
    Shortlisted: "border-[#60A5FA]/40 bg-[#60A5FA]/15 text-[#60A5FA]",
    Rejected: "border-[#EF4444]/40 bg-[#EF4444]/15 text-[#EF4444]",
    Offered: "border-[#22C55E]/40 bg-[#22C55E]/15 text-[#22C55E]",
};
