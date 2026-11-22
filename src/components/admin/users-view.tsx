"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { DownloadIcon, SearchIcon } from "lucide-react";

import { UserStats } from "@/components/admin/user-stats";
import { UsersTable } from "@/components/admin/users-table";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { ROLE_LABELS, ROLE_OPTIONS } from "@/lib/constants/users";
import { adminStyles } from "@/lib/styles/admin";
import { jobStyles } from "@/lib/styles/jobs";
import type { AdminUser, PlatformRole, RoleFilter } from "@/lib/types/users";
import { filterUsers, getUserStats } from "@/lib/utils/users";

type UsersViewProps = {
    users: AdminUser[];
};

/**
 * Admin "User Management" screen (figma: Admin / Manage Users).
 * Holds the toolbar state (search + role filter) and the user list used by
 * the per-row role toggles.
 */
export function UsersView({ users: initialUsers }: UsersViewProps) {
    const [users, setUsers] = useState<AdminUser[]>(initialUsers);
    const [query, setQuery] = useState("");
    const [roleFilter, setRoleFilter] = useState<RoleFilter>("all");

    const visibleUsers = useMemo(
        () => filterUsers(users, query, roleFilter),
        [users, query, roleFilter],
    );
    const stats = useMemo(() => getUserStats(users), [users]);

    /**
     * Role toggle event handler — UI update only.
     * TODO: implement the role-update API call here (you'll add this later);
     * until then the change is local to this page and not persisted.
     */
    function handleRoleChange(userId: string, role: PlatformRole) {
        console.log("[role-change]", userId, role);
        setUsers((current) =>
            current.map((user) =>
                user.id === userId ? { ...user, role } : user,
            ),
        );
    }

    // TODO: implement CSV export later.
    function handleExport() {
        console.log("[export-users]", users.length);
    }

    return (
        <div className={adminStyles.page}>
            {/* Breadcrumb + page header */}
            <div className="flex flex-col gap-4">
                <nav className={adminStyles.breadcrumb}>
                    <Link
                        href="/dashboard"
                        className={adminStyles.breadcrumbLink}
                    >
                        Dashboard
                    </Link>
                    <span>/</span>
                    <span className={adminStyles.breadcrumbCurrent}>
                        Manage Users
                    </span>
                </nav>

                <div className={adminStyles.header}>
                    <div className="min-w-0 flex-1">
                        <p className={adminStyles.eyebrow}>Admin Console</p>
                        <h1 className={adminStyles.title}>User Management</h1>
                        <p className={adminStyles.subtitle}>
                            Review, filter, and manage platform access for all
                            users.
                        </p>
                    </div>
                </div>
            </div>

            {/* Toolbar: search + role filter …… export */}
            <div className={adminStyles.toolbar}>
                <label className={adminStyles.search}>
                    <SearchIcon
                        className={adminStyles.searchIcon}
                        aria-hidden
                    />
                    <input
                        type="search"
                        value={query}
                        onChange={(event) => setQuery(event.target.value)}
                        placeholder="Search by email..."
                        aria-label="Search users by name or email"
                        className={adminStyles.searchInput}
                    />
                </label>

                <Select
                    value={roleFilter}
                    onValueChange={(value) =>
                        setRoleFilter((value ?? "all") as RoleFilter)
                    }
                >
                    <SelectTrigger
                        aria-label="Filter users by role"
                        className={adminStyles.filterTrigger}
                    >
                        <SelectValue>
                            {(current) =>
                                current === "all"
                                    ? "All Roles"
                                    : (ROLE_LABELS[current as PlatformRole] ??
                                      "All Roles")
                            }
                        </SelectValue>
                    </SelectTrigger>
                    <SelectContent
                        className={adminStyles.filterContent}
                        side="bottom"
                        align="start"
                    >
                        <SelectItem
                            value="all"
                            className={adminStyles.roleSelectItem}
                        >
                            All Roles
                        </SelectItem>
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

                <button
                    type="button"
                    onClick={handleExport}
                    className={adminStyles.exportButton}
                >
                    <DownloadIcon className="size-4" aria-hidden />
                    Export List
                </button>
            </div>

            {/* Stats + table */}
            <UserStats stats={stats} />
            <UsersTable users={visibleUsers} onRoleChange={handleRoleChange} />

            <p className={adminStyles.footerCount}>
                Showing {visibleUsers.length} of {users.length} users
            </p>
        </div>
    );
}
