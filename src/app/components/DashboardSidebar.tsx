"use client"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,

    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { useSession } from "@/lib/auth-client"
import {
    Bookmark,
    Briefcase,
    Building2,
    FileText,
    LayoutDashboard,
    Settings,
    Users,
    Wallet,
    type LucideIcon,
} from "lucide-react"

export type UserRole = "seeker" | "recruiter" | "admin"

type SidebarMenuItemData = {
    id: string
    name: string
    url: string
    Icon: LucideIcon
}

// Sidebar nav per role — matches the Figma "HL 2.0/Sidebar" (Role=Seeker/Recruiter/Admin)
const menuItemsByRole: Record<UserRole, SidebarMenuItemData[]> = {
    seeker: [
        { id: "dashboard", name: "Dashboard", url: "/dashboard", Icon: LayoutDashboard },
        { id: "jobs", name: "Jobs", url: "/dashboard/jobs", Icon: Briefcase },
        { id: "saved-jobs", name: "Saved Jobs", url: "/dashboard/saved-jobs", Icon: Bookmark },
        { id: "applications", name: "Applications", url: "/dashboard/applications", Icon: FileText },
        { id: "billing", name: "Billing", url: "/dashboard/billing", Icon: Wallet },
        { id: "settings", name: "Settings", url: "/dashboard/settings", Icon: Settings },
    ],
    recruiter: [
        { id: "dashboard", name: "Dashboard", url: "/dashboard", Icon: LayoutDashboard },
        { id: "my-company", name: "My Company", url: "/dashboard/company", Icon: Building2 },
        { id: "manage-jobs", name: "Manage Jobs", url: "/dashboard/manage-jobs", Icon: Briefcase },
        { id: "applications", name: "Applications", url: "/dashboard/applications", Icon: FileText },
        { id: "settings", name: "Settings", url: "/dashboard/settings", Icon: Settings },
    ],
    admin: [
        { id: "dashboard", name: "Dashboard", url: "/dashboard", Icon: LayoutDashboard },
        { id: "users", name: "Users", url: "/dashboard/users", Icon: Users },
        { id: "companies", name: "Companies", url: "/dashboard/companies", Icon: Building2 },
        { id: "jobs", name: "Jobs", url: "/dashboard/jobs", Icon: Briefcase },
        { id: "payments", name: "Payments", url: "/dashboard/payments", Icon: Wallet },
        { id: "settings", name: "Settings", url: "/dashboard/settings", Icon: Settings },
    ],
}

export function DashboardSidebar() {
    const {data:session,isPending}= useSession();
    const role = (session?.user?.role as UserRole) || "seeker";
    const items = menuItemsByRole[role];
    return (
        <Sidebar>
            <SidebarHeader />
            <SidebarContent>
                <SidebarGroup />
                <SidebarGroup />
                <SidebarGroup>
                    <SidebarMenu>
                        {items.map((item) => (
                            <SidebarMenuItem key={item.id}>
                                <SidebarMenuButton render={<a href={item.url} />}>
                                    <item.Icon />
                                    <span>{item.name}</span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter />
        </Sidebar>
    )
}