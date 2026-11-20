import {
    ChevronDownIcon,
    CreditCardIcon,
    LockKeyholeIcon,
} from "lucide-react";

import { paymentStyles } from "@/lib/styles/payment";
import { cn } from "@/lib/utils";

const CARD_BRANDS = ["VISA", "MC", "AMEX", "DISC"] as const;

export function PaymentForm() {
    return (
        <section aria-label="Payment information">
            <button type="button" className={paymentStyles.expressButton}>
                <LockKeyholeIcon className="size-5" aria-hidden="true" />
                <span className={paymentStyles.expressLabel}>link</span>
                <span className="text-sm font-medium">Pay with Link</span>
            </button>

            <div className={paymentStyles.orDivider} aria-hidden="true">
                <span className={paymentStyles.orLine} />
                <span className={paymentStyles.orText}>OR</span>
                <span className={paymentStyles.orLine} />
            </div>

            <div className={paymentStyles.formSection}>
                <h2 className={paymentStyles.formHeading}>Contact information</h2>
                <label className={paymentStyles.fieldLabel} htmlFor="payment-email">
                    Email
                </label>
                <input
                    id="payment-email"
                    type="email"
                    readOnly
                    placeholder="email@example.com"
                    className={cn(paymentStyles.inputBase, paymentStyles.inputLabeled)}
                />
            </div>

            <div className={paymentStyles.formSection}>
                <h2 className={paymentStyles.formHeading}>Payment method</h2>

                <div className={paymentStyles.paymentCard}>
                    <div className={paymentStyles.paymentCardHeader}>
                        <CreditCardIcon className="size-5 text-[#A1A1AA]" aria-hidden="true" />
                        <span className={paymentStyles.paymentCardTitle}>Card</span>
                    </div>

                    <div className={paymentStyles.paymentCardBody}>
                        <p className={paymentStyles.cardGroupLabel}>CARD INFORMATION</p>

                        <div className={paymentStyles.cardRow}>
                            <input
                                type="text"
                                readOnly
                                aria-label="Card number"
                                placeholder="1234 1234 1234 1234"
                                className={cn(paymentStyles.inputBase, paymentStyles.cardNumberInput)}
                            />
                            <div className={paymentStyles.cardBrands} aria-hidden="true">
                                {CARD_BRANDS.map((brand) => (
                                    <span key={brand} className={paymentStyles.cardBrand}>
                                        {brand}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className={paymentStyles.expiryRow}>
                            <input
                                type="text"
                                readOnly
                                aria-label="Expiry date"
                                placeholder="MM / YY"
                                className={paymentStyles.inputBase}
                            />
                            <input
                                type="text"
                                readOnly
                                aria-label="Security code"
                                placeholder="CVC"
                                className={paymentStyles.inputBase}
                            />
                        </div>

                        <p className="mt-8 text-[11px] font-bold tracking-[0.08em] text-[#808089]">
                            CARDHOLDER NAME
                        </p>
                        <input
                            type="text"
                            readOnly
                            aria-label="Cardholder name"
                            placeholder="Full name on card"
                            className={cn(paymentStyles.inputBase, paymentStyles.inputLabeled)}
                        />

                        <p className="mt-8 text-[11px] font-bold tracking-[0.08em] text-[#808089]">
                            COUNTRY OR REGION
                        </p>
                        <button
                            type="button"
                            className="mt-5 flex h-[50px] w-full items-center justify-between rounded-lg border border-[#2E2E33] bg-[#1B1B1C] px-4 text-base text-white"
                        >
                            Bangladesh
                            <ChevronDownIcon className="size-5 text-[#71717A]" aria-hidden="true" />
                        </button>
                    </div>
                </div>

                <label className={paymentStyles.checkboxRow}>
                    <input type="checkbox" className={paymentStyles.checkbox} />
                    <span>
                        <span className={paymentStyles.saveTitle}>
                            Save my information for faster checkout
                        </span>
                        <span className={paymentStyles.saveDescription}>
                            Pay securely on this site and everywhere Link is accepted.
                        </span>
                    </span>
                </label>



                <form action="/api/checkout_sessions" method="POST">
                    <section>
                        

                        <button type="submit" role="link"
                            title="Stripe checkout will be connected here"
                            className={paymentStyles.payButton}
                        >
                            Pay
                        </button>
                    </section>
                </form>
            </div>
        </section>
    );
}
