// Figma-matched styles for the public browse-jobs screen.
// Kept separate from jobStyles so the public page can evolve independently.

export const browseJobsStyles = {
    page: "mx-auto flex w-full max-w-[1600px] flex-col gap-8 bg-[#08080A] px-5 py-8 sm:px-10",

    searchPanel:
        "rounded-2xl border border-white/[0.07] bg-[#141418] p-6 shadow-[0_1px_2px_rgba(0,0,0,0.35)]",
    searchRow: "flex flex-col gap-3 sm:flex-row",
    searchInputWrap:
        "relative flex h-[59px] min-w-0 flex-1 items-center rounded-lg border border-white/[0.07] bg-[#1A1A1F]",
    searchIcon:
        "pointer-events-none absolute left-5 size-[18px] text-[#8E9192]",
    searchInput:
        "h-full w-full bg-transparent pl-[52px] pr-4 text-[13px] text-[#EDEDEF] outline-none placeholder:text-[#A0A0AB]",
    searchButton:
        "h-[59px] w-full shrink-0 rounded-lg bg-white px-6 text-base font-semibold text-[#2F3131] transition-colors hover:bg-[#EDEDEF] sm:w-36",

    contentGrid: "grid grid-cols-1 gap-8 lg:grid-cols-[296px_minmax(0,1fr)]",
    sidebar:
        "h-fit rounded-2xl border border-white/[0.07] bg-[#141418] p-6 shadow-[0_1px_2px_rgba(0,0,0,0.35)]",
    sidebarTitle: "text-[22px] font-semibold text-[#EDEDEF]",
    filterGroup: "mt-7",
    filterGroupTitle: "mb-4 text-base font-semibold text-[#EDEDEF]",
    filterList: "flex flex-col gap-3",
    filterRow:
        "flex cursor-pointer items-center justify-between gap-3 text-[13px] font-medium text-[#A0A0AB]",
    filterLabel: "flex min-w-0 items-center gap-3",
    checkbox:
        "flex size-5 shrink-0 items-center justify-center rounded border border-white/[0.07] bg-[#1A1A1F] text-transparent",
    checkboxChecked:
        "peer-checked:border-white peer-checked:bg-white peer-checked:text-white",
    filterCount: "shrink-0 text-xs text-[#6E6E78]",

    resultsHeader: "flex flex-wrap items-center justify-between gap-4",
    resultsTitle: "text-[22px] font-semibold text-[#EDEDEF]",
    sortWrap: "flex items-center gap-2",
    sortLabel: "text-[13px] font-medium text-[#6E6E78]",
    sortSelectWrap: "relative",
    sortSelect:
        "h-9 appearance-none rounded-lg border border-white/10 bg-[#0C0C0F] pl-3 pr-9 text-[13px] font-medium text-[#EDEDEF] outline-none",
    sortChevron:
        "pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-[#A1A4AA]",

    jobGrid: "mt-6 flex flex-col gap-3",
    jobCard:
        "rounded-xl border border-white/[0.07] bg-[#141418] p-6 shadow-[0_1px_2px_rgba(0,0,0,0.35)]",
    jobCardTop: "flex items-start justify-between gap-4",
    companyLogo:
        "flex size-16 shrink-0 items-center justify-center rounded-lg border border-white/[0.07] bg-[#222228] text-lg font-semibold text-[#EDEDEF]",
    jobCardMain: "min-w-0 flex-1",
    jobTitle: "text-[22px] font-semibold text-[#EDEDEF]",
    jobMeta: "mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-base font-semibold text-[#6E6E78]",
    bookmarkButton:
        "flex size-10 shrink-0 items-center justify-center rounded-lg text-[#8E9192] transition-colors hover:bg-white/5 hover:text-[#EDEDEF]",
    badges: "mt-6 flex flex-wrap items-center gap-2",
    badge: "inline-flex h-[30px] items-center gap-2 rounded-md border border-white/[0.07] bg-[#1A1A1F] px-3 text-[13px] font-medium text-[#EDEDEF]",
    badgeActive:
        "border-[#22C55E]/50 bg-[#22C55E]/10 text-[#22C55E]",
    badgeExpired: "border-red-500/30 bg-red-500/10 text-red-400",
    empty: "mt-6 rounded-xl border border-white/[0.07] bg-[#141418] p-10 text-center text-sm text-[#A0A0AB]",
} as const;
