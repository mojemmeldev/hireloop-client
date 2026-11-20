"use client";

import type { ChangeEvent, FormEvent, ReactNode } from "react";
import { CheckIcon, ChevronDownIcon, SearchIcon } from "lucide-react";

import { JOB_CATEGORIES, JOB_TYPES } from "@/lib/constants/jobs";
import { browseJobsStyles } from "@/lib/styles/browse-jobs";
import { formatFilterCount } from "@/lib/utils/browse-jobs";
import { cn } from "@/lib/utils";

export type BrowseJobFilters = {
    jobType: string;
    category: string;
    remoteOnly: boolean;
};

const SORT_OPTIONS = [
    { value: "postedAt", label: "Most Recent" },
    { value: "deadline", label: "Deadline" },
    { value: "minSalary", label: "Salary" },
] as const;

type SearchProps = {
    initialQuery?: string;
    onSearch?: (query: string) => void;
};

type FiltersProps = {
    initialFilters?: Partial<BrowseJobFilters>;
    jobTypeCounts?: Record<string, number>;
    categoryCounts?: Record<string, number>;
    remoteCount?: number;
    onFilterChange?: (filters: BrowseJobFilters) => void;
};

type SortProps = {
    initialSort?: string;
    onSortChange?: (value: string) => void;
};

// Read the form instead of keeping local state. This keeps the UI presentational
// and lets the page own whatever searchParams logic it needs later.
function readFilters(form: HTMLFormElement): BrowseJobFilters {
    const data = new FormData(form);
    const remote = data.get("remoteOnly");

    return {
        jobType: String(data.get("jobType") ?? ""),
        category: String(data.get("category") ?? ""),
        remoteOnly: remote === "on" || remote === "true",
    };
}

export function BrowseJobsSearch({ initialQuery = "", onSearch }: SearchProps) {
    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const query = String(new FormData(event.currentTarget).get("query") ?? "");
        onSearch?.(query);
    }

    return (
        <form onSubmit={handleSubmit} className={browseJobsStyles.searchPanel}>
            <div className={browseJobsStyles.searchRow}>
                <div className={browseJobsStyles.searchInputWrap}>
                    <SearchIcon className={browseJobsStyles.searchIcon} />
                    <input
                        name="query"
                        defaultValue={initialQuery}
                        placeholder="Search by job title, keywords..."
                        aria-label="Search jobs"
                        className={browseJobsStyles.searchInput}
                    />
                </div>
                <button type="submit" className={browseJobsStyles.searchButton}>
                    Search Jobs
                </button>
            </div>
        </form>
    );
}

function FilterOption({
    name,
    value,
    label,
    count,
    inputType,
    defaultChecked,
}: {
    name: string;
    value: string;
    label: string;
    count: number;
    inputType: "radio" | "checkbox";
    defaultChecked?: boolean;
}) {
    return (
        <label className={browseJobsStyles.filterRow}>
            <span className={browseJobsStyles.filterLabel}>
                <input
                    type={inputType}
                    name={name}
                    value={value}
                    defaultChecked={defaultChecked}
                    className="peer sr-only"
                />
                <span
                    className={cn(
                        browseJobsStyles.checkbox,
                        browseJobsStyles.checkboxChecked
                    )}
                >
                    <CheckIcon className="size-3.5" />
                </span>
                <span className="truncate">{label}</span>
            </span>
            <span className={browseJobsStyles.filterCount}>
                {formatFilterCount(count)}
            </span>
        </label>
    );
}

export function FilterGroup({
    title,
    children,
}: {
    title: string;
    children: ReactNode;
}) {
    return (
        <div className={browseJobsStyles.filterGroup}>
            <h3 className={browseJobsStyles.filterGroupTitle}>{title}</h3>
            <div className={browseJobsStyles.filterList}>{children}</div>
        </div>
    );
}

export function BrowseJobsFilters({
    initialFilters,
    jobTypeCounts,
    categoryCounts,
    remoteCount = 0,
    onFilterChange,
}: FiltersProps) {
    function handleChange(event: ChangeEvent<HTMLFormElement>) {
        onFilterChange?.(readFilters(event.currentTarget));
    }

    return (
        <aside className={browseJobsStyles.sidebar}>
            <h2 className={browseJobsStyles.sidebarTitle}>Filters</h2>
            <form onChange={handleChange}>
                <FilterGroup title="Job Type">
                    {JOB_TYPES.map((type) => (
                        <FilterOption
                            key={type}
                            inputType="radio"
                            name="jobType"
                            value={type}
                            label={type}
                            count={jobTypeCounts?.[type] ?? 0}
                            defaultChecked={initialFilters?.jobType === type}
                        />
                    ))}
                </FilterGroup>

                <FilterGroup title="Category">
                    {JOB_CATEGORIES.map((category) => (
                        <FilterOption
                            key={category}
                            inputType="radio"
                            name="category"
                            value={category}
                            label={category}
                            count={categoryCounts?.[category] ?? 0}
                            defaultChecked={initialFilters?.category === category}
                        />
                    ))}
                </FilterGroup>

                <FilterGroup title="Work Setting">
                    <FilterOption
                        inputType="checkbox"
                        name="remoteOnly"
                        value="true"
                        label="Remote"
                        count={remoteCount}
                        defaultChecked={initialFilters?.remoteOnly}
                    />
                </FilterGroup>
            </form>
        </aside>
    );
}

export function BrowseJobsSort({ initialSort, onSortChange }: SortProps) {
    return (
        <div className={browseJobsStyles.sortWrap}>
            <span className={browseJobsStyles.sortLabel}>Sort by:</span>
            <div className={browseJobsStyles.sortSelectWrap}>
                <select
                    name="sort"
                    defaultValue={initialSort ?? "postedAt"}
                    onChange={(event) => onSortChange?.(event.target.value)}
                    aria-label="Sort jobs"
                    className={browseJobsStyles.sortSelect}
                >
                    {SORT_OPTIONS.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
                <ChevronDownIcon className={browseJobsStyles.sortChevron} />
            </div>
        </div>
    );
}
