import {
    BrowseJobsFilters,
    BrowseJobsSearch,
    BrowseJobsSort,
} from "@/components/jobs/browse-jobs-controls";
import { BrowseJobCard } from "@/components/jobs/browse-job-card";
import { getJobs } from "@/lib/api/jobs";
import { browseJobsStyles } from "@/lib/styles/browse-jobs";
import type { JobRow } from "@/lib/types/jobs";
import { countJobsBy, firstSearchParam } from "@/lib/utils/browse-jobs";

type SearchParams = Record<string, string | string[] | undefined>;

const BrowserJobsPage = async ({ searchParams, }: { searchParams: Promise<SearchParams>; }) => { const params = await searchParams;

    // Only read the URL for initial values. The controls do not write back to it.
    const search = new URLSearchParams();
    for (const [key, value] of Object.entries(params)) {
        if (Array.isArray(value)) {
            value.forEach((item) => search.append(key, item));
        } else if (value !== undefined) {
            search.set(key, value);
        }
    }
    const query = search.toString();
    

    const jobs: JobRow[] = await getJobs(query as "");

    return (
        <main className={browseJobsStyles.page}>
            {/* Handlers are intentionally omitted — wire them to searchParams later. */}
            <BrowseJobsSearch initialQuery={firstSearchParam(params.query)} />

            <div className={browseJobsStyles.contentGrid}>
                <BrowseJobsFilters
                    initialFilters={{
                        jobType: firstSearchParam(params.jobType),
                        category: firstSearchParam(params.category),
                        remoteOnly: firstSearchParam(params.remoteOnly) === "true",
                    }}
                    jobTypeCounts={countJobsBy(jobs, "jobType")}
                    categoryCounts={countJobsBy(jobs, "category")}
                    remoteCount={jobs.filter((job) => job.isRemote).length}
                />

                <section>
                    <div className={browseJobsStyles.resultsHeader}>
                        <h1 className={browseJobsStyles.resultsTitle}>
                            Found {jobs.length.toLocaleString("en-US")} Professional Jobs
                        </h1>
                        <BrowseJobsSort initialSort={firstSearchParam(params.sort)} />
                    </div>

                    {jobs.length === 0 ? (
                        <p className={browseJobsStyles.empty}>
                            No job posts yet. Check back soon for new opportunities.
                        </p>
                    ) : (
                        <div className={browseJobsStyles.jobGrid}>
                            {jobs.map((job) => (
                                <BrowseJobCard key={job._id} job={job} />
                            ))}
                        </div>
                    )}
                </section>
            </div>
        </main>
    );
};

export default BrowserJobsPage;
