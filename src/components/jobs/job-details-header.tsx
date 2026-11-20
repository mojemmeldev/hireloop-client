"use client";

import { useState } from "react";
import { BadgeCheckIcon, BookmarkIcon } from "lucide-react";
import { useRouter } from "next/navigation";

import { applyToJob, getApplicationsCount } from "@/lib/actions/applications";
import { useSession } from "@/lib/auth-client";
import { jobDetailsStyles } from "@/lib/styles/job-details";
import type { NewApplication } from "@/lib/types/applications";
import type { JobRow } from "@/lib/types/jobs";

export function JobDetailsHeader({ job }: { job: JobRow }) {
    const { data: session } = useSession();
    const user = session?.user;
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const companyInitial = job.company.trim().charAt(0).toUpperCase() || "?";

   const handleApplyNow = async () => {
    if (!user) {
        router.push(`/sign-in?redirectTo=/browser-jobs/${job._id}`);
        return;
    }

    if (user.role === "seeker") {
        const countResult = await getApplicationsCount(
            `applicantId=${user.id}`
        );

        if (countResult.count >= 10) {
            router.push("/payment");
            return;
        }

        const application: NewApplication = {
            jobId: job._id,
            userId: String(user.id ?? ""),
            name: user.name ?? "",
            email: user.email ?? "",
            jobTitle: job.title,
            companyName: job.company,
            jobType: job.jobType,
            workSetting: job.isRemote ? "Remote" : "On-site",
            appliedAt: new Date().toISOString(),
            status: "Applied",
            isArchived: false,
        };

        setIsSubmitting(true);

        try {
            const result = await applyToJob(application);

            if (result?.insertedId) {
                router.push("/dashboard/seeker/applications");
            }
        } finally {
            setIsSubmitting(false);
        }

    } else {
        console.log("Only job seekers can apply for jobs");
    }
};



    return (
        <header className={jobDetailsStyles.header}>
            <div className={jobDetailsStyles.headerGlow} aria-hidden="true" />

            <div className={jobDetailsStyles.headerMain}>
                <div className={jobDetailsStyles.identity}>
                    <div className={jobDetailsStyles.companyLogo}>{companyInitial}</div>

                    <div className="min-w-0">
                        <h1 className={jobDetailsStyles.jobTitle}>{job.title}</h1>
                        <div className={jobDetailsStyles.jobMeta}>
                            <span>{job.company}</span>
                            <span className={jobDetailsStyles.dot} aria-hidden="true" />
                            <span className={jobDetailsStyles.verified}>
                                <BadgeCheckIcon className="size-4" />
                                Verified Employer
                            </span>
                        </div>
                    </div>
                </div>

                <div className={jobDetailsStyles.headerActions}>
                    <button
                        type="button"
                        aria-label={`Save ${job.title}`}
                        className={jobDetailsStyles.iconButton}
                    >
                        <BookmarkIcon className="size-[18px]" />
                    </button>
                    <button
                        onClick={handleApplyNow}
                        disabled={isSubmitting}
                        type="button"
                        className={jobDetailsStyles.applyButton}
                    >
                        {isSubmitting ? "Applying..." : "Apply Now"}
                    </button>
                </div>
            </div>
        </header>
    );
}
