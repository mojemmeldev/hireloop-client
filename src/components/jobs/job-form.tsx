import type { ReactNode } from "react";

import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    JOB_CATEGORIES,
    SALARY_FREQUENCIES,
    JOB_TYPES,
} from "@/lib/constants/jobs";
import { jobStyles } from "@/lib/styles/jobs";
import { cn } from "@/lib/utils";

// Reusable label + control wrapper shared by the new/update job forms.
export function FormField({
    id,
    label,
    children,
    className,
    labelClassName,
    hint,
}: {
    id?: string;
    label: ReactNode;
    children: ReactNode;
    className?: string;
    labelClassName?: string;
    hint?: ReactNode;
}) {
    const labelNode = (
        <Label htmlFor={id} className={labelClassName ?? jobStyles.label}>
            {label}
        </Label>
    );

    return (
        <div className={cn("flex flex-col gap-1.5", className)}>
            {hint ? (
                <div className="flex items-center justify-between">
                    {labelNode}
                    <span className={jobStyles.hint}>{hint}</span>
                </div>
            ) : (
                labelNode
            )}
            {children}
        </div>
    );
}

export function FormSection({
    number,
    title,
    children,
}: {
    number: number;
    title: string;
    children: ReactNode;
}) {
    return (
        <section className={jobStyles.section}>
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

// Segmented job-type control used by the new-job form.
export function JobTypeToggleGroup({
    value,
    onChange,
}: {
    value: string;
    onChange: (value: string) => void;
}) {
    return (
        <div className={jobStyles.jobTypeGrid}>
            {JOB_TYPES.map((type) => {
                const isSelected = value === type;
                return (
                    <button
                        key={type}
                        type="button"
                        aria-pressed={isSelected}
                        onClick={() => onChange(type)}
                        className={cn(
                            jobStyles.jobTypeOption,
                            isSelected
                                ? jobStyles.jobTypeOptionActive
                                : jobStyles.jobTypeOptionIdle
                        )}
                    >
                        {type}
                    </button>
                );
            })}
        </div>
    );
}

type JobSelectFieldProps = {
    value: string;
    onValueChange: (value: string) => void;
    options: readonly string[];
    id?: string;
    triggerClassName?: string;
    placeholder?: string;
};

export function JobSelectField({
    value,
    onValueChange,
    options,
    id,
    triggerClassName,
    placeholder,
}: JobSelectFieldProps) {
    return (
        <Select value={value} onValueChange={(value) => onValueChange(value ?? "")}>
            <SelectTrigger id={id} className={triggerClassName}>
                {placeholder ? (
                    <SelectValue placeholder={placeholder} />
                ) : (
                    <SelectValue />
                )}
            </SelectTrigger>
            <SelectContent className={jobStyles.selectContent}>
                {options.map((option) => (
                    <SelectItem key={option} value={option}>
                        {option}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}

type JobPresetSelectProps = Omit<JobSelectFieldProps, "options">;

export function JobCategorySelect(props: JobPresetSelectProps) {
    return <JobSelectField options={JOB_CATEGORIES} {...props} />;
}

export function JobTypeSelect(props: JobPresetSelectProps) {
    return <JobSelectField options={JOB_TYPES} {...props} />;
}

export function SalaryFrequencySelect(props: JobPresetSelectProps) {
    return <JobSelectField options={SALARY_FREQUENCIES} {...props} />;
}
