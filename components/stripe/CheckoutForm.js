import React from "react";
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

export const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            console.log("Stripe.js has not loaded yet.");
            return;
        }

        try {
            const { error, paymentMethod } = await stripe.createPaymentMethod({
                type: "card",
                card: elements.getElement(CardElement),
            });

            if (error) {
                console.error("Error creating payment method:", error);
            } else {
                console.log("Token Generated:", paymentMethod);
            }
        } catch (error) {
            console.error("An error occurred:", error);
        }
    }

    return (
        <form onSubmit={handleSubmit} style={{ maxWidth: 400 }}>
            <CardElement
                
            />
            <button type="submit">Payer</button>
        </form>
    );
}
