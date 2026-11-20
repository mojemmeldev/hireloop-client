import type { JobRow } from "@/lib/types/jobs";

export type SearchParamValue = string | string[] | undefined;

// Read the first value of a query-string parameter.
export function firstSearchParam(value: SearchParamValue) {
    if (Array.isArray(value)) return value[0] ?? "";
    return value ?? "";
}

export function countJobsBy<K extends "jobType" | "category">(
    jobs: JobRow[],
    field: K
): Record<string, number> {
    return jobs.reduce<Record<string, number>>((counts, job) => {
        counts[job[field]] = (counts[job[field]] ?? 0) + 1;
        return counts;
    }, {});
}

export function formatFilterCount(count: number) {
    if (count >= 1000) return `${(count / 1000).toFixed(1)}k`;
    return String(count);
}
