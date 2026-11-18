"use client";

import React, { useState } from "react";
import Link from "next/link";
import { EyeIcon, PlusIcon, Trash2Icon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table";
import type { NewJobFormData } from "@/lib/actions/jobs";

// A row in the manage-jobs table = what the new-job form stores + listing meta
export type JobRow = NewJobFormData & {
    id: string;
    applicants: number;
    postedAt: string; // ISO date "yyyy-mm-dd" (same format as deadline)
};

// Dummy data shaped exactly like NewJobFormData (deadline is an ISO string,
// same as what <input type="date"> produces on the new-job page)
const dummyJobs: JobRow[] = [
    {
        id: "job_1",
        title: "Senior Product Designer",
        company: "HirePulse Network",
        category: "Design",
        jobType: "Full-time",
        isRemote: true,
        location: "Remote (New York, USA)",
        deadline: "2026-12-30",
        minSalary: "",
        maxSalary: "40",
        salaryFrequency: "per hour",
        responsibilities: "Own the design system and ship features.",
        qualifications: "5+ years of experience in product design.",
        applicants: 34,
        postedAt: "2026-11-14",
    },
    {
        id: "job_2",
        title: "Lead Frontend Engineer",
        company: "HirePulse Labs",
        category: "Engineering & Tech",
        jobType: "Contract",
        isRemote: false,
        location: "London, UK (Hybrid)",
        deadline: "2027-01-15",
        minSalary: "90000",
        maxSalary: "115000",
        salaryFrequency: "per year",
        responsibilities: "Lead frontend architecture.",
        qualifications: "Strong React + TypeScript.",
        applicants: 19,
        postedAt: "2026-11-07",
    },
    {
        id: "job_3",
        title: "DevOps Specialist",
        company: "HirePulse Platform",
        category: "Engineering & Tech",
        jobType: "Full-time",
        isRemote: false,
        location: "Berlin, Germany",
        deadline: "2026-12-31",
        minSalary: "95000",
        maxSalary: "120000",
        salaryFrequency: "per year",
        responsibilities: "Run our CI/CD and cloud infrastructure.",
        qualifications: "Kubernetes + AWS experience.",
        applicants: 12,
        postedAt: "2026-11-04",
    },
    {
        id: "job_4",
        title: "Product Marketing Lead",
        company: "HirePulse Media",
        category: "Marketing",
        jobType: "Full-time",
        isRemote: true,
        location: "Remote (EU/US)",
        deadline: "2027-02-01",
        minSalary: "80000",
        maxSalary: "105000",
        salaryFrequency: "per year",
        responsibilities: "Own go-to-market for new launches.",
        qualifications: "B2B SaaS marketing background.",
        applicants: 27,
        postedAt: "2026-11-13",
    },
    {
        id: "job_5",
        title: "QA Automation Engineer",
        company: "HirePulse Labs",
        category: "Engineering & Tech",
        jobType: "Contract",
        isRemote: false,
        location: "Dublin, Ireland (Hybrid)",
        deadline: "2026-11-01", // in the past → shows "Expired"
        minSalary: "50",
        maxSalary: "",
        salaryFrequency: "per hour",
        responsibilities: "Build and maintain test suites.",
        qualifications: "Cypress/Playwright expertise.",
        applicants: 8,
        postedAt: "2026-10-25",
    },
];

// "May 30, 2025" style — parses the ISO date at local midnight so the
// calendar day never shifts across timezones
function formatDate(iso: string) {
    const date = new Date(`${iso}T00:00:00`);
    return date.toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
    });
}

function isExpired(iso: string) {
    const today = new Date().toISOString().slice(0, 10);
    return iso < today;
}

// "Posted 4d ago" / "Posted 1w ago" — same phrasing as the figma
function postedAgo(iso: string) {
    const days = Math.floor(
        (Date.now() - new Date(`${iso}T00:00:00`).getTime()) / 86_400_000
    );
    if (days <= 0) return "Posted today";
    if (days === 1) return "Posted 1d ago";
    if (days < 7) return `Posted ${days}d ago`;
    return `Posted ${Math.floor(days / 7)}w ago`;
}

