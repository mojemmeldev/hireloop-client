import Link from "next/link";
import { PlusIcon } from "lucide-react";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { JobPrimaryButton, JobStatusBadge, JobTypeBadge } from "@/components/jobs/job-ui";
import { JOB_TABLE_COLUMNS } from "@/lib/constants/jobs";
import { getJobs } from "@/lib/api/jobs";
import { jobStyles } from "@/lib/styles/jobs";
import type { JobRow as SharedJobRow } from "@/lib/types/jobs";
import {
    formatJobCompensation,
    formatJobDate,
    formatPostedAgo,
    isJobExpired,
} from "@/lib/utils/jobs";
import { DeleteJobDialog } from "@/app/components/DeleteJobDialog";
import UpdateJobForm from "@/app/components/UpdateJobForm";

// Kept exported for backwards compatibility with existing imports.
export type JobRow = SharedJobRow;

const RecruiterJobsPage = async () => {
    const jobs: JobRow[] = await getJobs("");

    return (
        <div className={jobStyles.page}>
            {/* Breadcrumb + heading + action */}
            <div className="flex flex-col gap-4">
                <nav className="flex items-center gap-1.5 text-xs text-white/50">
                    <Link
                        href="/dashboard/recruiter"
                        className="hover:text-white/80"
                    >
                        Dashboard
                    </Link>
                    <span>/</span>
                    <span className="text-white/85">Manage Job Posts</span>
                </nav>

                <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="min-w-0 flex-1">
                        <p className={jobStyles.eyebrow}>
                            Job Listings &amp; Postings
                        </p>
                        <h1 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-[32px]">
                            Manage Job Posts
                        </h1>
                        <p className="mt-2 text-sm text-white/50">
                            Review live listings, monitor applicants, and update
                            job details across your organization.
                        </p>
                    </div>
                    <JobPrimaryButton
                        render={<Link href="/dashboard/recruiter/jobs/new" />}
                        nativeButton={false}
                        className={jobStyles.primaryLarge}
                    >
                        <PlusIcon className="size-4" />
                        New Job Post
                    </JobPrimaryButton>
                </div>
            </div>

            <div className={jobStyles.divider} />

            {/* Listings table — horizontally scrollable on small screens */}
            <div className={jobStyles.panel}>
                <Table className="min-w-[1120px]">
                    <TableHeader>
                        <TableRow className={jobStyles.tableHeadRow}>
                            {JOB_TABLE_COLUMNS.map((column) => (
                                <TableHead key={column} className={jobStyles.tableHead}>
                                    {column}
                                </TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {jobs.length === 0 && (
                            <TableRow className={jobStyles.tableHeadRow}>
                                <TableCell
                                    colSpan={JOB_TABLE_COLUMNS.length}
                                    className={jobStyles.emptyCell}
                                >
                                    No job posts yet. Create your first listing.
                                </TableCell>
                            </TableRow>
                        )}
                        {jobs.map((job) => {
                            const expired = isJobExpired(job.deadline);
                            return (
                                <TableRow key={job._id} className={jobStyles.tableRow}>
                                    <TableCell className={jobStyles.tableCell}>
                                        <p className="font-medium text-white">
                                            {job.title}
                                        </p>
                                        <p className="mt-0.5 text-xs text-white/45">
                                            {job.category}
                                        </p>
                                    </TableCell>
                                    <TableCell className={jobStyles.tableCell}>
                                        <p className="text-sm font-medium text-white/90">
                                            {job.company}
                                        </p>
                                        <p className="mt-0.5 text-xs text-white/45">
                                            {job.location}
                                        </p>
                                    </TableCell>
                                    <TableCell className={jobStyles.tableCell}>
                                        <JobTypeBadge>{job.jobType}</JobTypeBadge>
                                    </TableCell>
                                    <TableCell className={`${jobStyles.tableCell} text-sm whitespace-nowrap text-white/80`}>
                                        {formatJobCompensation(job)}
                                    </TableCell>
                                    <TableCell className={`${jobStyles.tableCell} text-sm whitespace-nowrap text-white/80`}>
                                        {job.applicants} Candidates
                                    </TableCell>
                                    <TableCell className={`${jobStyles.tableCell} whitespace-nowrap`}>
                                        <p className="text-sm text-white/90">
                                            {formatJobDate(job.deadline)}
                                        </p>
                                        <p className="mt-0.5 text-xs text-white/40">
                                            {formatPostedAgo(job.postedAt)}
                                        </p>
                                    </TableCell>
                                    <TableCell className={jobStyles.tableCell}>
                                        <JobStatusBadge expired={expired} />
                                    </TableCell>
                                    <TableCell className={jobStyles.tableCell}>
                                        <div className={jobStyles.tableActions}>
                                            <UpdateJobForm job={job} />
                                            <DeleteJobDialog job={job} />
                                        </div>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </div>

            <p className="text-sm text-white/40">
                Showing {jobs.length === 0 ? 0 : 1}-{jobs.length} of{" "}
                {jobs.length} jobs
            </p>
        </div>
    );
};

export default RecruiterJobsPage;
