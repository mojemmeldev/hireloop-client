import { SALARY_FREQUENCY_SUFFIX } from "@/lib/constants/jobs";
import type { JobFormField, JobRow } from "@/lib/types/jobs";

// "May 30, 2025" style — parses the ISO date at local midnight so the
// calendar day never shifts across timezones.
export function formatJobDate(iso: string) {
    const date = new Date(`${iso}T00:00:00`);
    return date.toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
    });
}

export function isJobExpired(iso: string) {
    const today = new Date().toISOString().slice(0, 10);
    return iso < today;
}

// "Posted 4d ago" / "Posted 1w ago" — same phrasing as the figma.
export function formatPostedAgo(iso: string) {
    const days = Math.floor(
        (Date.now() - new Date(`${iso}T00:00:00`).getTime()) / 86_400_000
    );
    if (days <= 0) return "Posted today";
    if (days === 1) return "Posted 1d ago";
    if (days < 7) return `Posted ${days}d ago`;
    return `Posted ${Math.floor(days / 7)}w ago`;
}

// "90k - 115k / yr" or "40 / hr" (figma style).
export function formatJobCompensation(
    job: Pick<JobRow, "minSalary" | "maxSalary" | "salaryFrequency">
) {
    const money = (value: string) => {
        const n = Number(value);
        if (!value || Number.isNaN(n)) return null;
        return n >= 1000 ? `${Math.round(n / 1000)}k` : `${n}`;
    };
    const min = money(job.minSalary);
    const max = money(job.maxSalary);
    const range = min && max ? `${min} - ${max}` : (max ?? min);
    if (!range) return "—";
    return `${range} ${SALARY_FREQUENCY_SUFFIX[job.salaryFrequency] ?? ""}`.trim();
}

// Stable DOM ids for fields rendered inside a per-row dialog.
export function jobFieldId(jobId: string, field: JobFormField | string) {
    return `update-${jobId}-${field}`;
}
