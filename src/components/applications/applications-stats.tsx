import { applicationsStyles } from "@/lib/styles/applications";
import type { Application } from "@/lib/types/applications";
import { getApplicationStats } from "@/lib/utils/applications";
import { cn } from "@/lib/utils";

export function ApplicationsStats({ applications }: { applications: Application[] }) {
    const stats = getApplicationStats(applications);

    return (
        <section className={applicationsStyles.statsGrid} aria-label="Application statistics">
            {stats.map((stat) => (
                <div key={stat.label} className={applicationsStyles.statCard}>
                    <p className={applicationsStyles.statLabel}>{stat.label}</p>
                    <p className={cn(applicationsStyles.statValue, stat.valueClassName)}>
                        {stat.value}
                    </p>
                </div>
            ))}
        </section>
    );
}
