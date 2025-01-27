import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
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
import useAuth from "@/Hooks/useAuth";
import { useEffect, useState } from "react";
import useAxiosSecure from "@/Hooks/useAxiosSecure";
import Swal from "sweetalert2";

export function ParcelDeliveryForm({
    className,
    ...props
}) {
    const [price, setPrice] = useState('');
    const { user } = useAuth();
    const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm();
    const axiosSecure = useAxiosSecure();

    const onSubmit = async (data) => {
        try {
            data.status = 'pending'
            data.bookingDate = new Date().toISOString().slice(0, 10);
            const res = await axiosSecure.post('book-parcel', data);
            if (res.data.insertedId) {
                Swal.fire({
                    title: "Great!",
                    text: "You have booked successfully!",
                    icon: "success"
                });
            }
        } catch (error) {
            Swal.fire({
                title: "OH Sorry!",
                text: error.response?.data?.message || "something went wrong. Please try again later!",
                icon: "error"
            });
        }
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
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    {...register('name')}
                                    id="name"
                                    type="text"
                                    value={user?.displayName || ""}
                                    readOnly
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    {...register('email')}
                                    id="email"
                                    type="email"
                                    value={user?.email || ""}
                                    readOnly
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="phone">Phone Number</Label>
                                <Input
                                    {...register('phone', { required: true })}
                                    id="phone"
                                    type="tel"
                                    placeholder="Enter your phone number"
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
}