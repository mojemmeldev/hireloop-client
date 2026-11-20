"use server";

import { revalidatePath } from "next/cache";

import type { NewApplication } from "@/lib/types/applications";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URI || "http://localhost:5000";

const REQUIRED_FIELDS = [
    "jobId",
    "userId",
    "name",
    "email",
    "jobTitle",
    "companyName",
    "jobType",
    "workSetting",
    "appliedAt",
    "status",
] as const;

export async function applyToJob(data: NewApplication) {
    for (const field of REQUIRED_FIELDS) {
        if (!String(data[field] ?? "").trim()) {
            throw new Error(`Missing application field: ${field}`);
        }
    }

    const res = await fetch(`${BASE_URL}/applications`, {
        method: "POST",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify(data),
    });

    const result = await res.json();
    if (!res.ok) {
        throw new Error(result?.message ?? "Failed to save application");
    }

    revalidatePath("/dashboard/seeker/applications");
    return result;
}

// Backward-compatible alias for the previous action name.
export async function applyToAJOb(data: NewApplication) {
    return applyToJob(data);
}
