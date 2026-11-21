import Link from "next/link";
import { redirect } from "next/navigation";
import {
    CircleCheckIcon,
    ClockIcon,
    MailIcon,
    TriangleExclamationPointIcon,
} from "lucide-react";

import { CopyButton } from "@/components/payment/copy-button";
import { PaymentHeader } from "@/components/payment/payment-header";
import { PAYMENT_PLAN } from "@/lib/constants/payment";
import { paymentVerify } from "@/lib/actions/payments";
import { paymentStyles } from "@/lib/styles/payment";
import { stripe } from "@/lib/stripe";

type SearchParams = Promise<{ session_id?: string }>;

// Stripe amounts are in the smallest currency unit (e.g. cents / poisha)
function formatAmount(amount: number | null, currency: string | null) {
    if (amount == null) return PAYMENT_PLAN.amount;
    if (!currency) return (amount / 100).toFixed(2);
    try {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: currency.toUpperCase(),
        }).format(amount / 100);
    } catch {
        return `${(amount / 100).toFixed(2)} ${currency.toUpperCase()}`;
    }
}

function formatDate(unixSeconds: number) {
    return new Date(unixSeconds * 1000).toLocaleString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
}

/** Simple centered status card for the non-success outcomes */
function StatusScreen({
    icon,
    title,
    message,
    actionHref,
    actionLabel,
}: {
    icon: React.ReactNode;
    title: string;
    message: string;
    actionHref: string;
    actionLabel: string;
}) {
    return (
        <main className={paymentStyles.page}>
            <PaymentHeader />
            <div className={paymentStyles.statusWrap}>
                <div className={paymentStyles.statusCard}>
                    <div className={paymentStyles.statusIcon} aria-hidden>
                        {icon}
                    </div>
                    <h1 className={paymentStyles.statusTitle}>{title}</h1>
                    <p className={paymentStyles.statusMessage}>{message}</p>
                    <Link href={actionHref} className={paymentStyles.statusAction}>
                        {actionLabel}
                    </Link>
                </div>
            </div>
        </main>
    );
}

