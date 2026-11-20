// Figma-matched styles for the public job-details screen.

export const jobDetailsStyles = {
    page: "mx-auto flex w-full max-w-[1480px] flex-col gap-6 bg-[#08080A] px-5 py-8 sm:px-10",

    header: "relative overflow-hidden rounded-2xl border border-white/[0.07] bg-[#141418] p-7 shadow-[0_1px_2px_rgba(0,0,0,0.35)] sm:p-8",
    headerGlow:
        "pointer-events-none absolute -right-16 -top-24 size-64 rounded-full bg-white/10 blur-3xl",
    headerMain: "relative flex flex-wrap items-center justify-between gap-6",
    identity: "flex min-w-0 items-center gap-5",
    companyLogo:
        "flex size-20 shrink-0 items-center justify-center rounded-xl border border-white/[0.07] bg-[#1A1A1F] text-2xl font-semibold text-[#EDEDEF]",
    jobTitle: "text-[32px] font-semibold leading-tight text-[#EDEDEF]",
    jobMeta: "mt-2 flex flex-wrap items-center gap-3 text-[22px] font-semibold text-[#A0A0AB]",
    dot: "size-1 rounded-full bg-[#8E9192]",
    verified: "inline-flex items-center gap-2 text-base font-semibold text-[#22C55E]",
    headerActions: "flex shrink-0 items-center gap-3",
    iconButton:
        "flex size-12 items-center justify-center rounded-lg border border-white/[0.07] bg-[#222228] text-[#E5E2E3] transition-colors hover:bg-[#2A2A2F]",
    applyButton:
        "h-12 rounded-lg bg-[#FAFAFA] px-5 text-base font-medium text-[#0B0B0C] shadow-[0_1px_2px_rgba(0,0,0,0.35)] transition-colors hover:bg-white",

    contentGrid: "grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_397px]",
    infoGrid: "grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4",
    infoCard:
        "rounded-xl border border-white/[0.07] bg-[#141418] p-6 shadow-[0_1px_2px_rgba(0,0,0,0.35)]",
    infoIcon: "size-5 text-[#C4C7C8]",
    infoLabel: "mt-4 text-[13px] font-medium text-[#A0A0AB]",
    infoValue: "mt-1 text-base font-semibold text-[#EDEDEF]",

    panel: "mt-5 rounded-2xl border border-white/[0.07] bg-[#141418] shadow-[0_1px_2px_rgba(0,0,0,0.35)]",
    sections: "flex flex-col px-6 sm:px-8",
    section: "border-b border-white/[0.07] py-8 last:border-b-0",
    sectionTitle: "text-[22px] font-semibold text-[#EDEDEF]",
    sectionBody: "mt-5 text-[13px] leading-relaxed text-[#A0A0AB]",
    bulletList: "mt-5 flex flex-col gap-4",
    bulletItem: "flex gap-4 text-[13px] leading-relaxed text-[#A0A0AB]",
    bulletDot: "mt-2 size-1.5 shrink-0 rounded-full bg-white",
    tagRow: "mt-5 flex flex-wrap gap-2",
    tag: "inline-flex h-9 items-center rounded-lg border border-white/[0.07] bg-[#1A1A1F] px-3 text-[13px] font-medium text-[#EDEDEF]",
    benefitsGrid: "mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2",
    benefit: "flex items-center gap-4 rounded-lg p-3 text-base font-semibold text-[#EDEDEF]",
    benefitIcon:
        "flex size-10 shrink-0 items-center justify-center rounded-full bg-white text-[#0B0B0C]",

    sidebar:
        "h-fit rounded-2xl border border-white/[0.07] bg-[#141418] p-6 shadow-[0_1px_2px_rgba(0,0,0,0.35)]",
    sidebarTitle: "text-[22px] font-semibold text-[#EDEDEF]",
    cover: "mt-6 h-48 rounded-xl bg-gradient-to-br from-[#1A1A1F] via-[#242430] to-[#5C53FE]/40",
    sidebarRows: "mt-6 flex flex-col",
    sidebarRow:
        "flex items-center justify-between gap-4 border-b border-white/[0.07] py-4 last:border-b-0",
    sidebarLabel: "text-[13px] text-[#A0A0AB]",
    sidebarValue: "text-right text-base text-[#EDEDEF]",
    visitButton:
        "mt-5 h-11 w-full rounded-[10px] bg-white text-[13px] font-medium text-[#0B0B0C] transition-colors hover:bg-[#EDEDEF]",

    empty: "rounded-2xl border border-white/[0.07] bg-[#141418] p-10 text-center text-sm text-[#A0A0AB]",
} as const;
