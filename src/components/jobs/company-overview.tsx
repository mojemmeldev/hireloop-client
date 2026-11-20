import { jobDetailsStyles } from "@/lib/styles/job-details";
import type { JobRow } from "@/lib/types/jobs";

export function CompanyOverview({ job }: { job: JobRow }) {
    return (
        <aside className={jobDetailsStyles.sidebar}>
            <h2 className={jobDetailsStyles.sidebarTitle}>Company Overview</h2>

            <div className={jobDetailsStyles.cover} aria-hidden="true" />

            <div className={jobDetailsStyles.sidebarRows}>
                <div className={jobDetailsStyles.sidebarRow}>
                    <span className={jobDetailsStyles.sidebarLabel}>SIZE</span>
                    <span className={jobDetailsStyles.sidebarValue}>Not specified</span>
                </div>
                <div className={jobDetailsStyles.sidebarRow}>
                    <span className={jobDetailsStyles.sidebarLabel}>INDUSTRY</span>
                    <span className={jobDetailsStyles.sidebarValue}>{job.category}</span>
                </div>
            </div>

            <button type="button" className={jobDetailsStyles.visitButton}>
                Visit Website
            </button>
        </aside>
    );
}
