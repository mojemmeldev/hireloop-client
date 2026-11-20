import type { JobRow } from "@/lib/types/jobs";

export function splitJobLines(value: string) {
    return value
        .split(/\r?\n/)
        .map((line) => line.trim().replace(/^[•\-*]\s*/, ""))
        .filter(Boolean);
}

export function getExperienceLabel(qualifications: string) {
    const match = qualifications.match(/(\d+(?:\+)?)\s*years?/i);
    return match ? `${match[1]} Years` : "Not specified";
}

export function buildJobDescription(job: JobRow) {
    const location = job.isRemote
        ? `This is a remote opportunity open to candidates based in ${job.location}.`
        : `The role is based in ${job.location}.`;

    return `Join ${job.company} as a ${job.title} on the ${job.category} team. This ${job.jobType.toLowerCase()} position focuses on delivering high-quality work with a collaborative, product-minded team. ${location}`;
}
