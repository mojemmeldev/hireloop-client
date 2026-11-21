"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { SquarePenIcon } from "lucide-react";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/toast";
import {
    FormField,
    JobCategorySelect,
    JobTypeSelect,
    SalaryFrequencySelect,
} from "@/components/jobs/job-form";
import { JobPrimaryButton } from "@/components/jobs/job-ui";
import { updateJob } from "@/lib/actions/jobs";
import { jobStyles } from "@/lib/styles/jobs";
import type { JobRow, NewJobFormData } from "@/lib/types/jobs";
import { jobFieldId } from "@/lib/utils/jobs";
import { cn } from "@/lib/utils";

export default function UpdateJobForm({ job }: { job: JobRow }) {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState<NewJobFormData>({
        title: job.title,
        company: job.company,
        recruiterId: job.recruiterId,
        category: job.category,
        jobType: job.jobType,
        isRemote: job.isRemote,
        location: job.location,
        deadline: job.deadline,
        minSalary: job.minSalary,
        maxSalary: job.maxSalary,
        salaryFrequency: job.salaryFrequency,
        responsibilities: job.responsibilities,
        qualifications: job.qualifications,
    });

    function handleChange(
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        console.log("[update-job] form submitted:", job._id, formData);

        const res = await updateJob(job._id, formData);
        console.log(res);
        if (res.acknowledged) {
            setOpen(false);
            toast.add({
                title: "update created",
                description: "updated successfully",
            });
            router.push("/dashboard/recruiter/jobs");
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <JobPrimaryButton
                type="button"
                aria-label={`Update ${job.title}`}
                onClick={() => setOpen(true)}
                className={jobStyles.primaryCompact}
            >
                <SquarePenIcon className="size-[18px]" />
                Update
            </JobPrimaryButton>

            <DialogContent className="max-h-[85vh] overflow-y-auto border border-white/10 bg-[#0C0C10] text-white sm:max-w-2xl">
                <DialogHeader>
                    <DialogTitle className="text-white">Update job post</DialogTitle>
                    <DialogDescription className="text-white/50">
                        Edit the details for {job.title} at {job.company}.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <FormField
                        id={jobFieldId(job._id, "title")}
                        label="Job Title"
                        labelClassName={jobStyles.compactLabel}
                    >
                        <Input
                            id={jobFieldId(job._id, "title")}
                            name="title"
                            required
                            value={formData.title}
                            onChange={handleChange}
                            className={jobStyles.compactInput}
                        />
                    </FormField>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <FormField
                            id={jobFieldId(job._id, "company")}
                            label="Company"
                            labelClassName={jobStyles.compactLabel}
                        >
                            <Input
                                id={jobFieldId(job._id, "company")}
                                name="company"
                                required
                                value={formData.company}
                                onChange={handleChange}
                                className={jobStyles.compactInput}
                            />
                        </FormField>

                        <FormField
                            id={jobFieldId(job._id, "category")}
                            label="Category"
                            labelClassName={jobStyles.compactLabel}
                        >
                            <JobCategorySelect
                                id={jobFieldId(job._id, "category")}
                                value={formData.category}
                                onValueChange={(value) =>
                                    setFormData((prev) => ({
                                        ...prev,
                                        category: value,
                                    }))
                                }
                                triggerClassName={jobStyles.compactSelectTrigger}
                            />
                        </FormField>

                        <FormField
                            label="Job Type"
                            labelClassName={jobStyles.compactLabel}
                        >
                            <JobTypeSelect
                                value={formData.jobType}
                                onValueChange={(value) =>
                                    setFormData((prev) => ({
                                        ...prev,
                                        jobType: value,
                                    }))
                                }
                                triggerClassName={jobStyles.compactSelectTrigger}
                            />
                        </FormField>

                        <FormField
                            id={jobFieldId(job._id, "location")}
                            label="Location"
                            labelClassName={jobStyles.compactLabel}
                        >
                            <Input
                                id={jobFieldId(job._id, "location")}
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                className={jobStyles.compactInput}
                            />
                        </FormField>

                        <FormField
                            id={jobFieldId(job._id, "deadline")}
                            label="Deadline"
                            labelClassName={jobStyles.compactLabel}
                        >
                            <Input
                                id={jobFieldId(job._id, "deadline")}
                                name="deadline"
                                type="date"
                                value={formData.deadline}
                                onChange={handleChange}
                                className={jobStyles.compactInput}
                            />
                        </FormField>

                        <div className="flex items-center justify-between gap-4 rounded-lg border border-white/10 bg-[#151519] px-3">
                            <label
                                htmlFor={jobFieldId(job._id, "isRemote")}
                                className={jobStyles.compactLabel}
                            >
                                Remote work allowed
                            </label>
                            <Switch
                                id={jobFieldId(job._id, "isRemote")}
                                checked={formData.isRemote}
                                onCheckedChange={(checked) =>
                                    setFormData((prev) => ({
                                        ...prev,
                                        isRemote: checked === true,
                                    }))
                                }
                            />
                        </div>

                        <FormField
                            id={jobFieldId(job._id, "minSalary")}
                            label="Minimum salary"
                            labelClassName={jobStyles.compactLabel}
                        >
                            <Input
                                id={jobFieldId(job._id, "minSalary")}
                                name="minSalary"
                                inputMode="numeric"
                                value={formData.minSalary}
                                onChange={handleChange}
                                className={jobStyles.compactInput}
                            />
                        </FormField>

                        <FormField
                            id={jobFieldId(job._id, "maxSalary")}
                            label="Maximum salary"
                            labelClassName={jobStyles.compactLabel}
                        >
                            <Input
                                id={jobFieldId(job._id, "maxSalary")}
                                name="maxSalary"
                                inputMode="numeric"
                                value={formData.maxSalary}
                                onChange={handleChange}
                                className={jobStyles.compactInput}
                            />
                        </FormField>
                    </div>

                    <FormField label="Salary frequency" labelClassName={jobStyles.compactLabel}>
                        <SalaryFrequencySelect
                            value={formData.salaryFrequency}
                            onValueChange={(value) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    salaryFrequency: value,
                                }))
                            }
                            triggerClassName={jobStyles.compactSelectTrigger}
                        />
                    </FormField>

                    <FormField
                        id={jobFieldId(job._id, "responsibilities")}
                        label="Responsibilities"
                        labelClassName={jobStyles.compactLabel}
                    >
                        <Textarea
                            id={jobFieldId(job._id, "responsibilities")}
                            name="responsibilities"
                            rows={3}
                            value={formData.responsibilities}
                            onChange={handleChange}
                            className={cn(
                                jobStyles.compactInput,
                                jobStyles.compactTextarea
                            )}
                        />
                    </FormField>

                    <FormField
                        id={jobFieldId(job._id, "qualifications")}
                        label="Qualifications"
                        labelClassName={jobStyles.compactLabel}
                    >
                        <Textarea
                            id={jobFieldId(job._id, "qualifications")}
                            name="qualifications"
                            rows={3}
                            value={formData.qualifications}
                            onChange={handleChange}
                            className={cn(
                                jobStyles.compactInput,
                                jobStyles.compactTextarea
                            )}
                        />
                    </FormField>

                    <DialogFooter className="-mx-4 -mb-4 mt-2 border-white/10 bg-transparent">
                        <JobPrimaryButton
                            type="button"
                            variant="outline"
                            onClick={() => setOpen(false)}
                            className={jobStyles.secondaryButton}
                        >
                            Cancel
                        </JobPrimaryButton>
                        <JobPrimaryButton type="submit">
                            Save changes
                        </JobPrimaryButton>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
