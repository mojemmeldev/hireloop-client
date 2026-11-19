// Shared job types used by the API actions, forms, and recruiter tables.
// Keep these here so components never need to import types from a route file.

export type NewJobFormData = {
    title: string;
    company: string;
    category: string;
    jobType: string;
    isRemote: boolean;
    location: string;
    deadline: string;
    minSalary: string;
    maxSalary: string;
    salaryFrequency: string;
    responsibilities: string;
    qualifications: string;
};

// A row in the manage-jobs table = the form data + listing metadata from the API.
export type JobRow = NewJobFormData & {
    _id: string;
    applicants: number;
    postedAt: string; // ISO date "yyyy-mm-dd" (same format as deadline)
};

export type JobFormField = keyof NewJobFormData;
