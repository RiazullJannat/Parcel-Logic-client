import { RegisterForm } from "@/components/ui/register-form";

const SignUp = () => {
    return (
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-sm">
                <RegisterForm></RegisterForm>
            </div>
        </div>
    );
};

export default SignUp;