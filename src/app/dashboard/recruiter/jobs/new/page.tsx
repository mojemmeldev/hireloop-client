"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
    ArrowRightIcon,
    Building2Icon,
    CalendarIcon,
    ChevronRightIcon,
    GlobeIcon,
    MapPinIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";

// Simple flat form state — one key per field
export type NewJobFormData = {
    title: string;
    company: string;
    category: string;
    jobType: string;
    isRemote: boolean;
    location: string;
    deadline: string;
    minSalary: string;
    maxSalary: string;
    salaryFrequency: string;
    responsibilities: string;
    qualifications: string;
};

const jobCategories = [
    "Engineering & Tech",
    "Design",
    "Product",
    "Marketing",
    "Sales",
    "Finance",
    "Operations",
    "Customer Support",
];

const jobTypes = ["Full-time", "Part-time", "Contract", "Internship"];

const salaryFrequencies = ["per hour", "per day", "per month", "per year"];

const labelClass = "text-sm font-medium text-white/90";
const requiredMark = <span className="text-[#645BFF]">*</span>;
const inputClass =
    "h-12 w-full rounded-lg border border-white/5 bg-[#151519] px-4 text-sm text-white placeholder:text-white/45 focus-visible:border-[#5C53FE] focus-visible:ring-[#5C53FE]/40";

// Panel with purple dot + title, matching the figma sections
function FormSection({ number, title, children, }: { number: number; title: string; children: React.ReactNode; }) {
    return (
        <section className="rounded-2xl border border-white/5 bg-[#0C0C10] p-5 sm:p-6">
            <div className="mb-5 flex items-center gap-2.5">
                <span className="size-2 rounded-full bg-[#5C53FE] shadow-[0_0_8px_#5C53FE]" />
                <h2 className="text-lg font-semibold text-white">
                    {number}. {title}
                </h2>
            </div>
            <div className="flex flex-col gap-5">{children}</div>
        </section>
    );
}

