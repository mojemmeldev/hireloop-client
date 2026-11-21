"use client";

import { ChevronDownIcon } from "lucide-react";

import { APPLICATION_STATUSES } from "@/lib/constants/applications";
import { applicationsStyles } from "@/lib/styles/applications";
import { getStatusBadgeClass } from "@/lib/utils/applications";
import { cn } from "@/lib/utils";
import type { ApplicationStatus } from "@/lib/types/applications";

type ApplicantStatusSelectProps = {
    value: ApplicationStatus;
    applicantName: string;
    onChange: (status: ApplicationStatus) => void;
    disabled?: boolean;
};

/**
 * Colored dropdown for one applicant's status. The wrapper carries the status
 * colors (same scheme as ApplicationStatusBadge) and the transparent select
 * inherits them, so the control itself reads as a colored status pill.
 */
export function ApplicantStatusSelect({
    value,
    applicantName,
    onChange,
    disabled = false,
}: ApplicantStatusSelectProps) {
    return (
        <div
            className={cn(applicationsStyles.statusSelectWrap, getStatusBadgeClass(value))}
        >
            <select
                aria-label={`Status for ${applicantName}`}
                value={value}
                disabled={disabled}
                onChange={(event) =>
                    onChange(event.target.value as ApplicationStatus)
                }
                className={applicationsStyles.statusSelect}
            >
                {APPLICATION_STATUSES.map((status) => (
                    <option
                        key={status}
                        value={status}
                        className="bg-[#141418] text-white"
                    >
                        {status}
                    </option>
                ))}
            </select>
            <ChevronDownIcon
                className={applicationsStyles.statusSelectIcon}
                aria-hidden
            />
        </div>
    );
}
