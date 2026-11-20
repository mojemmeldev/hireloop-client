import { APPLICATION_STATS } from "@/lib/constants/applications";
import { applicationsStyles } from "@/lib/styles/applications";
import { cn } from "@/lib/utils";

export function ApplicationsStats() {
    return (
        <section className={applicationsStyles.statsGrid} aria-label="Application statistics">
            {APPLICATION_STATS.map((stat) => (
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
