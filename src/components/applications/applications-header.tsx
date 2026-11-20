import { DownloadIcon } from "lucide-react";

import { applicationsStyles } from "@/lib/styles/applications";
import { cn } from "@/lib/utils";

export function ApplicationsHeader() {
    return (
        <section className={applicationsStyles.header}>
            <div>
                <h1 className={applicationsStyles.title}>My Applications</h1>
                <p className={applicationsStyles.subtitle}>
                    Track your job applications and interview progress in real-time.
                </p>
            </div>

            <div className={applicationsStyles.headerActions}>
                <div className={applicationsStyles.tabGroup} role="tablist" aria-label="Application status">
                    <button
                        type="button"
                        role="tab"
                        aria-selected="true"
                        className={cn(applicationsStyles.tab, applicationsStyles.activeTab)}
                    >
                        Active
                    </button>
                    <button
                        type="button"
                        role="tab"
                        aria-selected="false"
                        className={cn(applicationsStyles.tab, applicationsStyles.inactiveTab)}
                    >
                        Archived
                    </button>
                </div>

                <button type="button" className={applicationsStyles.exportButton}>
                    <DownloadIcon className="size-3" aria-hidden="true" />
                    Export PDF
                </button>
            </div>
        </section>
    );
}
