import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { CheckoutForm } from "./CheckoutForm";

const PUBLIC_KEY ="pk_test_51OuenEGF5wjVpoBy1oTPKR1A22yd0oVR2tM5O5tDWPINXRqVvnmOFKzGefAz4fa2bYk2kc8MKiaPzARQOwou2hpH00yIAzXjys";
const stripeTestPromise = loadStripe(PUBLIC_KEY)

const StripeContainer= () =>{
    return(
        <Elements stripe={stripeTestPromise} >
            <CheckoutForm />
        </Elements>
    );
};
export default StripeContainer;