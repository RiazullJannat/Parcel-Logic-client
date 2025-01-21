import { Button } from "@/components/ui/button";
import Loading from "@/components/ui/Loading";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import useAuth from "@/Hooks/useAuth";
import useAxiosSecure from "@/Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import ReviewModal from "./ReviewModal";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useState } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

const MyBookings = () => {
    const axiosSecure = useAxiosSecure();
    const [sort, setSort] = useState(null);
    const { user } = useAuth();
    const { data: myBookings = [], isLoading, isError, error, refetch } = useQuery({
        queryKey: ['myParcels', user.email, sort],
        queryFn: async () => {
            const { data } = await axiosSecure('/my-parcels', { params: { email: user.email, sort:sort } });
            return data
        }
    })
    if (isLoading) {
        return <Loading></Loading>
    }
    if (isError) {
        console.log(error)
    }
    const handleCancel = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, cancel it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/update-booking/${id}`, { status: 'canceled' })
                    .then(res => {
                        if (res.data.modifiedCount) {
                            refetch();
                            Swal.fire({
                                title: "Canceled!",
                                text: "Your booking has been canceled.",
                                icon: "success"
                            });
                        }
                    })
                    .catch(() => {
                        Swal.fire({
                            title: "failed!",
                            text: "failed to cancel.",
                            icon: "error"
                        });
                    })

            }
        });

    }
    return (
        <div>
            <div>
                <div className="grid gap-2">
                    <Select onValueChange={(value) => setSort(value)}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder={sort || "Sort by"} />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="on the way">On The way</SelectItem>
                            <SelectItem value="delivered">Delivered</SelectItem>
                            <SelectItem value="canceled">Canceled</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
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
                                    <Button variant="outline"><Link>Pay</Link></Button>
                                </TableCell>
                                <TableCell className="font-medium">
                                    <div >
                                        {
                                            parcel.status !== 'pending' ?
                                                <>
                                                    <ReviewModal deliveryManId={parcel?.deliveryManId} status={parcel.status} variant='outline' >Review</ReviewModal>
                                                </> :
                                                <>
                                                    <Link
                                                        to={`/dashboard/my-parcels/update/${parcel._id}`}
                                                        state={parcel}
                                                    >
                                                        <Button variant="outline">Update</Button>
                                                    </Link>
                                                    <Button variant="outline" onClick={() => handleCancel(parcel._id)}>Cancel</Button>
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