export default async function PaymentSuccessPage({
    searchParams,
}: {
    searchParams: SearchParams;
}) {
    const { session_id } = await searchParams;

    if (!session_id) {
        return (
            <StatusScreen
                icon={
                    <TriangleExclamationPointIcon
                        className="size-7 text-[#F5A524]"
                        aria-hidden
                    />
                }
                title="Missing payment session"
                message="This payment link is incomplete. Please start the checkout again from the pricing page."
                actionHref="/payment"
                actionLabel="Back to Checkout"
            />
        );
    }

    let session;
    try {
        session = await stripe.checkout.sessions.retrieve(session_id, {
            expand: ["line_items", "payment_intent"],
        });
    } catch {
        return (
            <StatusScreen
                icon={
                    <TriangleExclamationPointIcon
                        className="size-7 text-[#F5A524]"
                        aria-hidden
                    />
                }
                title="Payment session not found"
                message="We couldn't find this checkout session. It may have expired — please try again."
                actionHref="/payment"
                actionLabel="Back to Checkout"
            />
        );
    }

    const {
        status,
        payment_status,
        customer_details,
        metadata,
        payment_intent,
        line_items,
        amount_total,
        currency,
        created,
        id: checkoutSessionId,
    } = session;

    if (status === "open") {
        redirect("/");
    }

    if (status !== "complete" || payment_status !== "paid") {
        return (
            <StatusScreen
                icon={
                    <ClockIcon
                        className="size-7 text-[#0070E0]"
                        aria-hidden
                    />
                }
                title="Payment not completed"
                message="Your payment hasn't been finalized yet. If you were charged, please contact support with your session ID."
                actionHref="/payment"
                actionLabel="Back to Checkout"
            />
        );
    }

    // Confirm the payment with our backend — a down API shouldn't break the page
    try {
        const result = await paymentVerify(session_id);
        console.log("payment verified:", result);
    } catch (error) {
        console.error("payment verify failed:", error);
    }

    // With expand, payment_intent is the full PaymentIntent object —
    // its `id` (pi_...) is the transaction ID shown to the customer.
    const transactionId =
        typeof payment_intent === "object" && payment_intent !== null
            ? payment_intent.id
            : payment_intent ?? null;

    const lineItem = line_items?.data?.[0] ?? null;
    const planName = lineItem?.description ?? PAYMENT_PLAN.name;
    const email = customer_details?.email ?? metadata?.userId ?? null;
    const name = customer_details?.name ?? null;

    return (
        <main className={paymentStyles.page}>
            <PaymentHeader />

            <div className={paymentStyles.successMain}>
                <section id="success" className={paymentStyles.successCard}>
                    {/* Header */}
                    <div
                        className={paymentStyles.successIconWrap}
                        aria-hidden
                    >
                        <CircleCheckIcon
                            className={paymentStyles.successIcon}
                        />
                    </div>
                    <h1 className={paymentStyles.successTitle}>
                        Payment successful
                    </h1>
                    <p className={paymentStyles.successSubtitle}>
                        Thanks{name ? `, ${name}` : ""}! Your payment was
                        processed successfully.
                        {email ? (
                            <>
                                {" "}
                                A confirmation email will be sent to{" "}
                                <span className="text-white">{email}</span>.
                            </>
                        ) : (
                            " A confirmation email will be sent to you."
                        )}
                    </p>
                    <span className={paymentStyles.paidBadge}>
                        <CircleCheckIcon className="size-3.5" aria-hidden />
                        PAID
                    </span>

                    {/* Transaction ID — payment_intent.id */}
                    <div className={paymentStyles.transactionBox}>
                        <div className={paymentStyles.transactionHeader}>
                            <span className={paymentStyles.transactionLabel}>
                                TRANSACTION ID
                            </span>
                            {transactionId && (
                                <CopyButton
                                    value={transactionId}
                                    label="Copy"
                                />
                            )}
                        </div>
                        <p className={paymentStyles.transactionId}>
                            {transactionId ?? "—"}
                        </p>
                    </div>

                    {/* Receipt details */}
                    <dl className={paymentStyles.receiptList}>
                        <div className={paymentStyles.receiptRow}>
                            <dt className={paymentStyles.receiptLabel}>
                                AMOUNT PAID
                            </dt>
                            <dd className={paymentStyles.receiptValue}>
                                {formatAmount(amount_total, currency)}
                            </dd>
                        </div>
                        <div className={paymentStyles.receiptRow}>
                            <dt className={paymentStyles.receiptLabel}>
                                DATE
                            </dt>
                            <dd className={paymentStyles.receiptValue}>
                                {formatDate(created)}
                            </dd>
                        </div>
                        <div className={paymentStyles.receiptRow}>
                            <dt className={paymentStyles.receiptLabel}>
                                PLAN
                            </dt>
                            <dd className={paymentStyles.receiptValue}>
                                {planName}
                            </dd>
                        </div>
                        <div className={paymentStyles.receiptRow}>
                            <dt className={paymentStyles.receiptLabel}>
                                CUSTOMER
                            </dt>
                            <dd className={paymentStyles.receiptValue}>
                                {email ?? "—"}
                            </dd>
                        </div>
                        <div className={paymentStyles.receiptRow}>
                            <dt className={paymentStyles.receiptLabel}>
                                SESSION ID
                            </dt>
                            <dd className={paymentStyles.receiptValueMono}>
                                {checkoutSessionId}
                            </dd>
                        </div>
                    </dl>

                    {/* Actions */}
                    <div className={paymentStyles.successActions}>
                        <Link
                            href="/"
                            className={paymentStyles.successPrimary}
                        >
                            Back to Home
                        </Link>
                        <Link
                            href="/browser-jobs"
                            className={paymentStyles.successSecondary}
                        >
                            Browse Jobs
                        </Link>
                    </div>

                    <p className={paymentStyles.successNote}>
                        <MailIcon
                            className="mr-1 inline size-3.5 align-[-2px]"
                            aria-hidden
                        />
                        Keep the transaction ID above for your records —
                        you&apos;ll need it for any billing questions.
                    </p>
                </section>
            </div>

            <footer className={paymentStyles.footer}>
                <div className={paymentStyles.footerContent}>
                    <p className={paymentStyles.poweredBy}>
                        Powered by Stripe
                    </p>
                    <div className={paymentStyles.footerLinks}>
                        <button
                            type="button"
                            className={paymentStyles.footerLink}
                        >
                            Terms
                        </button>
                        <button
                            type="button"
                            className={paymentStyles.footerLink}
                        >
                            Privacy
                        </button>
                    </div>
                </div>
            </footer>
        </main>
    );
}
