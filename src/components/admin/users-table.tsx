import { UserRoleSelect } from "@/components/admin/user-role-select";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { jobStyles } from "@/lib/styles/jobs";
import { adminStyles } from "@/lib/styles/admin";
import type { AdminUser, PlatformRole } from "@/lib/types/users";
import { formatJoinDate, getUserInitial } from "@/lib/utils/users";

const USER_COLUMNS = ["User Name", "Role", "Join Date"] as const;

type UsersTableProps = {
    users: AdminUser[];
    onRoleChange: (userId: string, role: PlatformRole) => void;
};

/**
 * Presentational table of platform users — figma's "High-Density Data Table".
 * The Role column holds the toggleable role dropdown for each row.
 */
export function UsersTable({ users, onRoleChange }: UsersTableProps) {
    return (
        <div className={jobStyles.panel}>
            <Table className="min-w-[720px]">
                <TableHeader>
                    <TableRow className={jobStyles.tableHeadRow}>
                        {USER_COLUMNS.map((column) => (
                            <TableHead key={column} className={jobStyles.tableHead}>
                                {column}
                            </TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {users.length === 0 && (
                        <TableRow className={jobStyles.tableHeadRow}>
                            <TableCell
                                colSpan={USER_COLUMNS.length}
                                className={jobStyles.emptyCell}
                            >
                                No users match your filters.
                            </TableCell>
                        </TableRow>
                    )}
                    {users.map((user) => (
                        <TableRow key={user.id} className={jobStyles.tableRow}>
                            <TableCell className={jobStyles.tableCell}>
                                <div className={adminStyles.userCell}>
                                    <span
                                        className={adminStyles.avatar}
                                        aria-hidden
                                    >
                                        {getUserInitial(user)}
                                    </span>
                                    <div className="min-w-0">
                                        <p className={adminStyles.userName}>
                                            {user.name}
                                        </p>
                                        <p className={adminStyles.userEmail}>
                                            {user.email}
                                        </p>
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell className={jobStyles.tableCell}>
                                <UserRoleSelect
                                    value={user.role}
                                    userName={user.name}
                                    onChange={(role) =>
                                        onRoleChange(user.id, role)
                                    }
                                />
                            </TableCell>
                            <TableCell
                                className={`${jobStyles.tableCell} align-middle`}
                            >
                                <span className={adminStyles.joinedDate}>
                                    {formatJoinDate(user.createdAt)}
                                </span>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
