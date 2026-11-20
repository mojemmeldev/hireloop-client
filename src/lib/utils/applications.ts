import { STATUS_BADGE_STYLES } from "@/lib/constants/applications";
import type { Application, ApplicationStatus } from "@/lib/types/applications";

const COMPANY_LOGO_CLASSES = [
    "bg-[#C6C6C7] text-[#0B0B0C]",
    "bg-[#474746] text-[#EDEDEF]",
    "bg-[#222228] text-[#EDEDEF]",
    "bg-[#93000A] text-[#FFFFFF]",
    "border border-white/10 bg-[#222228] text-[#EDEDEF]",
] as const;

export type ApplicationStat = {
    label: string;
    value: string;
    valueClassName: string;
};

export function getCompanyInitial(companyName: string) {
    return companyName.trim().charAt(0).toUpperCase() || "?";
}

export function getCompanyLogoClass(companyName: string) {
    const hash = [...companyName].reduce((total, char) => total + char.charCodeAt(0), 0);
    return COMPANY_LOGO_CLASSES[hash % COMPANY_LOGO_CLASSES.length];
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

function countByStatus(applications: Application[], statuses: ApplicationStatus[]) {
    return applications.filter((application) => statuses.includes(application.status)).length;
}

export function getApplicationStats(applications: Application[]): ApplicationStat[] {
    const total = applications.length;
    const shortlisted = countByStatus(applications, ["Shortlisted", "Offered"]);
    const interviews = countByStatus(applications, ["Review"]);
    const offers = countByStatus(applications, ["Offered"]);
    const successRate = total === 0 ? 0 : Math.round((offers / total) * 100);

    return [
        {
            label: "Total Applied",
            value: String(total),
            valueClassName: "text-[#EDEDEF]",
        },
        {
            label: "Shortlisted",
            value: String(shortlisted),
            valueClassName: "text-[#EDEDEF]",
        },
        {
            label: "Interviews",
            value: String(interviews),
            valueClassName: "text-[#F59E0B]",
        },
        {
            label: "Success Rate",
            value: `${successRate}%`,
            valueClassName: "text-[#22C55E]",
        },
    ];
}
