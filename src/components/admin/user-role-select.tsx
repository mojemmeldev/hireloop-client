"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ROLE_BADGE_STYLES, ROLE_LABELS, ROLE_OPTIONS } from "@/lib/constants/users";
import { adminStyles } from "@/lib/styles/admin";
import { cn } from "@/lib/utils";
import type { PlatformRole } from "@/lib/types/users";

type UserRoleSelectProps = {
    value: PlatformRole;
    userName: string;
    onChange: (role: PlatformRole) => void;
    disabled?: boolean;
};

/**
 * The per-row role toggle: a colored pill (Admin / Recruiter / Seeker) that
 * opens a dropdown. The pill color reflects the current role via
 * ROLE_BADGE_STYLES; picking an option calls `onChange` with the new role.
 */
export function UserRoleSelect({
    value,
    userName,
    onChange,
    disabled = false,
}: UserRoleSelectProps) {
    return (
        <Select
            value={value}
            onValueChange={(role) => role && onChange(role as PlatformRole)}
        >
            <SelectTrigger
                aria-label={`Change role for ${userName}`}
                disabled={disabled}
                className={cn(adminStyles.roleSelectTrigger, ROLE_BADGE_STYLES[value])}
            >
                {/* Values are lowercase ("seeker"); display the capitalized label */}
                <SelectValue>
                    {(current) =>
                        ROLE_LABELS[current as PlatformRole] ?? String(current ?? "")
                    }
                </SelectValue>
            </SelectTrigger>
            <SelectContent
                className={adminStyles.roleSelectContent}
                side="bottom"
                align="start"
            >
                {ROLE_OPTIONS.map((role) => (
                    <SelectItem
                        key={role}
                        value={role}
                        className={adminStyles.roleSelectItem}
                    >
                        {ROLE_LABELS[role]}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}
