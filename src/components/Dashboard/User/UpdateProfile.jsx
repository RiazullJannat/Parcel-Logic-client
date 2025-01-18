
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
} from "@/components/ui/drawer"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useForm } from "react-hook-form"
import useAuth from "@/Hooks/useAuth"
import useAxiosPublic from "@/Hooks/useAxiosPublic"
import { useState } from "react"


const UpdateProfile = ({currentUser,refetch}) => {
    const axiosPublic = useAxiosPublic();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const { register, handleSubmit, formState: { errors }, } = useForm();
    const img_hosting_api = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_bb_api}`
    const { update } = useAuth();
    
    console.log(currentUser, "from data")
    const onSubmit = async (data) => {
        const imgFile = { image: data?.image[0] }
        const imgUpload = await axiosPublic.post(img_hosting_api, imgFile, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        if(imgUpload.data.status){
            update({
                displayName: data.name,
                photoURL: imgUpload?.data?.data?.display_url,
            })
            .then(()=>{
                const data = {photoURL:imgUpload?.data?.data?.display_url}
                axiosPublic.patch('/update-profile-pic',data,{params:{email:currentUser.email}})
                .then(res=>{
                    if(res.data.modifiedCount){
                        refetch();
                        setIsDrawerOpen(false)
                    }
                })
            })
        }
    }
    return (
        <div className="flex justify-center">
            <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
                <Button onClick={()=>setIsDrawerOpen(true)}>Update Profile</Button>
                <DrawerContent>
                    <DrawerHeader>
                        <DrawerTitle>Are you absolutely sure?</DrawerTitle>
                        <DrawerDescription>This action cannot be undone.</DrawerDescription>
                    </DrawerHeader>
                    <div>
                        <form className={cn("grid items-start gap-4",)} onSubmit={handleSubmit(onSubmit)}>
                            <div className="grid gap-2">
                                <div className="grid gap-2">
                                    <Label htmlFor="username">Username : {currentUser.displayName}</Label>
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="email">Image</Label>
                                    <Input {...register('image', { required: true })} id="image" type="file" />
                                </div>
                                {errors.image?.type === 'required' && <p className="text-red-600 font bold">Image is Required.</p>}
                            </div>
                            <Button type="submit">Save changes</Button>
                        </form>
                    </div>
                    <DrawerFooter>
                        <DrawerClose>
                            <Button variant="outline" onClick={()=>setIsDrawerOpen(false)}>Cancel</Button>
                        </DrawerClose>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </div>
    )
};
export default UpdateProfile;