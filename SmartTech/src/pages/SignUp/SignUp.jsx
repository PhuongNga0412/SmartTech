import SignUpInputField from "@/pages/SignUp/SignUpInputField";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as UserService from "@/services/UserService";
import { useMutationHooks } from "@/hook/useMutationHooks";
import { toast } from "react-toastify";
import LoadingComponent from "@/components/LoadingComponent/LoadingComponent";

const SignUp = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState({
        name: "",
        email: "",
        password: "",
    });
    const msgErr = {
        name: "",
        email: "",
        password: "",
    };

    const mutation = useMutationHooks((data) => UserService.signupUser(data), {
        onError: (error) => {
            if (error.response) {
                toast.error(
                    `Lỗi máy chủ: ${
                        error.response.data.message ||
                        "Đăng ký không thành công"
                    }`
                );
            } else if (error.request) {
                toast.error("Lỗi mạng: Không thể kết nối đến máy chủ");
            } else {
                toast.error(`Đã xảy ra lỗi: ${error.message}`);
            }
        },
    });
    const { data, isPending, isSuccess } = mutation;
    const navigate = useNavigate();

    useEffect(() => {
        if (isSuccess && data?.status !== "ERR") {
            toast.success("Đăng ký tài khoản thành công");
            navigate("/login");
        }
    }, [isSuccess]);

    const handleOnchangeName = (value) => {
        setName(value);
        setErrorMessage({ ...errorMessage, name: "" });
    };
    const handleOnchangeEmail = (value) => {
        setEmail(value);
        setErrorMessage({ ...errorMessage, email: "" });
    };
    const handleOnchangePassword = (value) => {
        setPassword(value);
        setErrorMessage({ ...errorMessage, password: "" });
    };

    const handleSignUp = () => {
        const emailRegex =
            /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if (!name) {
            msgErr.name = "Vui lòng nhập tên";
        }
        if (!email) {
            msgErr.email = "Vui lòng nhập email";
        } else if (!emailRegex.test(email)) {
            msgErr.email = "Email không đúng định dạng";
        }
        if (!password) {
            msgErr.password = "Vui lòng nhập password";
        } else if (password.length < 6) {
            msgErr.password = "Mật khẩu tối thiểu 6 ký tự";
        }

        setErrorMessage({
            ...errorMessage,
            name: msgErr.name,
            email: msgErr.email,
            password: msgErr.password,
        });
        if (!msgErr.name && !msgErr.email && !msgErr.password) {
            mutation.mutate(
                { name, email, password },
                {
                    onError: (error) => {
                        if (error.response) {
                            const errorMsg =
                                error.response.data.message.message;
                            setErrorMessage({
                                ...errorMessage,
                                email: errorMsg.includes(
                                    "Tài khoản email đã tồn tại"
                                )
                                    ? "Tài khoản email đã tồn tại"
                                    : "",
                            });
                        }
                    },
                }
            );
        }
    };

    return (
        <>
            <div className="flex min-h-screen flex-1 mt-[60px] mb-[140px]">
                <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
                    <div className="mx-auto w-full max-w-sm lg:w-96">
                        <div>
                            <h2 className="mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900">
                                Đăng ký tài khoản
                            </h2>
                            <p className="mt-2  leading-6 text-gray-500">
                                Nhập thông tin chi tiết của bạn dưới đây
                            </p>
                        </div>

                        <div className="mt-10">
                            <div>
                                <form className="pt-5 space-y-6">
                                    <SignUpInputField
                                        label="Họ Tên"
                                        name="name"
                                        type="text"
                                        value={name}
                                        onChange={handleOnchangeName}
                                    />
                                    <div className="text-sm text-red-600">
                                        {errorMessage.name}
                                    </div>
                                    <SignUpInputField
                                        label="Email"
                                        name="email"
                                        type="email"
                                        value={email}
                                        onChange={handleOnchangeEmail}
                                    />
                                    <div className="text-sm text-red-600">
                                        {errorMessage.email}
                                    </div>
                                    <SignUpInputField
                                        label="Password"
                                        name="password"
                                        type="password"
                                        value={password}
                                        onChange={handleOnchangePassword}
                                    />
                                    <div className="text-sm text-red-600">
                                        {errorMessage.password}
                                    </div>

                                    <div className="mt-10">
                                        <button
                                            onClick={handleSignUp}
                                            type="button"
                                            className="flex w-full justify-center rounded-md py-4 bg-red-500 px-3  font-semibold leading-6 text-white shadow-sm hover:bg-red-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                        >
                                            {isPending ? (
                                                <LoadingComponent />
                                            ) : (
                                                "Đăng ký"
                                            )}
                                        </button>
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
                                            Bạn đã có tài khoản?{" "}
                                            <Link to="/login">Đăng nhập</Link>
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
