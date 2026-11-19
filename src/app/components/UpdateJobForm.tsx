"use client";

import { useState } from "react";
import { SquarePenIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { updateJob, type NewJobFormData } from "@/lib/actions/jobs";
import type { JobRow } from "@/app/dashboard/recruiter/jobs/page";
import { toast } from "@/components/ui/toast";
import { useRouter } from "next/navigation";

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

const labelClass = "text-xs font-medium text-white/80";
const inputClass =
    "h-10 w-full rounded-lg border border-white/10 bg-[#151519] px-3 text-sm text-white placeholder:text-white/40 focus-visible:border-[#5C53FE] focus-visible:ring-[#5C53FE]/40";

export default function UpdateJobForm({ job }: { job: JobRow }) {
    const router = useRouter()
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState<NewJobFormData>({
        title: job.title,
        company: job.company,
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

    const fieldId = (name: string) => `update-${job._id}-${name}`;

    function handleChange(
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        // TODO: call updateJob(job._id, formData) here when you add the functionality.
        console.log("[update-job] form submitted:", job._id, formData);

        const res = await updateJob(job._id, formData)
            console.log(res);
                if (res.acknowledged) {
                    setOpen(false)
                    toast.add({
                        title: "update created",
                        description: "updated successfully",
                    })
                    router.push('/dashboard/recruiter/jobs');
                }
        

    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <Button
                type="button"
                aria-label={`Update ${job.title}`}
                onClick={() => setOpen(true)}
                className="h-8 w-[81px] gap-1.5 rounded-lg bg-[#5C53FE] px-2.5 text-xs text-[#C3C0FF] hover:bg-[#4B43F0]"
            >
                <SquarePenIcon className="size-[18px]" />
                Update
            </Button>

            <DialogContent className="max-h-[85vh] overflow-y-auto border border-white/10 bg-[#0C0C10] text-white sm:max-w-2xl">
                <DialogHeader>
                    <DialogTitle className="text-white">Update job post</DialogTitle>
                    <DialogDescription className="text-white/50">
                        Edit the details for {job.title} at {job.company}.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1.5">
                        <Label htmlFor={fieldId("title")} className={labelClass}>
                            Job Title
                        </Label>
                        <Input
                            id={fieldId("title")}
                            name="title"
                            required
                            value={formData.title}
                            onChange={handleChange}
                            className={inputClass}
                        />
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="flex flex-col gap-1.5">
                            <Label htmlFor={fieldId("company")} className={labelClass}>
                                Company
                            </Label>
                            <Input
                                id={fieldId("company")}
                                name="company"
                                required
                                value={formData.company}
                                onChange={handleChange}
                                className={inputClass}
                            />
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <Label htmlFor={fieldId("category")} className={labelClass}>
                                Category
                            </Label>
                            <Select
                                value={formData.category}
                                onValueChange={(value) =>
                                    setFormData((prev) => ({
                                        ...prev,
                                        category: value ?? "",
                                    }))
                                }
                            >
                                <SelectTrigger id={fieldId("category")} className={inputClass}>
                                    <SelectValue />
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

                        <div className="flex flex-col gap-1.5">
                            <Label className={labelClass}>Job Type</Label>
                            <Select
                                value={formData.jobType}
                                onValueChange={(value) =>
                                    setFormData((prev) => ({
                                        ...prev,
                                        jobType: value ?? "",
                                    }))
                                }
                            >
                                <SelectTrigger className={inputClass}>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="border-white/10 bg-[#141418] text-white">
                                    {jobTypes.map((type) => (
                                        <SelectItem key={type} value={type}>
                                            {type}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <Label htmlFor={fieldId("location")} className={labelClass}>
                                Location
                            </Label>
                            <Input
                                id={fieldId("location")}
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                className={inputClass}
                            />
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <Label htmlFor={fieldId("deadline")} className={labelClass}>
                                Deadline
                            </Label>
                            <Input
                                id={fieldId("deadline")}
                                name="deadline"
                                type="date"
                                value={formData.deadline}
                                onChange={handleChange}
                                className={inputClass}
                            />
                        </div>

                        <div className="flex items-center justify-between gap-4 rounded-lg border border-white/10 bg-[#151519] px-3">
                            <Label htmlFor={fieldId("isRemote")} className={labelClass}>
                                Remote work allowed
                            </Label>
                            <Switch
                                id={fieldId("isRemote")}
                                checked={formData.isRemote}
                                onCheckedChange={(checked) =>
                                    setFormData((prev) => ({
                                        ...prev,
                                        isRemote: checked === true,
                                    }))
                                }
                            />
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <Label htmlFor={fieldId("minSalary")} className={labelClass}>
                                Minimum salary
                            </Label>
                            <Input
                                id={fieldId("minSalary")}
                                name="minSalary"
                                inputMode="numeric"
                                value={formData.minSalary}
                                onChange={handleChange}
                                className={inputClass}
                            />
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <Label htmlFor={fieldId("maxSalary")} className={labelClass}>
                                Maximum salary
                            </Label>
                            <Input
                                id={fieldId("maxSalary")}
                                name="maxSalary"
                                inputMode="numeric"
                                value={formData.maxSalary}
                                onChange={handleChange}
                                className={inputClass}
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <Label className={labelClass}>Salary frequency</Label>
                        <Select
                            value={formData.salaryFrequency}
                            onValueChange={(value) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    salaryFrequency: value ?? "",
                                }))
                            }
                        >
                            <SelectTrigger className={inputClass}>
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

                    <div className="flex flex-col gap-1.5">
                        <Label htmlFor={fieldId("responsibilities")} className={labelClass}>
                            Responsibilities
                        </Label>
                        <Textarea
                            id={fieldId("responsibilities")}
                            name="responsibilities"
                            rows={3}
                            value={formData.responsibilities}
                            onChange={handleChange}
                            className={`${inputClass} h-auto py-2`}
                        />
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <Label htmlFor={fieldId("qualifications")} className={labelClass}>
                            Qualifications
                        </Label>
                        <Textarea
                            id={fieldId("qualifications")}
                            name="qualifications"
                            rows={3}
                            value={formData.qualifications}
                            onChange={handleChange}
                            className={`${inputClass} h-auto py-2`}
                        />
                    </div>

                    <DialogFooter className="-mx-4 -mb-4 mt-2 border-white/10 bg-transparent">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setOpen(false)}
                            className="border-white/10 bg-white/5 text-white hover:bg-white/10"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            className="bg-[#5C53FE] text-white hover:bg-[#4B43F0]"
                        >
                            Save changes
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