const NewJobPage = () => {
    const [formData, setFormData] = useState<NewJobFormData>({
        title: "",
        company: "",
        category: "Engineering & Tech",
        jobType: "Full-time",
        isRemote: false,
        location: "",
        deadline: "",
        minSalary: "",
        maxSalary: "",
        salaryFrequency: "per hour",
        responsibilities: "",
        qualifications: "",
    });

    // one handler for every plain input/textarea
    function handleChange(
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    }

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        // data is ready — wire to your API / backend later
        console.log("[new-job] form submitted:", formData);

        


    }

    return (
        <div className="flex min-h-[calc(100vh-68px)] flex-col gap-6 bg-[#010103] p-4 sm:p-6">
            {/* Breadcrumb + heading + action */}
            <div className="flex flex-col gap-4">
                <nav className="flex items-center gap-1.5 text-xs text-white/50">
                    <Link
                        href="/dashboard/recruiter/jobs"
                        className="hover:text-white/80"
                    >
                        Manage Jobs
                    </Link>
                    <ChevronRightIcon className="size-3" />
                    <span className="text-white/85">Create New Listing</span>
                </nav>

                <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="min-w-0 flex-1">
                        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                            Post a New Job
                        </h1>
                        <p className="mt-2 text-sm text-white/50">
                            Fill in the position specifications to attract qualified talent
                            across our network.
                        </p>
                    </div>

                </div>
            </div>

            <div className="h-px bg-white/10" />

            <form
                id="new-job-form"
                onSubmit={handleSubmit}
                className="flex flex-col gap-6"
            >
                {/* 1. Basic Information */}
                <FormSection number={1} title="Basic Information">
                    <div className="flex flex-col gap-1.5">
                        <Label htmlFor="title" className={labelClass}>
                            Job Title {requiredMark}
                        </Label>
                        <Input
                            id="title"
                            name="title"
                            required
                            placeholder="Frontend Developer"
                            value={formData.title}
                            onChange={handleChange}
                            className={inputClass}
                        />
                    </div>

                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                        <div className="flex flex-col gap-1.5">
                            <Label htmlFor="company" className={labelClass}>
                                Company Name {requiredMark}
                            </Label>
                            <div className="relative">
                                <Building2Icon className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-white/40" />
                                <Input
                                    id="company"
                                    name="company"
                                    required
                                    placeholder="HirePulse Network"
                                    value={formData.company}
                                    onChange={handleChange}
                                    className={`${inputClass} pl-10`}
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <Label className={labelClass}>
                                Job Category {requiredMark}
                            </Label>
                            <Select
                                value={formData.category}
                                onValueChange={(value) =>
                                    setFormData((prev) => ({ ...prev, category: value ?? "" }))
                                }
                            >
                                <SelectTrigger className="h-12 w-full rounded-lg border border-white/5 bg-[#151519] text-sm text-white">
                                    <SelectValue placeholder="Select category" />
                                </SelectTrigger>
                                <SelectContent className="border-white/10 bg-[#141418] text-white">
                                    {jobCategories.map((category) => (
                                        <SelectItem key={category} value={category}>
                                            {category}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Job Type — segmented control */}
                    <div className="flex flex-col gap-1.5">
                        <Label className={labelClass}>
                            Job Type {requiredMark}
                        </Label>
                        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                            {jobTypes.map((type) => {
                                const isSelected = formData.jobType === type;
                                return (
                                    <button
                                        key={type}
                                        type="button"
                                        aria-pressed={isSelected}
                                        onClick={() =>
                                            setFormData((prev) => ({ ...prev, jobType: type }))
                                        }
                                        className={
                                            isSelected
                                                ? "h-12 rounded-lg border border-[#5C53FE] bg-[#5C53FE]/10 text-sm font-medium text-white"
                                                : "h-12 rounded-lg border border-white/10 bg-[#151519] text-sm text-white/60 transition-colors hover:text-white"
                                        }
                                    >
                                        {type}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </FormSection>

                {/* 2. Location, Compensation & Timeline */}
                <FormSection number={2} title="Location, Compensation & Timeline">
                    {/* Remote toggle row */}
                    <div className="flex items-center justify-between gap-4 rounded-xl border border-white/5 bg-[#151519] p-4">
                        <div className="flex items-center gap-3">
                            <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#5C53FE]/15 text-[#645BFF]">
                                <GlobeIcon className="size-4.5" />
                            </span>
                            <div>
                                <p className="text-sm font-semibold text-white">
                                    Remote Work Allowed (isRemote)
                                </p>
                                <p className="text-xs text-white/50">
                                    Enable worldwide or distributed candidate applications
                                </p>
                            </div>
                        </div>
                        <Switch
                            checked={formData.isRemote}
                            onCheckedChange={(checked) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    isRemote: checked === true,
                                }))
                            }
                            className="shrink-0"
                        />
                    </div>

                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                        <div className="flex flex-col gap-1.5">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="location" className={labelClass}>
                                    Job Location (location)
                                </Label>
                                <span className="text-[11px] text-white/35">Required</span>
                            </div>
                            <div className="relative">
                                <MapPinIcon className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-white/40" />
                                <Input
                                    id="location"
                                    name="location"
                                    required
                                    placeholder="New York, USA"
                                    value={formData.location}
                                    onChange={handleChange}
                                    className={`${inputClass} pl-10`}
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <Label htmlFor="deadline" className={labelClass}>
                                Application Deadline (deadline)
                            </Label>
                            <div className="relative">
                                <CalendarIcon className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-white/40" />
                                <Input
                                    id="deadline"
                                    name="deadline"
                                    type="date"
                                    value={formData.deadline}
                                    onChange={handleChange}
                                    onClick={(e) => e.currentTarget.showPicker?.()}
                                    className={`${inputClass} pl-10 [&::-webkit-calendar-picker-indicator]:opacity-0`}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                        <div className="flex flex-col gap-1.5">
                            <Label htmlFor="minSalary" className={labelClass}>
                                Min Salary / Rate
                            </Label>
                            <div className="relative">
                                <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-white/60">
                                    €
                                </span>
                                <Input
                                    id="minSalary"
                                    name="minSalary"
                                    type="number"
                                    min={0}
                                    placeholder="25"
                                    value={formData.minSalary}
                                    onChange={handleChange}
                                    className={`${inputClass} pl-8`}
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <Label htmlFor="maxSalary" className={labelClass}>
                                Max Salary / Rate
                            </Label>
                            <div className="relative">
                                <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-white/60">
                                    €
                                </span>
                                <Input
                                    id="maxSalary"
                                    name="maxSalary"
                                    type="number"
                                    min={0}
                                    placeholder="40"
                                    value={formData.maxSalary}
                                    onChange={handleChange}
                                    className={`${inputClass} pl-8`}
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <Label className={labelClass}>Frequency</Label>
                            <Select
                                value={formData.salaryFrequency}
                                onValueChange={(value) =>
                                    setFormData((prev) => ({
                                        ...prev,
                                        salaryFrequency: value ?? "",
                                    }))
                                }
                            >
                                <SelectTrigger className="h-12 w-full rounded-lg border border-white/5 bg-[#151519] text-sm text-white">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="border-white/10 bg-[#141418] text-white">
                                    {salaryFrequencies.map((frequency) => (
                                        <SelectItem key={frequency} value={frequency}>
                                            {frequency}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </FormSection>

                {/* 3. Responsibilities & Requirements */}
                <FormSection number={3} title="Responsibilities & Requirements">
                    <div className="flex flex-col gap-1.5">
                        <Label htmlFor="responsibilities" className={labelClass}>
                            Key Responsibilities {requiredMark}
                        </Label>
                        <Textarea
                            id="responsibilities"
                            name="responsibilities"
                            required
                            rows={4}
                            placeholder="Showcase your commitment to delivering exceptional user interfaces and digital experiences. You will collaborate directly with systems designers and backend engineers to craft responsive, micro-interaction rich products."
                            value={formData.responsibilities}
                            onChange={handleChange}
                            className={`${inputClass} min-h-32 resize-y px-4 py-3 leading-relaxed`}
                        />
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <Label htmlFor="qualifications" className={labelClass}>
                            Qualifications & Requirements {requiredMark}
                        </Label>
                        <Textarea
                            id="qualifications"
                            name="qualifications"
                            required
                            rows={4}
                            placeholder={
                                "• 3+ years of experience with React, TypeScript, and modern state architectures\n• Solid understanding of DOM performance and component-driven designs\n• Experience partnering closely with product teams and UI/UX designers"
                            }
                            value={formData.qualifications}
                            onChange={handleChange}
                            className={`${inputClass} min-h-32 resize-y px-4 py-3 leading-relaxed`}
                        />
                    </div>
                </FormSection>
                <section>
                    <Button
                        type="submit"
                        form="new-job-form"
                        className="h-11 shrink-0 bg-[#5C53FE] px-5 text-sm font-medium text-white hover:bg-[#4B43F0]"
                    >
                        Publish Job
                        <ArrowRightIcon className="size-4" />
                    </Button>
                </section>
            </form>
        </div>
    );
};

export default NewJobPage;
