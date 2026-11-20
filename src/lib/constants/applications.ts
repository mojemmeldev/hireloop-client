import type { Application, ApplicationStatus } from "@/lib/types/applications";

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

export const COMPANY_LOGO_STYLES: Record<string, string> = {
    "Stark Industries": "bg-[#C6C6C7] text-[#0B0B0C]",
    "Cyberdyne Systems": "bg-[#474746] text-[#EDEDEF]",
    "Wayne Enterprises": "bg-[#222228] text-[#EDEDEF]",
    "Oscorp Tech": "bg-[#93000A] text-[#FFFFFF]",
    "Hooli Corp": "border border-white/10 bg-[#222228] text-[#EDEDEF]",
};

export const APPLICATION_STATS = [
    { label: "Total Applied", value: "24", valueClassName: "text-[#EDEDEF]" },
    { label: "Shortlisted", value: "8", valueClassName: "text-[#EDEDEF]" },
    { label: "Interviews", value: "3", valueClassName: "text-[#F59E0B]" },
    { label: "Success Rate", value: "12%", valueClassName: "text-[#22C55E]" },
] as const;

const hoursAgo = (hours: number) =>
    new Date(Date.now() - hours * 60 * 60 * 1000).toISOString();

// Dummy rows mirror the Figma "Seeker / My Applications" table.
export const DUMMY_APPLICATIONS: Application[] = [
    {
        _id: "app-1",
        jobId: "job-1",
        userId: "user-1",
        name: "Alex Morgan",
        email: "alex.morgan@example.com",
        jobTitle: "Senior Frontend Engineer",
        companyName: "Stark Industries",
        jobType: "Full-time",
        workSetting: "Remote",
        appliedAt: hoursAgo(2),
        status: "Applied",
        isArchived: false,
    },
    {
        _id: "app-2",
        jobId: "job-2",
        userId: "user-1",
        name: "Alex Morgan",
        email: "alex.morgan@example.com",
        jobTitle: "Product Designer",
        companyName: "Cyberdyne Systems",
        jobType: "Contract",
        workSetting: "Hybrid",
        appliedAt: hoursAgo(24),
        status: "Review",
        isArchived: false,
    },
    {
        _id: "app-3",
        jobId: "job-3",
        userId: "user-1",
        name: "Alex Morgan",
        email: "alex.morgan@example.com",
        jobTitle: "Lead Data Scientist",
        companyName: "Wayne Enterprises",
        jobType: "Full-time",
        workSetting: "On-site",
        appliedAt: hoursAgo(24 * 4),
        status: "Shortlisted",
        isArchived: false,
    },
    {
        _id: "app-4",
        jobId: "job-4",
        userId: "user-1",
        name: "Alex Morgan",
        email: "alex.morgan@example.com",
        jobTitle: "Cloud Architect",
        companyName: "Oscorp Tech",
        jobType: "Full-time",
        workSetting: "Remote",
        appliedAt: hoursAgo(24 * 7),
        status: "Rejected",
        isArchived: false,
    },
    {
        _id: "app-5",
        jobId: "job-5",
        userId: "user-1",
        name: "Alex Morgan",
        email: "alex.morgan@example.com",
        jobTitle: "AI Research Engineer",
        companyName: "Hooli Corp",
        jobType: "Full-time",
        workSetting: "Hybrid",
        appliedAt: hoursAgo(24 * 14),
        status: "Offered",
        isArchived: false,
    },
];
