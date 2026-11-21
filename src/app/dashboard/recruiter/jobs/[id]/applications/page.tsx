import { notFound } from "next/navigation";

import { JobApplicationsView } from "@/components/applications/job-applications-view";
import { getApplications } from "@/lib/actions/applications";
import { getJobByID } from "@/lib/api/jobs";

type JobApplicationsPageProps = {
    params: Promise<{ id: string }>;
};

/**
 * /dashboard/recruiter/jobs/[id]/applications
 * Server component: loads the job + its applicants, then hands them to the
 * interactive review view.
 */
const JobApplicationsPage = async ({ params }: JobApplicationsPageProps) => {
    const { id } = await params;

    const [job, applications] = await Promise.all([
        getJobByID(id),
        getApplications(`jobId=${encodeURIComponent(id)}`),
    ]);

    if (!job?._id) notFound();

    return <JobApplicationsView job={job} applications={applications} />;
};

export default JobApplicationsPage;
