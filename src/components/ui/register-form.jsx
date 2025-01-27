import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import useAuth from "@/Hooks/useAuth"
import useAxiosPublic from "@/Hooks/useAxiosPublic"
import Google from "../socialLogin/Google"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { toast } from "react-toastify"

export function RegisterForm({
    className,
    ...props
}) {
    const axiosPublic = useAxiosPublic();
    const img_hosting_key = import.meta.env.VITE_image_bb_api;
    const img_hosting_api = `https://api.imgbb.com/1/upload?key=${img_hosting_key}`
    const { createUser, update, Toast, setUser } = useAuth();
    const { register, handleSubmit, setValue, formState: { errors }, } = useForm();
    const navigate = useNavigate();
    const onSubmit = async (data) => {
        const imgFile = { image: data?.image[0] }
        const imgUpload = await axiosPublic.post(img_hosting_api, imgFile, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        if (imgUpload.data.status) {
            createUser(data.email, data.password)
                .then((res) => {
                    update({
                        displayName: data.name,
                        photoURL: imgUpload?.data?.data?.display_url
                    })
                        .then(() => {
                            const user = {
                                email: data.email,
                                name: data.name,
                                role: data.role,
                                photoURL: imgUpload.data.data.display_url
                            }
                            setUser(res.user)
                            axiosPublic.post('/add-user', user)
                                .then(res => {
                                    if (res.data.insertedId) {
                                        Toast.fire({
                                            icon: "success",
                                            title: "Signed in successfully"
                                        });
                                        navigate('/')
                                    }
                                })
                        })
                        .catch(error => toast.error(error.message))
                })
                .catch(error =>toast.error(error.message))
        }

    };

    return (
        (<div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl">SignUP</CardTitle>
                    <CardDescription>
                        Enter your name, email, password below to register your account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Name</Label>
                                <Input {...register('name', { required: true })} id="name" type="text" placeholder="Enter your name" required />
                                {errors.email?.type === 'required' && <p className="text-red-600 font bold">Name is Required.</p>}
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="email">Image</Label>
                                <Input {...register('image',)} id="image" type="file" />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input {...register('email', { required: true })} id="email" type="email" placeholder="m@example.com" required />
                                {errors.email?.type === 'required' && <p className="text-red-600 font bold">Email is Required.</p>}
                            </div>
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Password</Label>
                                </div>
                                <Input {...register('password', { required: true })} id="password" type="password" required />
                                {errors.password?.type === 'required' && <p className="text-red-600 font bold">password is Required.</p>}
                            </div>
                            <div className="grid gap-2">
                                <Select onValueChange={(value) => setValue("role", value)}>
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Role" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="user">User</SelectItem>
                                        <SelectItem value="delivery-man">Delivery Man</SelectItem>
                                    </SelectContent>
                                </Select>
                                {errors.role?.type === 'required' && <p className="text-red-600 font bold">Role is Required.</p>}
                            </div>
                            <Button type="submit" className="w-full">
                                Sign Up
                            </Button>
                            <Google></Google>
                        </div>
                        <div className="mt-4 text-center text-sm">
                            Don&apos;t have an account?{" "}
                            <Link to={'/signin'} className="underline underline-offset-4">
                                Sign in
                            </Link>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>)
    );
}
