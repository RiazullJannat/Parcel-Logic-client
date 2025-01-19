import { Button } from "@/components/ui/button";
import Loading from "@/components/ui/Loading";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import useAuth from "@/Hooks/useAuth";
import useAxiosSecure from "@/Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import ReviewModal from "./ReviewModal";
import { Link } from "react-router-dom";

const MyBookings = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const { data: myBookings = [], isLoading, isError, error } = useQuery({
        queryKey: ['myParcels', user.email],
        queryFn: async () => {
            const { data } = await axiosSecure('/my-parcels', { params: { email: user.email } });
            return data
        }
    })
    if (isLoading) {
        return <Loading></Loading>
    }
    if (isError) {
        console.log(error)
    }
    // Have to show the bookings data when admin can assign a delivery man for the bookings
    return (
        <div>
            <Table>
                <TableCaption>A list of your recent invoices.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead >Parcel Type</TableHead>
                        <TableHead >req delivery date</TableHead>
                        <TableHead>Approximate Date</TableHead>
                        <TableHead>Booking Date</TableHead>
                        <TableHead>Delivery man</TableHead>
                        <TableHead>status</TableHead>
                        <TableHead>Payment</TableHead>
                        <TableHead>actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        myBookings.map(parcel =>
                            <TableRow key={parcel._id}>
                                <TableCell className="font-medium">{parcel?.parcelType}</TableCell>
                                <TableCell className="font-medium">{parcel?.deliveryDate}</TableCell>
                                <TableCell className="font-medium">{parcel?.approximateDate}</TableCell>
                                <TableCell className="font-medium">{parcel?.bookingDate}</TableCell>
                                <TableCell className="font-medium">{parcel?.deliveryManId}</TableCell>
                                <TableCell className="font-medium">{parcel?.status}</TableCell>
                                <TableCell className="font-medium">
                                    <Button variant="outline">Pay</Button>
                                </TableCell>
                                <TableCell className="font-medium">
                                    <div >
                                        {
                                            parcel.status !== 'pending' ?
                                                <>
                                                    <ReviewModal deliveryManId={parcel?.deliveryManId} variant='outline' disabled={parcel.status != 'delivered'}>Review</ReviewModal>
                                                </> :
                                                <>
                                                    <Link
                                                        to={`/dashboard/my-parcels/update/${parcel._id}`}
                                                        state={parcel}
                                                    >
                                                        <Button variant="outline">Update</Button>
                                                    </Link>
                                                    <Button variant="outline">Cancel</Button>
                                                </>
                                        }
                                    </div>
                                </TableCell>
                            </TableRow>)
                    }
                </TableBody>
            </Table>
        </div>
    );
};

export default MyBookings;