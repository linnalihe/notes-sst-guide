import { useState } from "react";
import config from "../config";
import { API } from "aws-amplify";
import { showError } from "../lib/errorLib";
import { useNavigate } from "react-router-dom"
import type { BillingType } from "../types/billing";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
const stripePromise = loadStripe(config.STRIPE_KEY)
import { BillingForm } from "../components/BillingForm";
import type { BillingFormType } from "../components/BillingForm"
import "./Settings.css"


export default function Settings() {
    const nav = useNavigate();
    const [ isLoading, setIsLoading ] = useState(false)

    function billUser(details: BillingType) {
        return API.post("notes-sst-guide", "/billing", {
            body: details
        })
    }

    const handleFormSubmit: BillingFormType["onSubmit"] = async(
        storage,
        info
    ) => {
        if (info.error) {
            showError(info.error);
            return;
        }

        setIsLoading(true);

        try {
            await billUser({
                storage,
                source: info.token?.id,
            });

            alert("Your card has been charged successfully!");
            nav("/");
        }catch (e) {
            showError(e);
            setIsLoading(false);
        }
    };

    return (
        <div className="Settings">
            <Elements
            stripe={stripePromise}
            options={{
                fonts: [
                    {
                        cssSrc:
                        "https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700,800"
                    }
                ]
            }} >
                <BillingForm isLoading={isLoading} onSubmit={handleFormSubmit} />
            </Elements>
        </div>
    )
}