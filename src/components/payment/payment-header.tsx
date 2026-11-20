import Image from "next/image";
import Link from "next/link";
import { ArrowLeftIcon } from "lucide-react";

import logo from "@/assets/logo.png";
import { paymentStyles } from "@/lib/styles/payment";

export function PaymentHeader() {
    return (
        <header className={paymentStyles.header}>
            <div className={paymentStyles.headerLeft}>
                <Link href="/browser-jobs" aria-label="Go back" className={paymentStyles.backButton}>
                    <ArrowLeftIcon className="size-5" />
                </Link>

                <Link href="/" aria-label="HireLoop home">
                    <Image src={logo} alt="HireLoop" priority className={paymentStyles.logo} />
                </Link>
            </div>

            <span className={paymentStyles.sandboxBadge}>SANDBOX</span>
        </header>
    );
}
