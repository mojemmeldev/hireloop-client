import type { ComponentProps, ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { jobStyles } from "@/lib/styles/jobs";
import { cn } from "@/lib/utils";

// Shared primary action button for the jobs screens. All sizing/layout is
// passed in by the caller; the brand colors live in jobStyles.primary.
export function JobPrimaryButton({
    className,
    ...props
}: ComponentProps<typeof Button>) {
    return <Button {...props} className={cn(jobStyles.primary, className)} />;
}

export function JobTypeBadge({ children }: { children: ReactNode }) {
    return <span className={jobStyles.typeBadge}>{children}</span>;
}

export function JobStatusBadge({ expired }: { expired: boolean }) {
    return (
        <span
            className={cn(
                jobStyles.statusBadge,
                expired ? jobStyles.statusExpired : jobStyles.statusActive
            )}
        >
            {expired ? "Expired" : "Active"}
        </span>
    );
}