// "90k - 115k / yr" or "40 / hr" (figma style)
function formatCompensation(job: JobRow) {
    const suffix: Record<string, string> = {
        "per hour": "/ hr",
        "per day": "/ day",
        "per month": "/ mo",
        "per year": "/ yr",
    };
    const money = (value: string) => {
        const n = Number(value);
        if (!value || Number.isNaN(n)) return null;
        return n >= 1000 ? `${Math.round(n / 1000)}k` : `${n}`;
    };
    const min = money(job.minSalary);
    const max = money(job.maxSalary);
    const range = min && max ? `${min} - ${max}` : (max ?? min);
    if (!range) return "—";
    return `${range} ${suffix[job.salaryFrequency] ?? ""}`.trim();
}

const columns = [
    "Job Title & Dept",
    "Company & Location",
    "Type",
    "Compensation",
    "Applicants",
    "Deadline",
    "Status",
    "Actions",
];

const ManageJobsPage = () => {
    const [jobs, setJobs] = useState<JobRow[]>(dummyJobs);
    const [viewJob, setViewJob] = useState<JobRow | null>(null);

    // Remove a listing from the table (wire to DELETE /jobs/:id later)
    function handleDelete(id: string) {
        if (!window.confirm("Delete this job post?")) return;
        setJobs((prev) => prev.filter((job) => job.id !== id));
        setViewJob((current) => (current?.id === id ? null : current));
    }

    return (
        <div className="flex min-h-[calc(100vh-68px)] flex-col gap-6 bg-[#010103] p-4 sm:p-6">
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
                        <p className="font-mono text-xs tracking-wider text-[#645BFF] uppercase">
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
                    <Button
                        render={
                            <Link href="/dashboard/recruiter/jobs/new" />
                        }
                        nativeButton={false}
                        className="h-11 shrink-0 bg-[#5C53FE] px-5 text-sm font-medium text-white hover:bg-[#4B43F0]"
                    >
                        <PlusIcon className="size-4" />
                        New Job Post
                    </Button>
                </div>
            </div>

            <div className="h-px bg-white/10" />

            {/* Listings table — horizontally scrollable on small screens */}
            <div className="overflow-x-auto rounded-2xl border border-white/5 bg-[#0C0C10]">
                <Table className="min-w-[1120px]">
                    <TableHeader>
                        <TableRow className="border-white/5 hover:bg-transparent">
                            {columns.map((column) => (
                                <TableHead
                                    key={column}
                                    className="px-4 py-3 font-mono text-xs tracking-wider text-white/40 uppercase"
                                >
                                    {column}
                                </TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {jobs.length === 0 && (
                            <TableRow className="border-white/5 hover:bg-transparent">
                                <TableCell
                                    colSpan={columns.length}
                                    className="px-4 py-10 text-center text-sm text-white/40"
                                >
                                    No job posts yet. Create your first listing.
                                </TableCell>
                            </TableRow>
                        )}
                        {jobs.map((job) => {
                            const expired = isExpired(job.deadline);
                            return (
                                <TableRow
                                    key={job.id}
                                    className="border-white/5 hover:bg-white/[0.03]"
                                >
                                    <TableCell className="px-4 py-4 align-top">
                                        <p className="font-medium text-white">
                                            {job.title}
                                        </p>
                                        <p className="mt-0.5 text-xs text-white/45">
                                            {job.category}
                                        </p>
                                    </TableCell>
                                    <TableCell className="px-4 py-4 align-top">
                                        <p className="text-sm font-medium text-white/90">
                                            {job.company}
                                        </p>
                                        <p className="mt-0.5 text-xs text-white/45">
                                            {job.location}
                                        </p>
                                    </TableCell>
                                    <TableCell className="px-4 py-4 align-top">
                                        <span className="inline-block rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-white/70">
                                            {job.jobType}
                                        </span>
                                    </TableCell>
                                    <TableCell className="px-4 py-4 align-top text-sm whitespace-nowrap text-white/80">
                                        {formatCompensation(job)}
                                    </TableCell>
                                    <TableCell className="px-4 py-4 align-top text-sm whitespace-nowrap text-white/80">
                                        {job.applicants} Candidates
                                    </TableCell>
                                    <TableCell className="px-4 py-4 align-top whitespace-nowrap">
                                        <p className="text-sm text-white/90">
                                            {formatDate(job.deadline)}
                                        </p>
                                        <p className="mt-0.5 text-xs text-white/40">
                                            {postedAgo(job.postedAt)}
                                        </p>
                                    </TableCell>
                                    <TableCell className="px-4 py-4 align-top">
                                        <span
                                            className={
                                                expired
                                                    ? "inline-block rounded-full border border-red-500/30 bg-red-500/10 px-2.5 py-1 text-xs font-medium text-red-400"
                                                    : "inline-block rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-400"
                                            }
                                        >
                                            {expired ? "Expired" : "Active"}
                                        </span>
                                    </TableCell>
                                    <TableCell className="px-4 py-4 align-top">
                                        <div className="flex items-center gap-2">
                                            <Button
                                                variant="outline"
                                                onClick={() =>
                                                    setViewJob(job)
                                                }
                                                className="h-8 border-white/10 bg-white/5 px-3 text-xs text-white hover:bg-white/10"
                                            >
                                                <EyeIcon className="size-3.5" />
                                                View
                                            </Button>
                                            <Button
                                                variant="outline"
                                                onClick={() =>
                                                    handleDelete(job.id)
                                                }
                                                className="h-8 border-red-500/30 bg-red-500/10 px-3 text-xs text-red-400 hover:bg-red-500/20"
                                            >
                                                <Trash2Icon className="size-3.5" />
                                                Delete
                                            </Button>
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

            {/* View job details */}
            <Dialog
                open={viewJob !== null}
                onOpenChange={(open) => {
                    if (!open) setViewJob(null);
                }}
            >
                <DialogContent className="border border-white/10 bg-[#0C0C10] text-white sm:max-w-lg">
                    {viewJob && (
                        <>
                            <DialogHeader>
                                <p className="font-mono text-xs tracking-wider text-[#645BFF] uppercase">
                                    {viewJob.category}
                                </p>
                                <DialogTitle className="text-white">
                                    {viewJob.title}
                                </DialogTitle>
                                <DialogDescription className="text-white/50">
                                    {viewJob.company} · {viewJob.location}
                                </DialogDescription>
                            </DialogHeader>

                            <dl className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
                                <div>
                                    <dt className="text-xs text-white/40">
                                        Status
                                    </dt>
                                    <dd className="mt-1 text-white/90">
                                        {isExpired(viewJob.deadline)
                                            ? "Expired"
                                            : "Active"}
                                    </dd>
                                </div>
                                <div>
                                    <dt className="text-xs text-white/40">
                                        Job Type
                                    </dt>
                                    <dd className="mt-1 text-white/90">
                                        {viewJob.jobType}
                                    </dd>
                                </div>
                                <div>
                                    <dt className="text-xs text-white/40">
                                        Compensation
                                    </dt>
                                    <dd className="mt-1 whitespace-nowrap text-white/90">
                                        {formatCompensation(viewJob)}
                                    </dd>
                                </div>
                                <div>
                                    <dt className="text-xs text-white/40">
                                        Applicants
                                    </dt>
                                    <dd className="mt-1 text-white/90">
                                        {viewJob.applicants} Candidates
                                    </dd>
                                </div>
                                <div>
                                    <dt className="text-xs text-white/40">
                                        Deadline
                                    </dt>
                                    <dd className="mt-1 text-white/90">
                                        {formatDate(viewJob.deadline)}
                                    </dd>
                                </div>
                                <div>
                                    <dt className="text-xs text-white/40">
                                        Posted
                                    </dt>
                                    <dd className="mt-1 text-white/90">
                                        {postedAgo(viewJob.postedAt)}
                                    </dd>
                                </div>
                            </dl>

                            <div className="space-y-3 text-sm">
                                <div>
                                    <p className="text-xs text-white/40">
                                        Responsibilities
                                    </p>
                                    <p className="mt-1 leading-relaxed text-white/80">
                                        {viewJob.responsibilities || "—"}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-xs text-white/40">
                                        Qualifications
                                    </p>
                                    <p className="mt-1 leading-relaxed text-white/80">
                                        {viewJob.qualifications || "—"}
                                    </p>
                                </div>
                            </div>

                            <DialogFooter className="-mx-4 -mb-4 rounded-b-xl border-t border-white/10 bg-transparent p-4">
                                <Button
                                    variant="outline"
                                    onClick={() => setViewJob(null)}
                                    className="border-white/10 bg-white/5 text-white hover:bg-white/10"
                                >
                                    Close
                                </Button>
                            </DialogFooter>
                        </>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default ManageJobsPage;
