"use client"
import {
    BookmarkIcon,
    BriefcaseIcon,
    CalendarIcon,
    DollarSignIcon,
    MapPinIcon,
} from "lucide-react";

import { browseJobsStyles } from "@/lib/styles/browse-jobs";
import type { JobRow } from "@/lib/types/jobs";
import {
    formatJobCompensation,
    formatJobDate,
    isJobExpired,
} from "@/lib/utils/jobs";
import { cn } from "@/lib/utils";
import {  useRouter } from "next/navigation";

export function BrowseJobCard({ job }: { job: JobRow }) {
    const router = useRouter()
    const expired = isJobExpired(job.deadline);
    // const companyInitial = job.company.trim().charAt(0).toUpperCase() || "?";
    const companyInitial =job.company?.trim().charAt(0).toUpperCase() || "?";
    const handleViewJobDetails=()=>{
        router.push(`/browser-jobs/${job._id}`);
    }

    return (
        <article onClick={handleViewJobDetails} className={browseJobsStyles.jobCard}>
            <div className={browseJobsStyles.jobCardTop}>
                <div className={browseJobsStyles.companyLogo}>{companyInitial}</div>

                <div className={browseJobsStyles.jobCardMain}>
                    <h3 className={browseJobsStyles.jobTitle}> {job.title}</h3>
                    <div className={browseJobsStyles.jobMeta}>
                        <span>{job.company}</span>
                        <span aria-hidden="true">•</span>
                        <span className="inline-flex items-center gap-1">
                            <MapPinIcon className="size-4" />
                            {job.location}
                        </span>
                        {job.isRemote && <span>(Remote)</span>}
                    </div>
                </div>

                <button
                    type="button"
                    aria-label={`Save ${job.title}`}
                    className={browseJobsStyles.bookmarkButton}
                >
                    <BookmarkIcon className="size-[18px]" />
                </button>
            </div>

            <div className={browseJobsStyles.badges}>
                <span className={browseJobsStyles.badge}>
                    <DollarSignIcon className="size-3.5" />
                    {formatJobCompensation(job)}
                </span>
                <span className={browseJobsStyles.badge}>
                    <BriefcaseIcon className="size-3.5" />
                    {job.jobType}
                </span>
                <span className={browseJobsStyles.badge}>
                    <CalendarIcon className="size-3.5" />
                    {formatJobDate(job.deadline)}
                </span>
                <span
                    className={cn(
                        browseJobsStyles.badge,
                        expired
                            ? browseJobsStyles.badgeExpired
                            : browseJobsStyles.badgeActive
                    )}
                >
                    {expired ? "Expired" : "Active"}
                </span>
            </div>
        </article>
    );
}
