import { UsersView } from "@/components/admin/users-view";
import { getUsers } from "@/lib/api/user";
import { toAdminUsers } from "@/lib/utils/users";

/**
 * /dashboard/admin/users — admin user management (figma: Admin / Manage Users).
 * Server component: fetches platform users, normalizes them, then hands the
 * list to the interactive view.
 */
const AdminUsersPage = async () => {
    const rawUsers = await getUsers();
    const users = toAdminUsers(rawUsers);

    return <UsersView users={users} />;
};

export default AdminUsersPage;
