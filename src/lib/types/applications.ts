// Shared application types used by the save action, seeker dashboard, and tables.

export type ApplicationStatus =
    | "Applied"
    | "Review"
    | "Shortlisted"
    | "Rejected"
    | "Offered";

export type WorkSetting = "Remote" | "Hybrid" | "On-site";

// Fields saved to /applications. The table columns on the seeker's
// My Applications page are derived from jobTitle, companyName, appliedAt,
// status, jobType, and workSetting.
export type Application = {
    _id: string;
    jobId: string;
    userId: string;
    name: string;
    email: string;
    jobTitle: string;
    companyName: string;
    jobType: string;
    workSetting: WorkSetting;
    appliedAt: string; // ISO date string
    status: ApplicationStatus;
    isArchived: boolean;
};

export type NewApplication = Omit<Application, "_id">;
