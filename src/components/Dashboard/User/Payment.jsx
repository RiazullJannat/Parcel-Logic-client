import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import { useLocation, useParams } from "react-router-dom";

const stripePromise = loadStripe(`${import.meta.env.VITE_STRIPE_PK}`);

const Payment = () => {
    const {state: price} = useLocation();
    const {id} = useParams();
    console.log(price, id);
    return (
        <div>
            <Elements stripe={stripePromise}>
                <CheckoutForm price={price} id={id} />
            </Elements>
        </div>
    );
};

export default Payment;