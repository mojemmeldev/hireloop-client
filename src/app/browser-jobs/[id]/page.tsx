import { notFound } from "next/navigation";

import { JobDetailsView } from "@/components/jobs/job-details-view";
import { getJobByID } from "@/lib/api/jobs";

const JobDetailsPage = async ({ params, }: { params: Promise<{ id: string }>; }) => {
    const { id } = await params;

    const job = await getJobByID(id as "");
   

    if (!job) {
        notFound();
    }

    return <JobDetailsView job={job} />;
};

export default JobDetailsPage;
