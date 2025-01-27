import useAuth from "@/Hooks/useAuth";
import { axiosSecure } from "@/Hooks/useAxiosSecure";

const SSLPayment = ({ price, id }) => {
    const { user } = useAuth();
    const handleSSLpayment = async() => {
        const payment = {
            email: user.email,
            price: price,
            transactionId :'',
            date:new Date(),
            cartId:id,
            status:'pending',
        }
        const response = await axiosSecure.post('create-payment-ssl',payment)
        console.log(response.data);

    }
    return (
        <div className="text-red-600 font-bold">
                ssl payment method
        </div>
    );
};

export default SSLPayment;