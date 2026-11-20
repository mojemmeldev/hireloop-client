import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

import { applicationsStyles } from "@/lib/styles/applications";
import type { Application } from "@/lib/types/applications";
import {
    formatAppliedAt,
    getCompanyInitial,
    getCompanyLogoClass,
    getStatusBadgeClass,
} from "@/lib/utils/applications";
import { cn } from "@/lib/utils";

export function ApplicationsTable({ applications }: { applications: Application[] }) {
    return (
        <section className={applicationsStyles.tablePanel}>
            <table className={applicationsStyles.table}>
                <colgroup>
                    <col style={{ width: "30%" }} />
                    <col style={{ width: "20%" }} />
                    <col style={{ width: "15%" }} />
                    <col style={{ width: "18%" }} />
                    <col style={{ width: "17%" }} />
                </colgroup>

                <thead className={applicationsStyles.tableHeader}>
                    <tr>
                        <th scope="col" className={applicationsStyles.tableHeaderCell}>
                            Job Title
                        </th>
                        <th scope="col" className={applicationsStyles.tableHeaderCell}>
                            Company
                        </th>
                        <th scope="col" className={applicationsStyles.tableHeaderCell}>
                            Applied
                        </th>
                        <th scope="col" className={applicationsStyles.tableHeaderCell}>
                            Status
                        </th>
                        <th
                            scope="col"
                            className={cn(applicationsStyles.tableHeaderCell, "text-right")}
                        >
                            Action
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {applications.map((application) => (
                        <tr key={application._id} className={applicationsStyles.tableRow}>
                            <td className={applicationsStyles.tableCell}>
                                <div className={applicationsStyles.jobCell}>
                                    <span
                                        className={cn(
                                            applicationsStyles.companyLogo,
                                            getCompanyLogoClass(application.companyName),
                                        )}
                                    >
                                        {getCompanyInitial(application.companyName)}
                                    </span>
                                    <div className="min-w-0">
                                        <p className={applicationsStyles.jobTitle}>
                                            {application.jobTitle}
                                        </p>
                                        <p className={applicationsStyles.jobMeta}>
                                            {application.jobType} • {application.workSetting}
                                        </p>
                                    </div>
                                </div>
                            </td>
                            <td className={applicationsStyles.tableCell}>
                                <span className={applicationsStyles.companyName}>
                                    {application.companyName}
                                </span>
                            </td>
                            <td className={applicationsStyles.tableCell}>
                                <span className={applicationsStyles.appliedAt}>
                                    {formatAppliedAt(application.appliedAt)}
                                </span>
                            </td>
                            <td className={applicationsStyles.tableCell}>
                                <span
                                    className={cn(
                                        applicationsStyles.statusBadge,
                                        getStatusBadgeClass(application.status),
                                    )}
                                >
                                    {application.status}
                                </span>
                            </td>
                            <td className={cn(applicationsStyles.tableCell, "text-right")}>
                                <button type="button" className={applicationsStyles.detailsButton}>
                                    Details
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className={applicationsStyles.pagination}>
                <p className={applicationsStyles.paginationLabel}>
                    Showing 1-{applications.length} of {applications.length} applications
                </p>
                <div className={applicationsStyles.paginationControls}>
                    <button
                        type="button"
                        aria-label="Previous page"
                        className={applicationsStyles.paginationButton}
                    >
                        <ChevronLeftIcon className="size-4" />
                    </button>
                    <button type="button" aria-current="page" className={applicationsStyles.paginationPage}>
                        1
                    </button>
                    {[2, 3].map((page) => (
                        <button
                            key={page}
                            type="button"
                            className={applicationsStyles.paginationButton}
                        >
                            {page}
                        </button>
                    ))}
                    <button
                        type="button"
                        aria-label="Next page"
                        className={applicationsStyles.paginationButton}
                    >
                        <ChevronRightIcon className="size-4" />
                    </button>
                </div>
            </div>
        </section>
    );
}
