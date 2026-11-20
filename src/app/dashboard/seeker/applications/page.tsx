import { headers } from "next/headers";

import { ApplicationsView } from "@/components/applications/applications-view";
import { getApplications } from "@/lib/actions/applications";
import { auth } from "@/lib/auth";

const ApplicationsPage = async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    const applicantId = session?.user.id;
    const applications = applicantId
        ? await getApplications(`applicantId=${encodeURIComponent(applicantId)}`)
        : [];

    return <ApplicationsView applications={applications} />;
};

export default ApplicationsPage;
