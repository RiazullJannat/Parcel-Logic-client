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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import useAuth from "@/Hooks/useAuth";
import useAxiosSecure from "@/Hooks/useAxiosSecure";
const ReviewModal = ({ deliveryManId, status }) => {
    const axiosSecure = useAxiosSecure();
    const { user, Toast } = useAuth();
    const { register, handleSubmit, formState: { errors }, } = useForm();
    const onSubmit = async (data) => {
        data.reviewGiverName = user.displayName;
        data.reviewGiverImage = user.photoURL;
        data.date = new Date().toLocaleDateString('en-US')
        console.log(data);
        const res = await axiosSecure.post('/review', data)
        if (res.data.insertedId) {
            Toast.fire({
                icon: 'success',
                title: 'Success',
            })
        }

    }
    return (
        <div>
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="outline" disabled={status!=='delivered'}>Review</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <div className="flex justify-center items-center">
                            <Avatar className={'w-20 h-20 '}>
                                <AvatarImage src={user.photoURL} />
                                <AvatarFallback>{user.displayName}</AvatarFallback>
                            </Avatar>
                        </div>
                        <DialogTitle>{user.displayName}</DialogTitle>
                        <DialogDescription>
                            Your review will help us a lot.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="name" className="text-right">
                                    Delivery Man Id
                                </Label>
                                <Input
                                {...register('deliveryManId')}
                                    id="deliverymanId"
                                    className="col-span-3"
                                    type="text"
                                    value={deliveryManId}
                                    readOnly
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="name" className="text-right">
                                    Rating
                                </Label>
                                <Input
                                    {...register('rating', { required: true, max: 5, min: 0 })}
                                    id="name"
                                    className="col-span-3"
                                    type="number"
                                    min="0"
                                    max="5"
                                />
                                {errors.rating?.type === 'required' && (
                                    <p className="text-red-600 font-bold">Rating is required.</p>
                                )}
                                {errors.rating?.type === 'min' && (
                                    <p className="text-red-600 font-bold">Rating must be at least 0.</p>
                                )}
                                {errors.rating?.type === 'max' && (
                                    <p className="text-red-600 font-bold">Rating cannot exceed 5.</p>
                                )}
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="feedback" className="text-right">
                                    Feedback
                                </Label>
                                <textarea
                                    {...register('feedback', { required: true })}
                                    id="feedback"
                                    className="col-span-3 border rounded p-2"
                                    rows="4"
                                ></textarea>
                                {errors.feedback?.type === 'required' && (
                                    <p className="text-red-600 font-bold">Feedback is required.</p>
                                )}
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="submit">Submit</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default ReviewModal;