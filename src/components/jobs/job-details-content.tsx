import type { ReactNode } from "react";
import {
    BriefcaseIcon,
    DollarSignIcon,
    GraduationCapIcon,
    HeartPulseIcon,
    LandmarkIcon,
    LaptopIcon,
    MapPinIcon,
    PlaneIcon,
} from "lucide-react";

import { jobDetailsStyles } from "@/lib/styles/job-details";
import type { JobRow } from "@/lib/types/jobs";
import { formatJobCompensation } from "@/lib/utils/jobs";
import {
    buildJobDescription,
    getExperienceLabel,
    splitJobLines,
} from "@/lib/utils/job-details";

function InfoCard({
    icon,
    label,
    value,
}: {
    icon: ReactNode;
    label: string;
    value: string;
}) {
    return (
        <div className={jobDetailsStyles.infoCard}>
            {icon}
            <p className={jobDetailsStyles.infoLabel}>{label}</p>
            <p className={jobDetailsStyles.infoValue}>{value}</p>
        </div>
    );
}

function Section({
    title,
    children,
}: {
    title: string;
    children: ReactNode;
}) {
    return (
        <section className={jobDetailsStyles.section}>
            <h2 className={jobDetailsStyles.sectionTitle}>{title}</h2>
            {children}
        </section>
    );
}

function BulletList({ items }: { items: string[] }) {
    if (items.length === 0) {
        return <p className={jobDetailsStyles.sectionBody}>Not provided.</p>;
    }

    return (
        <ul className={jobDetailsStyles.bulletList}>
            {items.map((item, index) => (
                <li key={`${item}-${index}`} className={jobDetailsStyles.bulletItem}>
                    <span className={jobDetailsStyles.bulletDot} aria-hidden="true" />
                    <span>{item}</span>
                </li>
            ))}
        </ul>
    );
}

export function JobInfoGrid({ job }: { job: JobRow }) {
    const location = job.isRemote ? `Remote — ${job.location}` : job.location;

    return (
        <div className={jobDetailsStyles.infoGrid}>
            <InfoCard
                icon={<DollarSignIcon className={jobDetailsStyles.infoIcon} />}
                label="Salary Range"
                value={formatJobCompensation(job)}
            />
            <InfoCard
                icon={<MapPinIcon className={jobDetailsStyles.infoIcon} />}
                label="Location"
                value={location}
            />
            <InfoCard
                icon={<BriefcaseIcon className={jobDetailsStyles.infoIcon} />}
                label="Job Type"
                value={job.jobType}
            />
            <InfoCard
                icon={<GraduationCapIcon className={jobDetailsStyles.infoIcon} />}
                label="Experience"
                value={getExperienceLabel(job.qualifications)}
            />
        </div>
    );
}

const BENEFITS = [
    { label: "Full Health & Dental", icon: HeartPulseIcon },
    { label: "Competitive 401k", icon: LandmarkIcon },
    { label: "Latest Hardware Stipend", icon: LaptopIcon },
    { label: "Unlimited PTO", icon: PlaneIcon },
] as const;

export function JobContentSections({ job }: { job: JobRow }) {
    const tags = [job.category, job.jobType, ...(job.isRemote ? ["Remote"] : [])];

    return (
        <div className={jobDetailsStyles.panel}>
            <div className={jobDetailsStyles.sections}>
                <Section title="Job Description">
                    <p className={jobDetailsStyles.sectionBody}>
                        {buildJobDescription(job)}
                    </p>
                </Section>

                <Section title="Responsibilities">
                    <BulletList items={splitJobLines(job.responsibilities)} />
                </Section>

                <Section title="Requirements">
                    <div className={jobDetailsStyles.tagRow}>
                        {tags.map((tag) => (
                            <span key={tag} className={jobDetailsStyles.tag}>
                                {tag}
                            </span>
                        ))}
                    </div>
                    <BulletList items={splitJobLines(job.qualifications)} />
                </Section>

                <Section title="Benefits">
                    <div className={jobDetailsStyles.benefitsGrid}>
                        {BENEFITS.map(({ label, icon: Icon }) => (
                            <div key={label} className={jobDetailsStyles.benefit}>
                                <span className={jobDetailsStyles.benefitIcon}>
                                    <Icon className="size-5" />
                                </span>
                                {label}
                            </div>
                        ))}
                    </div>
                </Section>
            </div>
        </div>
    );
}
