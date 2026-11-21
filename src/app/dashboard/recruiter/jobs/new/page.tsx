"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import Link from "next/link";
import {
    ArrowRightIcon,
    Building2Icon,
    CalendarIcon,
    ChevronRightIcon,
    GlobeIcon,
    MapPinIcon,
} from "lucide-react";

import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/toast";
import { useRouter } from "next/navigation";
import {
    FormField,
    FormSection,
    JobCategorySelect,
    JobTypeToggleGroup,
    SalaryFrequencySelect,
} from "@/components/jobs/job-form";
import { JobPrimaryButton } from "@/components/jobs/job-ui";
import { createJob } from "@/lib/actions/jobs";
import { EMPTY_JOB_FORM } from "@/lib/constants/jobs";
import { jobStyles } from "@/lib/styles/jobs";
import type { NewJobFormData } from "@/lib/types/jobs";
import { cn } from "@/lib/utils";
import { useSession } from "@/lib/auth-client";

const requiredMark = <span className={jobStyles.required}>*</span>;

const NewJobPage = () => {

    const { data: session } = useSession()
    const recruiterId = session?.user?.id;

    const [formData, setFormData] = useState<NewJobFormData>({
        ...EMPTY_JOB_FORM,
    });


    const router = useRouter()

    // one handler for every plain input/textarea
    function handleChange(
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    }

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (!recruiterId) {
            return;
        }


        const JobData = { ...formData, recruiterId }
        // data is ready — wire to your API / backend later
        console.log("[new-job] form submitted:", formData);

        const result = await createJob(JobData)
        console.log("fetch result ", result);

        if (result.insertedId) {
            toast.add({
                title: "Job created",
                description: "The job has beex successfully created.",
            })
            router.push('/dashboard/recruiter/jobs');
        }

    }

    return (
        <div className={jobStyles.page}>
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

            <div className={jobStyles.divider} />

            <form
                id="new-job-form"
                onSubmit={handleSubmit}
                className="flex flex-col gap-6"
            >
                {/* 1. Basic Information */}
                <FormSection number={1} title="Basic Information">
                    <FormField id="title" label={<>Job Title {requiredMark}</>}>
                        <Input
                            id="title"
                            name="title"
                            required
                            placeholder="Frontend Developer"
                            value={formData.title}
                            onChange={handleChange}
                            className={jobStyles.input}
                        />
                    </FormField>

                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                        <FormField
                            id="company"
                            label={<>Company Name {requiredMark}</>}
                        >
                            <div className="relative">
                                <Building2Icon className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-white/40" />
                                <Input
                                    id="company"
                                    name="company"
                                    required
                                    placeholder="HirePulse Network"
                                    value={formData.company}
                                    onChange={handleChange}
                                    className={cn(jobStyles.input, "pl-10")}
                                />
                            </div>
                        </FormField>

                        <FormField label={<>Job Category {requiredMark}</>}>
                            <JobCategorySelect
                                value={formData.category}
                                onValueChange={(value) =>
                                    setFormData((prev) => ({
                                        ...prev,
                                        category: value ?? "",
                                    }))
                                }
                                placeholder="Select category"
                                triggerClassName={jobStyles.selectTrigger}
                            />
                        </FormField>
                    </div>

                    {/* Job Type — segmented control */}
                    <FormField label={<>Job Type {requiredMark}</>}>
                        <JobTypeToggleGroup
                            value={formData.jobType}
                            onChange={(jobType) =>
                                setFormData((prev) => ({ ...prev, jobType }))
                            }
                        />
                    </FormField>
                </FormSection>

                {/* 2. Location, Compensation & Timeline */}
                <FormSection number={2} title="Location, Compensation & Timeline">
                    {/* Remote toggle row */}
                    <div className={jobStyles.remotePanel}>
                        <div className="flex items-center gap-3">
                            <span className={jobStyles.remoteIcon}>
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
                        <FormField
                            id="location"
                            label="Job Location (location)"
                            hint="Required"
                        >
                            <div className="relative">
                                <MapPinIcon className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-white/40" />
                                <Input
                                    id="location"
                                    name="location"
                                    required
                                    placeholder="New York, USA"
                                    value={formData.location}
                                    onChange={handleChange}
                                    className={cn(jobStyles.input, "pl-10")}
                                />
                            </div>
                        </FormField>

                        <FormField
                            id="deadline"
                            label="Application Deadline (deadline)"
                        >
                            <div className="relative">
                                <CalendarIcon className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-white/40" />
                                <Input
                                    id="deadline"
                                    name="deadline"
                                    type="date"
                                    value={formData.deadline}
                                    onChange={handleChange}
                                    className={cn(jobStyles.input, "pl-10")}
                                />
                            </div>
                        </FormField>
                    </div>

                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                        <FormField id="minSalary" label="Min Salary / Rate">
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
                                    className={cn(jobStyles.input, "pl-8")}
                                />
                            </div>
                        </FormField>

                        <FormField id="maxSalary" label="Max Salary / Rate">
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
                                    className={cn(jobStyles.input, "pl-8")}
                                />
                            </div>
                        </FormField>

                        <FormField label="Frequency">
                            <SalaryFrequencySelect
                                value={formData.salaryFrequency}
                                onValueChange={(value) =>
                                    setFormData((prev) => ({
                                        ...prev,
                                        salaryFrequency: value ?? "",
                                    }))
                                }
                                triggerClassName={jobStyles.selectTrigger}
                            />
                        </FormField>
                    </div>
                </FormSection>

                {/* 3. Responsibilities & Requirements */}
                <FormSection number={3} title="Responsibilities & Requirements">
                    <FormField
                        id="responsibilities"
                        label={<>Key Responsibilities {requiredMark}</>}
                    >
                        <Textarea
                            id="responsibilities"
                            name="responsibilities"
                            required
                            rows={4}
                            placeholder="Showcase your commitment to delivering exceptional user interfaces and digital experiences. You will collaborate directly with systems designers and backend engineers to craft responsive, micro-interaction rich products."
                            value={formData.responsibilities}
                            onChange={handleChange}
                            className={cn(jobStyles.input, jobStyles.textarea)}
                        />
                    </FormField>

                    <FormField
                        id="qualifications"
                        label={<>Qualifications & Requirements {requiredMark}</>}
                    >
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
                            className={cn(jobStyles.input, jobStyles.textarea)}
                        />
                    </FormField>
                </FormSection>
                <section>
                    <JobPrimaryButton
                        type="submit"
                        form="new-job-form"
                        className={jobStyles.primaryLarge}
                    >
                        Publish Job
                        <ArrowRightIcon className="size-4" />
                    </JobPrimaryButton>
                </section>
            </form>
        </div>
    );
};

export default NewJobPage;
