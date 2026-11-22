// Figma-matched styles for the admin Users management page.
// Table chrome (panel/rows/heads) is shared with the recruiter job screens
// via jobStyles so the dark table look stays consistent across dashboards.

export const adminStyles = {
    page: "flex min-h-[calc(100vh-68px)] flex-col gap-6 bg-[#010103] p-4 sm:p-6",

    breadcrumb: "flex items-center gap-1.5 text-xs text-white/50",
    breadcrumbLink: "hover:text-white/80",
    breadcrumbCurrent: "text-white/85",

    header: "flex flex-wrap items-start justify-between gap-4",
    eyebrow: "font-mono text-xs tracking-wider text-[#645BFF] uppercase",
    title: "mt-2 text-[22px] font-semibold leading-7 text-white",
    subtitle: "mt-1.5 text-[13px] text-white/50",

    // Toolbar: search + role filter …… export
    toolbar: "flex flex-wrap items-center gap-3",
    search:
        "relative flex h-10 w-full max-w-[300px] items-center gap-2 rounded-lg border border-white/5 bg-[#151519] px-3",
    searchIcon: "size-4 shrink-0 text-white/40",
    searchInput:
        "min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-white/40",
    filterTrigger:
        "h-10 min-w-[140px] rounded-lg border border-white/5! bg-[#151519]! px-3 text-sm text-white",
    filterContent: "border-white/10 bg-[#141418] text-white",
    exportButton:
        "ml-auto inline-flex h-10 items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 text-[13px] font-medium text-white transition-colors hover:bg-white/10",

    // Bento stats grid
    statsGrid: "grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4",
    statCard:
        "rounded-2xl border border-white/5 bg-[#0C0C10] p-5 shadow-[0_1px_2px_rgba(0,0,0,0.35)]",
    statLabel: "text-[13px] text-white/50",
    statValue: "mt-2 text-[26px] font-semibold leading-8 text-white",
    statHint: "mt-1 text-xs text-white/40",

    // Per-row role toggle (colors come from ROLE_BADGE_STYLES)
    roleSelectTrigger: "h-8 cursor-pointer gap-1.5 rounded-lg border px-2.5 text-xs font-medium",
    roleSelectContent: "border-white/10 bg-[#141418] text-white",
    roleSelectItem: "text-xs",

    // Table cells
    userCell: "flex items-center gap-3",
    avatar:
        "flex size-9 shrink-0 items-center justify-center rounded-full bg-[#1F1F1F] text-sm font-semibold text-[#C3C0FF]",
    userName: "font-medium text-white",
    userEmail: "mt-0.5 text-xs text-white/45",
    joinedDate: "text-sm whitespace-nowrap text-white/80",

    footerCount: "text-sm text-white/40",
} as const;
