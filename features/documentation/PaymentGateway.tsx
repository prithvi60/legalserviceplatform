"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DummyPaymentGateway from "@/components/Layout/DummyPaymentGateway";

const PaymentPage: React.FC = () => {
    const router = useRouter();
    const [searchParams, setSearchParams] = useState<URLSearchParams | null>(
        null
    );
    const [amount, setAmount] = useState("5.99");
    const [redirectUrl, setRedirectUrl] = useState("/");

    // Only run this effect on the client side to access URL params
    useEffect(() => {
        if (typeof window !== "undefined") {
            const urlParams = new URLSearchParams(window.location.search);
            setSearchParams(urlParams);
            setAmount(urlParams.get("amount") || "5.99");
            setRedirectUrl(urlParams.get("redirect") || "/");
        }
    }, []);

    const handlePaymentSuccess = () => {
        // Add a success parameter to the redirect URL
        const url = new URL(redirectUrl, window.location.origin);
        url.searchParams.set("paymentStatus", "success");
        router.push(url.pathname + url.search);
    };

    const handlePaymentCancel = () => {
        router.back();
    };

    if (!searchParams) {
        return (
            <div className="w-full h-full flex justify-center items-center text-5xl font-bold">
                Loading...
            </div>
        );
    }

    return (
        <DummyPaymentGateway
            amount={parseFloat(amount)}
            onSuccess={handlePaymentSuccess}
            onCancel={handlePaymentCancel}
        />
    );
};

export default PaymentPage;
