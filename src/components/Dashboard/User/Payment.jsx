import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import { useLocation, useParams } from "react-router-dom";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import SSLPayment from "./SSLPayment";

const stripePromise = loadStripe(`${import.meta.env.VITE_STRIPE_PK}`);

const Payment = () => {
    const { state: price } = useLocation();
    const { id } = useParams();
    const [paymentMethod, setPaymentMethod] = useState('stripe');
    console.log(paymentMethod);
    return (
        <div>
            <div>
                <Select onValueChange={(value) => setPaymentMethod(value)}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder={paymentMethod} />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="stripe">Stripe</SelectItem>
                        <SelectItem value="ssl">SSL</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className={`${paymentMethod==='stripe'?'block':'hidden'}`}>
                <Elements stripe={stripePromise}>
                    <CheckoutForm price={price} id={id} />
                </Elements>
            </div>
            <div className={`${paymentMethod==='ssl'?'block':'hidden'}`}>
                    <SSLPayment price={price} id={id}></SSLPayment>
            </div>
        </div>
    );
};

export default Payment;