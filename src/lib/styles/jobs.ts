// Shared class strings for the recruiter jobs screens. Reused by the table,
// new-job form, and update dialog so styling stays in one place.

export const jobStyles = {
    page: "flex min-h-[calc(100vh-68px)] flex-col gap-6 bg-[#010103] p-4 sm:p-6",
    eyebrow: "font-mono text-xs tracking-wider text-[#645BFF] uppercase",
    divider: "h-px bg-white/10",

    panel: "overflow-x-auto rounded-2xl border border-white/5 bg-[#0C0C10]",
    tableHeadRow: "border-white/5 hover:bg-transparent",
    tableHead: "px-4 py-3 font-mono text-xs tracking-wider text-white/40 uppercase",
    tableRow: "border-white/5 hover:bg-white/[0.03]",
    tableCell: "px-4 py-4 align-top",
    emptyCell: "px-4 py-10 text-center text-sm text-white/40",

    section: "rounded-2xl border border-white/5 bg-[#0C0C10] p-5 sm:p-6",
    label: "text-sm font-medium text-white/90",
    compactLabel: "text-xs font-medium text-white/80",
    hint: "text-[11px] text-white/35",
    required: "text-[#645BFF]",

    input: "h-12 w-full rounded-lg border border-white/5 bg-[#151519] px-4 text-sm text-white placeholder:text-white/45 focus-visible:border-[#5C53FE] focus-visible:ring-[#5C53FE]/40",
    compactInput:
        "h-10 w-full rounded-lg border border-white/10 bg-[#151519] px-3 text-sm text-white placeholder:text-white/40 focus-visible:border-[#5C53FE] focus-visible:ring-[#5C53FE]/40",
    selectTrigger:
        "h-12 w-full rounded-lg border border-white/5 bg-[#151519] text-sm text-white",
    compactSelectTrigger:
        "h-10 w-full rounded-lg border border-white/10 bg-[#151519] px-3 text-sm text-white focus-visible:border-[#5C53FE] focus-visible:ring-[#5C53FE]/40",
    selectContent: "border-white/10 bg-[#141418] text-white",

    jobTypeGrid: "grid grid-cols-2 gap-3 sm:grid-cols-4",
    jobTypeOption: "h-12 rounded-lg border text-sm transition-colors",
    jobTypeOptionActive:
        "border-[#5C53FE] bg-[#5C53FE]/10 font-medium text-white",
    jobTypeOptionIdle:
        "border-white/10 bg-[#151519] text-white/60 hover:text-white",

    remotePanel:
        "flex items-center justify-between gap-4 rounded-xl border border-white/5 bg-[#151519] p-4",
    remoteIcon:
        "flex size-9 shrink-0 items-center justify-center rounded-full bg-[#5C53FE]/15 text-[#645BFF]",

    textarea: "min-h-32 resize-y px-4 py-3 leading-relaxed",
    compactTextarea: "h-auto py-2",

    primary: "bg-[#5C53FE] text-white hover:bg-[#4B43F0]",
    primaryLarge: "h-11 shrink-0 px-5 text-sm font-medium",
    primaryCompact:
        "h-8 w-[81px] gap-1.5 rounded-lg px-2.5 text-xs text-[#C3C0FF]",
    secondaryButton: "border-white/10 bg-white/5 text-white hover:bg-white/10",
    tableActions: "flex items-center gap-1.5",
    tableIconButton:
        "size-8 rounded-lg bg-[#1F1F1F] text-[#A0A0AB] hover:bg-[#2A2A2A]",
    tableLinkButton:
        "inline-flex h-8 items-center gap-1.5 rounded-lg bg-[#1F1F1F] px-3 text-xs font-medium whitespace-nowrap text-[#C3C0FF] transition-colors hover:bg-[#2A2A2A] hover:text-white",

    typeBadge:
        "inline-block rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-white/70",
    statusBadge:
        "inline-block rounded-full border px-2.5 py-1 text-xs font-medium",
    statusActive:
        "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
    statusExpired: "border-red-500/30 bg-red-500/10 text-red-400",
} as const;
