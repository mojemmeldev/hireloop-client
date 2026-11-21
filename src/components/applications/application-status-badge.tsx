import { applicationsStyles } from "@/lib/styles/applications";
import { getStatusBadgeClass } from "@/lib/utils/applications";
import { cn } from "@/lib/utils";
import type { ApplicationStatus } from "@/lib/types/applications";

/**
 * Pill showing an application's status with its color scheme
 * (Applied / Review / Shortlisted / Rejected / Offered).
 */
export function ApplicationStatusBadge({
    status,
    className,
}: {
    status: ApplicationStatus;
    className?: string;
}) {
    return (
        <span
            className={cn(
                applicationsStyles.statusBadge,
                getStatusBadgeClass(status),
                className,
            )}
        >
            {status}
        </span>
    );
}
