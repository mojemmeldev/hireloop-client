import { adminStyles } from "@/lib/styles/admin";
import type { UserStat } from "@/lib/utils/users";

/** Four bento stat cards above the users table (figma: Bento Stats Grid). */
export function UserStats({ stats }: { stats: UserStat[] }) {
    return (
        <section
            className={adminStyles.statsGrid}
            aria-label="User statistics"
        >
            {stats.map((stat) => (
                <div key={stat.label} className={adminStyles.statCard}>
                    <p className={adminStyles.statLabel}>{stat.label}</p>
                    <p className={adminStyles.statValue}>{stat.value}</p>
                    <p className={adminStyles.statHint}>{stat.hint}</p>
                </div>
            ))}
        </section>
    );
}
