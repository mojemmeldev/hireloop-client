"use client";

import { useState } from "react";
import { CheckIcon, CopyIcon } from "lucide-react";

/**
 * Copies `value` to the clipboard and flips to a "Copied" state briefly.
 * Used on the checkout success screen for the transaction ID.
 */
export function CopyButton({ value, label = "Copy" }: { value: string; label?: string }) {
    const [copied, setCopied] = useState(false);

    async function handleCopy() {
        try {
            await navigator.clipboard.writeText(value);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            // Clipboard unavailable (permissions / insecure context) — ignore
        }
    }

    return (
        <button
            type="button"
            onClick={handleCopy}
            aria-label={copied ? "Copied" : `Copy ${label}`}
            className="inline-flex shrink-0 items-center gap-1.5 rounded-md border border-[#2E2E33] bg-[#27272A] px-2.5 py-1.5 text-[11px] font-bold tracking-wide text-[#A1A1AA] transition-colors hover:border-white/40 hover:text-white"
        >
            {copied ? (
                <CheckIcon className="size-3.5 text-[#00D66F]" />
            ) : (
                <CopyIcon className="size-3.5" />
            )}
            {copied ? "Copied" : label}
        </button>
    );
}
