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
import Google from "../socialLogin/Google"
export function LoginForm({
  className,
  ...props
}) {
  const {login, Toast, setUser} = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }, } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    login(data.email, data.password)
    .then((res)=>{
      setUser(res.user)
      Toast.fire({
        icon: "success",
        title: "Sign up successfully"
      });
      navigate('/')
    })
    .catch(error=>{
      Toast.fire({
        icon: "error",
        title: error.message
      });
    })

  };
  return (
    (<div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Signin</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input {...register('email',{required:true})} id="email" type="email" placeholder="m@example.com" required />
                {errors.email?.type ==='required' && <p className="text-red-600 font bold">Email is Required.</p>}
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline">
                    Forgot your password?
                  </a>
                </div>
                <Input {...register('password', {required:true})} id="password" type="password" required />
                {errors.password?.type ==='required' && <p className="text-red-600 font bold">password is Required.</p>}
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
              <Google></Google>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link to={'/signup'} className="underline underline-offset-4">
                Sign up
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>)
  );
}
