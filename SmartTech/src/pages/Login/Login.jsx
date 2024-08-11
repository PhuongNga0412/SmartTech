import SignUpInputField from "@/pages/SignUp/SignUpInputField";
import { useEffect, useState } from "react";
import * as UserService from "@/services/UserService";
import { useMutationHooks } from "@/hook/useMutationHooks";
import { Loading } from "@/components/LoadingComponent/Loading";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { updateUser } from "@/redux/slides/userSlide";

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();

    const mutation = useMutationHooks((data) => UserService.loginUser(data));
    const { data, isPending, isSuccess } = mutation;

    useEffect(() => {
        if (isSuccess && data?.status !== "ERR") {
            navigate("/");
            localStorage.setItem(
                "access_token",
                JSON.stringify(data?.access_token)
            );
            if (data?.access_token) {
                const decoded = jwtDecode(data?.access_token);
                console.log("decoded", decoded);
                if (decoded?.id) {
                    handleGetDetailsUser(decoded?.id, data?.access_token);
                }
            }
        }
    }, [isSuccess]);

    const handleGetDetailsUser = async (id, token) => {
        const res = await UserService.getDetailsUser(id, token);
        dispatch(updateUser({ ...res?.data, access_token: token }));
        console.log("res - ", res);
    };

    const handleOnchangeEmail = (value) => {
        setEmail(value);
    };
    const handleOnchangePassword = (value) => {
        setPassword(value);
    };
    const handleSignIn = () => {
        mutation.mutate({
            email,
            password,
        });
    };

    return (
        <>
            <div className="flex min-h-screen flex-1 mt-[60px] mb-[140px]">
                <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
                    <div className="mx-auto w-full max-w-sm lg:w-96">
                        <div>
                            <h2 className="mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900">
                                Log in to Exclusive
                            </h2>
                            <p className="mt-2  leading-6 text-gray-500">
                                Enter your details below
                            </p>
                        </div>

                        <div className="mt-10">
                            <div>
                                <form
                                    action="#"
                                    method="POST"
                                    className="space-y-6"
                                >
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
                                </form>
                            </div>

                            <div className="mt-10">
                                <div className="mt-6  grid-cols-2 gap-4 flex items-center">
                                    {data?.status === "ERR" && (
                                        <span>{data?.message}</span>
                                    )}

                                    <button
                                        disabled={
                                            email.length === 0 ||
                                            password.length === 0 ||
                                            isPending
                                        }
                                        onClick={handleSignIn}
                                        className="flex w-full items-center justify-center gap-3 rounded-md bg-red-500 px-3 py-4  font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-red-400 focus-visible:ring-transparent"
                                    >
                                        {isPending ? <Loading /> : "Log In"}
                                    </button>

                                    <div className="leading-6">
                                        <a
                                            href="#"
                                            className="font-semibold text-red-500 hover:text-red-400"
                                        >
                                            Forgot password?
                                        </a>
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
export default Login;
