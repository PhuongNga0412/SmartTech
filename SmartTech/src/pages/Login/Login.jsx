import SignUpInputField from "@/pages/SignUp/SignUpInputField";

const Login = () => {
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
                                        // value={email}
                                        // onChange={(v) =>
                                        //     setEmail(v.target.value)
                                        // }
                                    />
                                    <SignUpInputField
                                        label="Password"
                                        name="password"
                                        type="password"
                                        // value={password}
                                        // onChange={(v) =>
                                        //     setPassword(v.target.value)
                                        // }
                                    />
                                </form>
                            </div>

                            <div className="mt-10">
                                <div className="mt-6  grid-cols-2 gap-4 flex items-center">
                                    <a
                                        href="#"
                                        className="flex w-full items-center justify-center gap-3 rounded-md bg-red-500 px-3 py-4  font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-red-400 focus-visible:ring-transparent"
                                    >
                                        Log In
                                    </a>
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
