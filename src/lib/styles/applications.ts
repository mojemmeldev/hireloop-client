// Figma-matched styles for the seeker's My Applications page.

export const applicationsStyles = {
    page: "min-h-screen w-full bg-[#0E0E11] px-6 py-5 text-[#EDEDEF] sm:px-8",
    content: "mx-auto w-full max-w-[1184px]",

    topBar: "flex h-14 items-center justify-between gap-4 border-b border-white/[0.06]",
    search: "flex h-9 w-full max-w-[320px] items-center gap-3 rounded-lg border border-white/[0.06] bg-[#0C0C0F] px-3",
    searchIcon: "size-[15px] shrink-0 text-[#C4C7C8]",
    searchInput:
        "min-w-0 flex-1 bg-transparent text-[13px] text-[#EDEDEF] outline-none placeholder:text-[#828997]",
    topActions: "flex shrink-0 items-center gap-3",
    topIconButton:
        "flex size-8 items-center justify-center rounded-lg text-[#C4C7C8] transition-colors hover:bg-[#1A1A1F] hover:text-white",
    avatar:
        "flex size-8 items-center justify-center rounded-full border border-white/[0.06] bg-[#222228] text-[11px] font-semibold text-[#EDEDEF]",

    header: "mt-6 flex flex-wrap items-start justify-between gap-4",
    title: "text-[22px] font-semibold leading-7 text-[#EDEDEF]",
    subtitle: "mt-2 text-[13px] text-[#A0A0AB]",
    headerActions: "flex items-center gap-3",
    tabGroup:
        "flex h-[42px] items-center gap-1 rounded-[10px] border border-white/[0.06] bg-[#1A1A1F] p-1",
    tab: "h-8 rounded-lg px-4 text-[13px] transition-colors",
    activeTab: "border border-white/[0.06] bg-[#1A1A1F] text-[#EDEDEF] shadow-[0_1px_2px_rgba(0,0,0,0.35)]",
    inactiveTab: "text-[#A0A0AB] hover:text-[#EDEDEF]",
    exportButton:
        "flex h-[42px] items-center gap-2 rounded-lg bg-[#FAFAFA] px-4 text-[13px] font-medium text-[#0B0B0C] shadow-[0_1px_2px_rgba(0,0,0,0.35)] transition-colors hover:bg-white",

    statsGrid: "mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4",
    statCard:
        "rounded-xl border border-white/[0.06] bg-[#141418] px-6 py-3 shadow-[0_1px_2px_rgba(0,0,0,0.35)]",
    statLabel: "text-[13px] text-[#A0A0AB]",
    statValue: "mt-1 text-[26px] font-semibold leading-8",

    tablePanel:
        "mt-6 overflow-hidden rounded-2xl border border-white/[0.06] bg-[#141418] shadow-[0_1px_2px_rgba(0,0,0,0.35)]",
    table: "w-full border-collapse text-left",
    tableHeader: "h-11 bg-[#1A1A1F]",
    tableHeaderCell:
        "px-4 text-[12px] font-medium text-[#6E6E78]",
    tableRow: "border-t border-white/[0.06]",
    tableCell: "h-16 px-4 align-middle text-[13px]",
    jobCell: "flex items-center gap-3",
    companyLogo:
        "flex size-8 shrink-0 items-center justify-center rounded text-[13px] font-semibold",
    jobTitle: "text-[13px] font-medium text-[#EDEDEF]",
    jobMeta: "mt-1 text-[12px] text-[#A0A0AB]",
    companyName: "text-[#EDEDEF]",
    appliedAt: "text-[#A0A0AB]",
    statusBadge:
        "inline-flex h-[22px] items-center rounded-md border px-3 text-[12px] font-medium",
    detailsButton:
        "rounded px-2 py-1 text-[13px] text-[#EDEDEF] transition-colors hover:bg-[#1A1A1F] hover:text-white",

    pagination:
        "flex flex-wrap items-center justify-between gap-4 border-t border-white/[0.06] bg-[#1A1A1F] px-6 py-4",
    paginationLabel: "text-[13px] text-[#A0A0AB]",
    paginationControls: "flex items-center gap-2",
    paginationButton:
        "flex size-8 items-center justify-center rounded-lg border border-white/[0.06] text-[#A0A0AB] transition-colors hover:bg-[#222228] hover:text-white",
    paginationPage:
        "flex size-8 items-center justify-center rounded-lg bg-white text-[13px] font-medium text-[#0B0B0C]",

    // Recruiter review flow — status control on the job applications page.
    // The wrapper carries the status colors (badge classes), the select inside
    // is transparent so it inherits them.
    statusSelectWrap: "relative inline-flex w-fit items-center rounded-lg border",
    statusSelect:
        "cursor-pointer appearance-none bg-transparent py-1 pr-8 pl-3 text-[13px] font-medium outline-none disabled:cursor-not-allowed",
    statusSelectIcon:
        "pointer-events-none absolute top-1/2 right-2.5 size-4 -translate-y-1/2 opacity-70",
} as const;
