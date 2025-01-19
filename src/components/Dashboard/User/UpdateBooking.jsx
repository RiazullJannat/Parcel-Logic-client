import { cn } from "@/lib/utils";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import useAxiosSecure from "@/Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { Button } from "@/components/ui/button";
import { useLocation } from "react-router-dom";
const UpdateBooking = ({ className, ...props }) => {
    const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm();
    const axiosSecure = useAxiosSecure();
    const location = useLocation();
    const bookingDetails = location.state;
    const [price, setPrice] = useState(bookingDetails.price);

    const onSubmit = async (data) => {
        console.log(data);
        // try {
        //     const res = await axiosSecure.post('book-parcel', data);
        //     if (res.data.insertedId) {
        //         Swal.fire({
        //             title: "Great!",
        //             text: "You have booked successfully!",
        //             icon: "success"
        //         });
        //     }
        // } catch (error) {
        //     Swal.fire({
        //         title: "OH Sorry!",
        //         text: error.response?.data?.message || "something went wrong. Please try again later!",
        //         icon: "error"
        //     });
        // }
    };
    const parcelWeight = watch('parcelWeight')
    useEffect(() => {
        if (parcelWeight) {
            const parcelPrice = parcelWeight <= 1 ? 50 : parcelWeight <= 2 ? 100 : 150;
            setPrice(parcelPrice)
            setValue('price', parcelPrice)
        }
    }, [parcelWeight, setValue])
    return (
        <div className={cn("flex flex-col gap-6 md:w-[60%]", className)} {...props}>
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl">Parcel Delivery Form</CardTitle>
                    <CardDescription>
                        Fill in the details below to request a parcel delivery
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="phone">Phone Number</Label>
                                <Input
                                    {...register('phone', { required: true })}
                                    id="phone"
                                    type="tel"
                                    placeholder="Enter your phone number"
                                    defaultValue={bookingDetails.phone}
                                    required
                                />
                                {errors.phone && <p className="text-red-600 font-bold">Phone Number is Required.</p>}
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="parcelType">Parcel Type</Label>
                                <Input
                                    {...register('parcelType', { required: true })}
                                    id="parcelType"
                                    type="text"
                                    placeholder="Enter parcel type"
                                    defaultValue={bookingDetails.parcelType}
                                    required
                                />
                                {errors.parcelType && <p className="text-red-600 font-bold">Parcel Type is Required.</p>}
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="parcelWeight">Parcel Weight (kg)</Label>
                                <Input
                                    {...register('parcelWeight', { required: true, valueAsNumber: true })}
                                    id="parcelWeight"
                                    type="number"
                                    placeholder="Enter parcel weight"
                                    defaultValue={bookingDetails.parcelWeight}
                                    required
                                />
                                {errors.parcelWeight && <p className="text-red-600 font-bold">Parcel Weight is Required.</p>}
                            </div>
                            <div className="grid gap-2">
                                <Label>Price </Label>
                                <Input value={`${price} TK`} readOnly />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="receiverName">Receiver’s Name</Label>
                                <Input
                                    {...register('receiverName', { required: true })}
                                    id="receiverName"
                                    type="text"
                                    placeholder="Enter receiver’s name"
                                    defaultValue={bookingDetails.receiverName}
                                    required
                                />
                                {errors.receiverName && <p className="text-red-600 font-bold">Receiver’s Name is Required.</p>}
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="receiverPhone">Receiver&apos;s Phone Number</Label>
                                <Input
                                    {...register('receiverPhone', { required: true })}
                                    id="receiverPhone"
                                    type="tel"
                                    placeholder="Enter receiver’s phone number"
                                    defaultValue={bookingDetails.receiverPhone}
                                    required
                                />
                                {errors.receiverPhone && <p className="text-red-600 font-bold">Receiver’s Phone Number is Required.</p>}
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="deliveryAddress">Parcel Delivery Address</Label>
                                <Input
                                    {...register('deliveryAddress', { required: true })}
                                    id="deliveryAddress"
                                    type="text"
                                    placeholder="Enter delivery address"
                                    defaultValue={bookingDetails.deliveryAddress}
                                    required
                                />
                                {errors.deliveryAddress && <p className="text-red-600 font-bold">Parcel Delivery Address is Required.</p>}
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="deliveryDate">Requested Delivery Date</Label>
                                <Input
                                    {...register('deliveryDate', { required: true })}
                                    id="deliveryDate"
                                    type="date"
                                    defaultValue={bookingDetails.deliveryDate}
                                    required
                                />
                                {errors.deliveryDate && <p className="text-red-600 font-bold">Requested Delivery Date is Required.</p>}
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="latitude">Delivery Address Latitude</Label>
                                <Input
                                    {...register('latitude', { required: true, valueAsNumber: true })}
                                    id="latitude"
                                    type="number"
                                    step="any"
                                    placeholder="Enter latitude"
                                    defaultValue={bookingDetails.latitude}
                                    required
                                />
                                {errors.latitude && <p className="text-red-600 font-bold">Latitude is Required.</p>}
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="longitude">Delivery Address Longitude</Label>
                                <Input
                                    {...register('longitude', { required: true, valueAsNumber: true })}
                                    id="longitude"
                                    type="number"
                                    step="any"
                                    placeholder="Enter longitude"
                                    defaultValue={bookingDetails.longitude}
                                    required
                                />
                                {errors.longitude && <p className="text-red-600 font-bold">Longitude is Required.</p>}
                            </div>
                            <Button type="submit" className="w-full">
                                Submit
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default UpdateBooking;