
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import useAxiosSecure from "@/Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Modal from "./Dialog";

const AllParcels = () => {
    const axiosSecure = useAxiosSecure();
    const { data: allParcels = [] } = useQuery({
        queryKey: ['allParcels'],
        queryFn: async () => {
            const res = await axiosSecure('all-parcels')
            return res.data
        }
    })
    return (
        <div>
            <Table>
                <TableCaption>A list of your recent invoices.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">customer name</TableHead>
                        <TableHead className="w-[100px]">customer phone</TableHead>
                        <TableHead>booking Date</TableHead>
                        <TableHead>req delivery date</TableHead>
                        <TableHead className="text-right">cost</TableHead>
                        <TableHead>status</TableHead>
                        <TableHead>action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        allParcels.map(parcel =>
                            <TableRow key={parcel._id}>
                                <TableCell className="font-medium">{parcel?.name}</TableCell>
                                <TableCell className="font-medium">{parcel?.phone}</TableCell>
                                <TableCell className="font-medium">{parcel?.bookingDate}</TableCell>
                                <TableCell className="font-medium">{parcel?.deliveryDate}</TableCell>
                                <TableCell className="text-right">{parcel?.price}TK</TableCell>
                                <TableCell>{parcel?.status}</TableCell>
                                <TableCell><Modal bookingId={parcel._id} ></Modal></TableCell>
                            </TableRow>)
                    }
                </TableBody>
            </Table>
        </div>
    );
};

export default AllParcels;