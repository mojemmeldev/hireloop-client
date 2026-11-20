import { OrderSummary } from "@/components/payment/order-summary";
import { PaymentForm } from "@/components/payment/payment-form";
import { PaymentHeader } from "@/components/payment/payment-header";
import { paymentStyles } from "@/lib/styles/payment";

export function PaymentView() {
    return (
        <main className={paymentStyles.page}>
            <PaymentHeader />

            <div className={paymentStyles.main}>
                <OrderSummary />
                <PaymentForm />
            </div>

            <footer className={paymentStyles.footer}>
                <div className={paymentStyles.footerContent}>
                    <p className={paymentStyles.poweredBy}>Powered by Stripe</p>
                    <div className={paymentStyles.footerLinks}>
                        <button type="button" className={paymentStyles.footerLink}>
                            Terms
                        </button>
                        <button type="button" className={paymentStyles.footerLink}>
                            Privacy
                        </button>
                    </div>
                </div>
            </footer>
        </main>
    );
}
