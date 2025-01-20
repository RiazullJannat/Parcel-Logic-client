import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import useAxiosSecure from "@/Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
const AllDeliverymen = () => {
    const axiosSecure = useAxiosSecure();
    const {data:deliverymen=[]}= useQuery({
        queryKey:['deliverymen'],
        queryFn:async()=>{
            const res = await axiosSecure('/deliverymen')
            return res.data
        }
    })
    return (
        <div>
            <Table>
                <TableCaption>A list of users.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead>Total delivered</TableHead>
                        <TableHead>Average Review</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {deliverymen.map((man) => (
                        <TableRow key={man?.name}>
                            <TableCell>{man?.name}</TableCell>
                            <TableCell>{man?.phone}</TableCell>
                            <TableCell>{man?.parcelsDelivered}</TableCell>
                            <TableCell>{man?.averageReview}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default AllDeliverymen;