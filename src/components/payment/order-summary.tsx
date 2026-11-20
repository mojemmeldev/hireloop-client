import { PAYMENT_PLAN } from "@/lib/constants/payment";
import { paymentStyles } from "@/lib/styles/payment";
import { cn } from "@/lib/utils";

export function OrderSummary() {
    return (
        <section aria-label="Order summary">
            <p className={paymentStyles.sectionLabel}>CHOOSE A CURRENCY:</p>

            <div className={paymentStyles.currencyOptions}>
                <button
                    type="button"
                    aria-pressed="true"
                    className={cn(
                        paymentStyles.currencyOption,
                        paymentStyles.currencyOptionActive,
                    )}
                >
                    <span className={paymentStyles.currencyFlag} aria-hidden="true">
                        BD
                    </span>
                    <span className={paymentStyles.currencyAmount}>{PAYMENT_PLAN.amount}</span>
                </button>

                <button
                    type="button"
                    aria-pressed="false"
                    className={cn(
                        paymentStyles.currencyOption,
                        paymentStyles.currencyOptionInactive,
                    )}
                >
                    <span className={paymentStyles.currencyFlag} aria-hidden="true">
                        US
                    </span>
                    <span className={paymentStyles.currencyAmount}>{PAYMENT_PLAN.usdAmount}</span>
                </button>
            </div>

            <p className={paymentStyles.exchangeRate}>{PAYMENT_PLAN.exchangeRate}</p>

            <div className={paymentStyles.summaryDivider}>
                <div className={paymentStyles.planRow}>
                    <div>
                        <h2 className={paymentStyles.planName}>{PAYMENT_PLAN.name}</h2>
                        <p className={paymentStyles.planDescription}>{PAYMENT_PLAN.description}</p>
                    </div>
                    <p className={paymentStyles.planPrice}>{PAYMENT_PLAN.amount}</p>
                </div>
            </div>
        </section>
    );
}
