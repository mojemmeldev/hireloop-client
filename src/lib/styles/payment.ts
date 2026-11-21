// Figma-matched styles for the public checkout/payment screen.

export const paymentStyles = {
    page: "min-h-screen bg-[#08080A] text-white",

    header: "mx-auto flex h-24 w-full max-w-[1312px] items-center justify-between px-6 sm:px-10",
    headerLeft: "flex items-center gap-6",
    backButton:
        "flex size-6 items-center justify-center rounded text-[#A1A1AA] transition-colors hover:text-white",
    logo: "h-8 w-auto",
    sandboxBadge:
        "rounded bg-[#1E2329] px-2 py-1 text-[11px] font-bold tracking-wide text-white",

    main: "mx-auto grid w-full max-w-[1312px] grid-cols-1 gap-10 px-6 pb-20 pt-2 sm:px-10 lg:grid-cols-[520px_minmax(0,520px)] lg:justify-center lg:gap-[68px]",

    sectionLabel: "text-xs font-bold tracking-[0.08em] text-[#A1A1AA]",
    currencyOptions: "mt-7 grid grid-cols-2 gap-4",
    currencyOption:
        "flex h-[60px] items-center gap-3 rounded-lg border px-4 text-left transition-colors",
    currencyOptionActive: "border-white bg-[#27272A] text-white",
    currencyOptionInactive: "border-[#2E2E33] text-[#A1A1AA] hover:border-white/40",
    currencyFlag: "flex size-6 shrink-0 items-center justify-center rounded-sm bg-white/10 text-[9px] font-bold text-white",
    currencyAmount: "text-base font-semibold",
    exchangeRate: "mt-4 text-xs italic text-[#808089]",

    summaryDivider: "mt-8 border-t border-[#2E2E33] pt-8",
    planRow: "flex items-start justify-between gap-6",
    planName: "text-lg font-semibold text-white",
    planDescription: "mt-2 text-sm text-[#A1A1AA]",
    planPrice: "text-right text-lg font-semibold text-white",

    expressButton:
        "flex h-12 w-full items-center justify-center gap-3 rounded-lg bg-[#00D66F] text-[#18181B] transition-opacity hover:opacity-90",
    expressLabel: "text-lg font-bold",
    expressDivider: "my-4",
    orDivider: "flex items-center gap-5",
    orLine: "h-px flex-1 bg-[#2E2E33]",
    orText: "text-xs font-bold text-[#808089]",

    formSection: "mt-8",
    formHeading: "text-sm font-semibold text-white",
    fieldLabel: "mt-4 block text-xs text-[#A1A1AA]",
    inputBase:
        "h-[49px] w-full rounded-lg border border-[#2E2E33] bg-[#1B1B1C] px-4 text-base text-white outline-none placeholder:text-[#888891] focus:border-white/40",
    inputLabeled: "mt-[21px]",

    paymentCard: "mt-8 overflow-hidden rounded-lg border border-[#2E2E33]",
    paymentCardHeader:
        "flex h-[53px] items-center gap-3 border-b border-[#2E2E33] bg-[#27272A] px-4",
    paymentCardTitle: "text-sm font-medium text-white",
    paymentCardBody: "px-4 py-4",
    cardGroupLabel: "text-[11px] font-bold tracking-[0.08em] text-[#808089]",
    cardRow: "relative mt-[19px]",
    cardNumberInput: "pr-24",
    cardBrands: "absolute right-3 top-[17px] flex items-center gap-1",
    cardBrand:
        "flex h-4 items-center justify-center rounded-[2px] bg-[#27272A] px-1 text-[8px] font-bold text-white",
    expiryRow: "mt-[18px] grid grid-cols-2 gap-0",

    checkboxRow:
        "mt-8 flex items-start gap-3 rounded-lg border border-[#2E2E33] p-4",
    checkbox:
        "mt-1 size-5 shrink-0 rounded border border-[#2E2E33] bg-[#1B1B1C]",
    saveTitle: "text-sm font-semibold text-white",
    saveDescription: "mt-1 text-xs text-[#808089]",

    payButton:
        "mt-4 h-[60px] w-full rounded-lg bg-[#0070E0] text-lg font-bold text-white transition-colors hover:bg-[#1261c4]",

    footer: "border-t border-[#2E2E33]",
    footerContent:
        "mx-auto flex w-full max-w-[1312px] flex-col items-center gap-4 px-6 py-10 sm:px-10",
    poweredBy: "text-xs font-medium text-[#808089]",
    footerLinks: "flex items-center gap-6 text-[11px] font-medium text-[#808089]",
    footerLink: "transition-colors hover:text-white",

    // Checkout success / status screens
    successMain: "mx-auto flex w-full max-w-[560px] flex-col px-6 pb-24 pt-4 sm:px-10",
    successCard:
        "w-full rounded-xl border border-[#2E2E33] bg-[#101013] p-6 sm:p-8",
    successIconWrap:
        "flex size-14 items-center justify-center rounded-full bg-[#00D66F]/10 ring-1 ring-[#00D66F]/40",
    successIcon: "size-7 text-[#00D66F]",
    successTitle: "mt-5 text-center text-2xl font-semibold text-white",
    successSubtitle:
        "mt-2 text-center text-sm leading-relaxed text-[#A1A1AA]",
    paidBadge:
        "mt-4 inline-flex items-center gap-1.5 rounded-full bg-[#00D66F]/10 px-3 py-1 text-xs font-bold tracking-wide text-[#00D66F]",

    transactionBox: "mt-6 rounded-lg border border-[#2E2E33] bg-[#1B1B1C] p-4",
    transactionHeader: "flex items-center justify-between gap-3",
    transactionLabel: "text-xs font-bold tracking-[0.08em] text-[#808089]",
    transactionId: "mt-2 font-mono text-sm break-all text-white",

    receiptList: "mt-6 divide-y divide-[#2E2E33] border-t border-[#2E2E33]",
    receiptRow: "flex items-start justify-between gap-4 py-3.5",
    receiptLabel:
        "shrink-0 text-xs font-bold tracking-[0.08em] text-[#808089]",
    receiptValue: "text-right text-sm text-white",
    receiptValueMono:
        "font-mono text-xs break-all text-right text-[#A1A1AA]",

    successActions: "mt-6 flex flex-col gap-3 sm:flex-row",
    successPrimary:
        "flex h-11 flex-1 items-center justify-center rounded-lg bg-[#0070E0] text-sm font-bold text-white transition-colors hover:bg-[#1261c4]",
    successSecondary:
        "flex h-11 flex-1 items-center justify-center rounded-lg border border-[#2E2E33] text-sm font-bold text-white transition-colors hover:border-white/40",
    successNote: "mt-5 text-center text-xs text-[#808089]",

    statusWrap:
        "mx-auto flex w-full max-w-[560px] flex-col items-center px-6 pb-24 pt-10 sm:px-10",
    statusCard: "w-full rounded-xl border border-[#2E2E33] bg-[#101013] p-8 text-center",
    statusIcon:
        "flex size-14 items-center justify-center rounded-full bg-[#0070E0]/10 ring-1 ring-[#0070E0]/40",
    statusTitle: "mt-5 text-xl font-semibold text-white",
    statusMessage: "mt-2 text-sm leading-relaxed text-[#A1A1AA]",
    statusAction:
        "mt-6 inline-flex h-11 items-center justify-center rounded-lg bg-[#0070E0] px-6 text-sm font-bold text-white transition-colors hover:bg-[#1261c4]",
} as const;
