
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
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";


const AllParcels = () => {
    const { register, handleSubmit, formState: { errors } } = useForm({})
    const [searchData, setSearchData] = useState({});
    const axiosSecure = useAxiosSecure();
    const { data: allParcels = [], refetch } = useQuery({
        queryKey: ['allParcels',searchData],
        queryFn: async () => {
            const res = await axiosSecure('all-parcels',{params:{searchData:searchData}})
            return res.data
        }
    })
    const onSubmit = (data) =>{
        setSearchData(data)
    }
    return (
        <div>
            <div>
                <form onSubmit={handleSubmit(onSubmit)} className="my-8" >
                    <div className="grid grid-cols-2  gap-2 my-2" >
                        <div className="grid gap-2">
                            <Label htmlFor="fromDate">From</Label>
                            <Input
                                {...register('fromDate', { required: true })}
                                id="fromDate"
                                type="date"
                                required
                            />
                            {errors.fromDate && <p className="text-red-600 font-bold">Date is Required.</p>}
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="toDate">To</Label>
                            <Input
                                {...register('toDate', { required: true })}
                                id="toDate"
                                type="date"
                                required
                            />
                            {errors.toDate && <p className="text-red-600 font-bold"> Date is Required.</p>}
                        </div>
                    </div>
                    <Button type="submit" className="w-full">
                        search
                    </Button>
                </form>
            </div>
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
                                <TableCell><Modal bookingId={parcel._id} refetch={refetch}></Modal></TableCell>
                            </TableRow>)
                    }
                </TableBody>
            </Table>
        </div>
    );
};

export default AllParcels;