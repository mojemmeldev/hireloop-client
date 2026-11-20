import { CompanyOverview } from "@/components/jobs/company-overview";
import { JobContentSections, JobInfoGrid } from "@/components/jobs/job-details-content";
import { JobDetailsHeader } from "@/components/jobs/job-details-header";
import { jobDetailsStyles } from "@/lib/styles/job-details";
import type { JobRow } from "@/lib/types/jobs";

export function JobDetailsView({ job }: { job: JobRow }) {
    return (
        <main className={jobDetailsStyles.page}>
            <JobDetailsHeader job={job} />

            <div className={jobDetailsStyles.contentGrid}>
                <div className="min-w-0">
                    <JobInfoGrid job={job} />
                    <JobContentSections job={job} />
                </div>
                <CompanyOverview job={job} />
            </div>
        </main>
    );
}
