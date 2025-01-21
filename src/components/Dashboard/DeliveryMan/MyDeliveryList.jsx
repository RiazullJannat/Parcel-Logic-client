import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import useAuth from "@/Hooks/useAuth";
import useAxiosSecure from "@/Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LocationModal from "./LocationModal";
import Swal from "sweetalert2";
const MyDeliveryList = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { data: myDeliveryList = [], refetch } = useQuery({
        queryKey: ['myDeliveryList'],
        queryFn: async () => {
            const res = await axiosSecure('/my-delivery-list', { params: { email: user.email } })
            return res.data
        }
    })
    const handleSetStatus = async (status, id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/set-delivery-man/${id}`, { status:status })
                    .then(res => {
                        if (res.data.modifiedCount) {
                            refetch();
                            Swal.fire({
                                title: "Good job!",
                                text: "You clicked the button!",
                                icon: "success"
                            });
                        }
                    })
            }
        });

    }
    return (
        <div>
            <Table>
                <TableCaption>A list of users.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>User Name</TableHead>
                        <TableHead>Users Phone</TableHead>
                        <TableHead>Receivers Name</TableHead>
                        <TableHead>Receivers Phone</TableHead>
                        <TableHead>Receivers Address</TableHead>
                        <TableHead>Req Delivery Date</TableHead>
                        <TableHead>Approx Delivery Date</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {myDeliveryList.map((parcel, ind) => (
                        // TODO: UPDATE THIS FILES WITH LEGAL DATA -----------------
                        <TableRow key={ind}>
                            <TableCell>{parcel?.bookedUserName}</TableCell>
                            <TableCell>{parcel?.bookedUserPhone}</TableCell>
                            <TableCell>{parcel?.receiverName}</TableCell>
                            <TableCell>{parcel?.receiverPhone}</TableCell>
                            <TableCell>{parcel?.receiverAddress}</TableCell>
                            <TableCell>{parcel?.requestedDeliveryDate}</TableCell>
                            <TableCell>{parcel?.approximateDeliveryDate}</TableCell>
                            <TableCell>
                                <div className="grid gap-2">
                                    <LocationModal latitude={parcel.latitude} longitude={parcel.longitude}></LocationModal>
                                    <Select onValueChange={(value) => handleSetStatus(value, parcel.bookingId)}>
                                        <SelectTrigger className="w-[180px]">
                                            <SelectValue placeholder={parcel.bookingStatus} />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="delivered" disabled={parcel.bookingStatus!=='on the way'} >Delivered</SelectItem>
                                            <SelectItem value="canceled">Cancel</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default MyDeliveryList;