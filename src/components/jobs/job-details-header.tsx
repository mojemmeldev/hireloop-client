import { BadgeCheckIcon, BookmarkIcon } from "lucide-react";

import { jobDetailsStyles } from "@/lib/styles/job-details";
import type { JobRow } from "@/lib/types/jobs";

export function JobDetailsHeader({ job }: { job: JobRow }) {
    const companyInitial = job.company.trim().charAt(0).toUpperCase() || "?";

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
                    <button type="button" className={jobDetailsStyles.applyButton}>
                        Apply Now
                    </button>
                </div>
            </div>
        </header>
    );
}
