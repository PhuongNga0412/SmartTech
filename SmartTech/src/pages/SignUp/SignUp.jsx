import SignUpInputField from "@/pages/SignUp/SignUpInputField";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as UserService from "@/services/UserService";
import { useMutationHooks } from "@/hook/useMutationHooks";
import { Loading } from "@/components/LoadingComponent/Loading";
import { toast } from "react-toastify";

const SignUp = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const mutation = useMutationHooks((data) => UserService.signupUser(data));
    const { data, isPending, isSuccess, isError } = mutation;
    const navigate = useNavigate();
    useEffect(() => {
        if (isSuccess && data?.status !== "ERR") {
            toast.success("Create");
            navigate("/login");
        } else if (isError) {
            toast.error("create fail");
        }
    }, [isSuccess, isError]);

    const handleOnchangeName = (value) => {
        setName(value);
    };
    const handleOnchangeEmail = (value) => {
        setEmail(value);
    };
    const handleOnchangePassword = (value) => {
        setPassword(value);
    };

    const handleSignUp = () => {
        mutation.mutate({ name, email, password });
    };

    return (
        <>
            <div className="flex min-h-screen flex-1 mt-[60px] mb-[140px]">
                <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
                    <div className="mx-auto w-full max-w-sm lg:w-96">
                        <div>
                            <h2 className="mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900">
                                Create an account
                            </h2>
                            <p className="mt-2  leading-6 text-gray-500">
                                Enter your details below
                            </p>
                        </div>

                        <div className="mt-10">
                            <div>
                                <form className="pt-5">
                                    <SignUpInputField
                                        label="Name"
                                        name="name"
                                        type="text"
                                        value={name}
                                        onChange={handleOnchangeName}
                                    />
                                    <SignUpInputField
                                        label="Email or Phone Number"
                                        name="email"
                                        type="email"
                                        value={email}
                                        onChange={handleOnchangeEmail}
                                    />
                                    <SignUpInputField
                                        label="Password"
                                        name="password"
                                        type="password"
                                        value={password}
                                        onChange={handleOnchangePassword}
                                    />

                                    <div>
                                        {data?.status === "ERR" && (
                                            <span>{data?.message}</span>
                                        )}
                                        <button
                                            onClick={handleSignUp}
                                            type="button"
                                            className="flex w-full justify-center rounded-md py-4 bg-red-500 px-3  font-semibold leading-6 text-white shadow-sm hover:bg-red-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                        >
                                            {isPending ? (
                                                <Loading />
                                            ) : (
                                                "Create an account"
                                            )}
                                        </button>
                                        <a
                                            href="#"
                                            className="flex w-full items-center justify-center gap-3 rounded-md bg-white px-3 py-4 mt-4 font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:ring-transparent"
                                        >
                                            <svg
                                                viewBox="0 0 24 24"
                                                aria-hidden="true"
                                                className="h-5 w-5"
                                            >
                                                <path
                                                    d="M12.0003 4.75C13.7703 4.75 15.3553 5.36002 16.6053 6.54998L20.0303 3.125C17.9502 1.19 15.2353 0 12.0003 0C7.31028 0 3.25527 2.69 1.28027 6.60998L5.27028 9.70498C6.21525 6.86002 8.87028 4.75 12.0003 4.75Z"
                                                    fill="#EA4335"
                                                />
                                                <path
                                                    d="M23.49 12.275C23.49 11.49 23.415 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.34 17.25 16.08 18.1L19.945 21.1C22.2 19.01 23.49 15.92 23.49 12.275Z"
                                                    fill="#4285F4"
                                                />
                                                <path
                                                    d="M5.26498 14.2949C5.02498 13.5699 4.88501 12.7999 4.88501 11.9999C4.88501 11.1999 5.01998 10.4299 5.26498 9.7049L1.275 6.60986C0.46 8.22986 0 10.0599 0 11.9999C0 13.9399 0.46 15.7699 1.28 17.3899L5.26498 14.2949Z"
                                                    fill="#FBBC05"
                                                />
                                                <path
                                                    d="M12.0004 24.0001C15.2404 24.0001 17.9654 22.935 19.9454 21.095L16.0804 18.095C15.0054 18.82 13.6204 19.245 12.0004 19.245C8.8704 19.245 6.21537 17.135 5.2654 14.29L1.27539 17.385C3.25539 21.31 7.3104 24.0001 12.0004 24.0001Z"
                                                    fill="#34A853"
                                                />
                                            </svg>
                                            <span className=" font-semibold leading-6">
                                                Google
                                            </span>
                                        </a>
                                    </div>
                                </form>
                            </div>

                            <div className="mt-10">
                                <div className="relative">
                                    <div
                                        aria-hidden="true"
                                        className="absolute inset-0 flex items-center"
                                    >
                                        <div className="w-full border-t border-gray-200" />
                                    </div>
                                    <div className="relative flex justify-center  font-medium leading-6">
                                        <span className="bg-white px-6 text-gray-900">
                                            Already have account?{" "}
                                            <Link to="/login">Login</Link>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="relative hidden w-0 flex-1 lg:block">
                    <img
                        alt=""
                        src="https://images.unsplash.com/photo-1496917756835-20cb06e75b4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
                        className="absolute inset-0 h-full w-full object-cover"
                    />
                </div>
            </div>
        </>
    );
};
export default SignUp;
