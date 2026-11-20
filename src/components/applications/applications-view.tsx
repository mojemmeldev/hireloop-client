import { ApplicationsHeader } from "@/components/applications/applications-header";
import { ApplicationsStats } from "@/components/applications/applications-stats";
import { ApplicationsTable } from "@/components/applications/applications-table";
import { ApplicationsTopBar } from "@/components/applications/applications-top-bar";
import { applicationsStyles } from "@/lib/styles/applications";
import type { Application } from "@/lib/types/applications";

export function ApplicationsView({ applications }: { applications: Application[] }) {
    const activeApplications = applications.filter((application) => !application.isArchived);

    return (
        <main className={applicationsStyles.page}>
            <div className={applicationsStyles.content}>
                <ApplicationsTopBar />
                <ApplicationsHeader />
                <ApplicationsStats applications={applications} />

                {activeApplications.length > 0 ? (
                    <ApplicationsTable applications={activeApplications} />
                ) : (
                    <p className="mt-6 rounded-2xl border border-white/[0.06] bg-[#141418] p-10 text-center text-[13px] text-[#A0A0AB]">
                        No applications yet.
                    </p>
                )}
            </div>
        </main>
    );
}
