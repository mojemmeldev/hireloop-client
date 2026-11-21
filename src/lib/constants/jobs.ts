import type { NewJobFormData } from "@/lib/types/jobs";

export const JOB_CATEGORIES = [
    "Engineering & Tech",
    "Design",
    "Product",
    "Marketing",
    "Sales",
    "Finance",
    "Operations",
    "Customer Support",
] as const;

export const JOB_TYPES = [
    "Full-time",
    "Part-time",
    "Contract",
    "Internship",
] as const;

export const SALARY_FREQUENCIES = [
    "per hour",
    "per day",
    "per month",
    "per year",
] as const;

export const JOB_TABLE_COLUMNS = [
    "Job Title & Dept",
    "Company & Location",
    "Type",
    "Compensation",
    "Applicants",
    "Deadline",
    "Status",
    "Actions",
] as const;

export const SALARY_FREQUENCY_SUFFIX: Record<string, string> = {
    "per hour": "/ hr",
    "per day": "/ day",
    "per month": "/ mo",
    "per year": "/ yr",
};

export const EMPTY_JOB_FORM: NewJobFormData = {
    title: "",
    company: "",
    category: "Engineering & Tech",
    recruiterId: "",
    jobType: "Full-time",
    isRemote: false,
    location: "",
    deadline: "",
    minSalary: "",
    maxSalary: "",
    salaryFrequency: "per hour",
    responsibilities: "",
    qualifications: "",
};
