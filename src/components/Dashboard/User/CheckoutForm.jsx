import useAuth from "@/Hooks/useAuth";
import useAxiosSecure from "@/Hooks/useAxiosSecure";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CheckoutForm = ({ price, id }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState('');
    const axiosSecure = useAxiosSecure();
    const [clientSecret, setClientSecret] = useState("");
    const {user} = useAuth();
    const navigate = useNavigate();
    useEffect(() => {
        axiosSecure.post('/create-payment-intent', { price })
        .then(res=>{
            console.log(res.data.clientSecret);
            setClientSecret(res.data.clientSecret);
        })
        .catch(error=>{
            console.log(error);
        })
    }, [axiosSecure, price])
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) {
            return
        }
        const card = elements.getElement(CardElement);
        console.log(card);
        if (!card) {
            return
        }
        const { error } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })
        error?setError(error.message):setError('')
        const {paymentIntent, error:intentError} = await stripe.confirmCardPayment(clientSecret,{
            payment_method:{
                card:card,
                billing_details:{
                    name:user.displayName,
                }
            }
        })
        if(paymentIntent.status==='succeeded'){
            navigate(`payment-success`)
        }
    }
   

    return (
        <form onSubmit={handleSubmit}>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            <button type="submit" disabled={!stripe || !clientSecret}>
                Pay
            </button>
            {error && <p className="text-red-600">{error}</p>}
            
        </form>
    );
};

export default CheckoutForm;