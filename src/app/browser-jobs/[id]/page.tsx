import { notFound } from "next/navigation";

import { JobDetailsView } from "@/components/jobs/job-details-view";
import { getJobs } from "@/lib/api/jobs";
import type { JobRow } from "@/lib/types/jobs";

const JobDetailsPage = async ({ params, }: { params: Promise<{ id: string }>; }) => {
    const { id } = await params;
    const jobs: JobRow[] = await getJobs("");
    const job = jobs.find((item) => item._id === id);

    if (!job) notFound();

    return <JobDetailsView job={job} />;
};

export default JobDetailsPage;
