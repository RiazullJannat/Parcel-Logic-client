import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useForm } from "react-hook-form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "@/Hooks/useAxiosSecure";
import Swal from "sweetalert2";
const Modal = ({ bookingId, refetch }) => {
    const axiosSecure = useAxiosSecure();
    const { register, handleSubmit, setValue, formState: { errors }, } = useForm();
    const { data: deliveryMenId = [] } = useQuery({
        queryKey: ['deliveryMenId'],
        queryFn: async () => {
            const res = await axiosSecure('/delivery-men-id');
            return res.data
        }
    });
    const onSubmit = async (data) => {
        data.status = 'On the way'
        const res = await axiosSecure.patch(`/set-delivery-man/${bookingId}`, data)
        if (res.data.modifiedCount) {
            refetch();
            Swal.fire({
                title: "Good job!",
                text: "You clicked the button!",
                icon: "success"
            });
            return
        }

    }
    return (
        <div>
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="outline">Manage</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Edit profile</DialogTitle>
                        <DialogDescription>
                            Make changes to your profile here. Click save when you&apos;re done.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="name" className="text-right">
                                    Approximate date
                                </Label>
                                <Input
                                    {...register('approximateDate', { required: true })}
                                    id="name"
                                    className="col-span-3"
                                    type="date"
                                />
                                {errors.approximateDate?.type === 'required' && <p className="text-red-600 font bold">Date is Required.</p>}
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Select onValueChange={(value) => setValue("deliveryManId", value)}>
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Delivery Man" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {
                                            deliveryMenId.map(id =>
                                                <SelectItem key={id._id} value={id._id}>{id._id}</SelectItem>)
                                        }
                                    </SelectContent>
                                </Select>
                                {errors.role?.type === 'required' && <p className="text-red-600 font bold">delivery man is Required.</p>}
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="submit">Assign</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default Modal;