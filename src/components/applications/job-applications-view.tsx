"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeftIcon } from "lucide-react";

import { ApplicantStatusSelect } from "@/components/applications/applicant-status-select";
import { ApplicationsStats } from "@/components/applications/applications-stats";
import { JobTypeBadge } from "@/components/jobs/job-ui";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { updateApplicationStatus } from "@/lib/actions/applications";
import { jobStyles } from "@/lib/styles/jobs";
import type { Application, ApplicationStatus } from "@/lib/types/applications";
import type { JobRow } from "@/lib/types/jobs";
import { formatAppliedAt } from "@/lib/utils/applications";
import { cn } from "@/lib/utils";

const APPLICATION_COLUMNS = [
    "Applicant",
    "Email",
    "Applied",
    "Type",
    "Status",
] as const;

function formatAbsoluteDate(value: string) {
    const time = new Date(value).getTime();
    if (Number.isNaN(time)) return "";
    return new Date(time).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });
}

type JobApplicationsViewProps = {
    job: JobRow;
    applications: Application[];
};

/**
 * Recruiter review screen for a single job post: lists every applicant and
 * lets the recruiter move each one through the pipeline (status select).
 *
 * Status changes are applied optimistically and persisted in the background
 * via `updateApplicationStatus`.
 */
export function JobApplicationsView({
    job,
    applications: initialApplications,
}: JobApplicationsViewProps) {
    const [applications, setApplications] = useState<Application[]>(
        initialApplications,
    );

    const handleStatusChange = (
        applicationId: string,
        status: ApplicationStatus,
    ) => {
        setApplications((current) =>
            current.map((application) =>
                application._id === applicationId
                    ? { ...application, status }
                    : application,
            ),
        );

        // Fire-and-forget: the row already reflects the new status; the API
        // endpoint for persisting it is added on the server later.
        void updateApplicationStatus(applicationId, status);
    };

    return (
        <div className={jobStyles.page}>
            {/* Breadcrumb + heading + back link */}
            <div className="flex flex-col gap-4">
                <nav className="flex items-center gap-1.5 text-xs text-white/50">
                    <Link
                        href="/dashboard/recruiter"
                        className="hover:text-white/80"
                    >
                        Dashboard
                    </Link>
                    <span>/</span>
                    <Link
                        href="/dashboard/recruiter/jobs"
                        className="hover:text-white/80"
                    >
                        Manage Job Posts
                    </Link>
                    <span>/</span>
                    <span className="text-white/85">Applications</span>
                </nav>

                <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="min-w-0 flex-1">
                        <p className={jobStyles.eyebrow}>
                            Applicants &amp; Review
                        </p>
                        <h1 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-[32px]">
                            Job Applications
                        </h1>
                        <p className="mt-2 text-sm text-white/50">
                            {job.title} · {job.company} — review each applicant
                            and update their status.
                        </p>
                    </div>
                    <Link
                        href="/dashboard/recruiter/jobs"
                        className={cn(
                            jobStyles.secondaryButton,
                            "inline-flex h-11 shrink-0 items-center gap-2 rounded-lg px-5 text-sm font-medium",
                        )}
                    >
                        <ArrowLeftIcon className="size-4" />
                        Back to Manage Jobs
                    </Link>
                </div>
            </div>

            <div className={jobStyles.divider} />

            {/* Pipeline stats (reuses the shared stats component) */}
            <ApplicationsStats applications={applications} />

            {/* Applicants table — horizontally scrollable on small screens */}
            <div className={jobStyles.panel}>
                <Table className="min-w-[920px]">
                    <TableHeader>
                        <TableRow className={jobStyles.tableHeadRow}>
                            {APPLICATION_COLUMNS.map((column) => (
                                <TableHead
                                    key={column}
                                    className={jobStyles.tableHead}
                                >
                                    {column}
                                </TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {applications.length === 0 && (
                            <TableRow className={jobStyles.tableHeadRow}>
                                <TableCell
                                    colSpan={APPLICATION_COLUMNS.length}
                                    className={jobStyles.emptyCell}
                                >
                                    No applications yet for this job.
                                </TableCell>
                            </TableRow>
                        )}
                        {applications.map((application) => (
                            <TableRow
                                key={application._id}
                                className={jobStyles.tableRow}
                            >
                                <TableCell className={jobStyles.tableCell}>
                                    <div className="flex items-center gap-3">
                                        <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#1F1F1F] text-sm font-semibold text-[#C3C0FF]">
                                            {application.name
                                                .trim()
                                                .charAt(0)
                                                .toUpperCase() || "?"}
                                        </span>
                                        <p className="font-medium text-white">
                                            {application.name}
                                        </p>
                                    </div>
                                </TableCell>
                                <TableCell
                                    className={`${jobStyles.tableCell} text-sm whitespace-nowrap text-white/70`}
                                >
                                    {application.email}
                                </TableCell>
                                <TableCell className="px-4 py-4 align-middle whitespace-nowrap">
                                    <p className="text-sm text-white/90">
                                        {formatAppliedAt(application.appliedAt)}
                                    </p>
                                    <p className="mt-0.5 text-xs text-white/40">
                                        {formatAbsoluteDate(
                                            application.appliedAt,
                                        )}
                                    </p>
                                </TableCell>
                                <TableCell className={jobStyles.tableCell}>
                                    <JobTypeBadge>
                                        {application.jobType}
                                    </JobTypeBadge>
                                    <p className="mt-1 text-xs text-white/45">
                                        {application.workSetting}
                                    </p>
                                </TableCell>
                                <TableCell className={jobStyles.tableCell}>
                                    <ApplicantStatusSelect
                                        value={application.status}
                                        applicantName={application.name}
                                        onChange={(status) =>
                                            handleStatusChange(
                                                application._id,
                                                status,
                                            )
                                        }
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            <p className="text-sm text-white/40">
                Showing {applications.length === 0 ? 0 : 1}-
                {applications.length} of {applications.length} applicants
            </p>
        </div>
    );
}
