import { ApplicationsView } from "@/components/applications/applications-view";
import { DUMMY_APPLICATIONS } from "@/lib/constants/applications";

const ApplicationsPage = () => {
    return <ApplicationsView applications={DUMMY_APPLICATIONS} />;
};

export default ApplicationsPage;
