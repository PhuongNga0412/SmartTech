import InputForm from "@/components/InputForm.jsx/InputForm";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as UserService from "@/services/UserService";
import { useMutationHooks } from "@/hook/useMutationHooks";
import { toast } from "react-toastify";
import { updateUser } from "@/redux/slides/userSlide";
import { Link } from "react-router-dom";

const Account = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [avatar, setAvatar] = useState("");

    const mutation = useMutationHooks((data) => {
        const { id, access_token, ...rests } = data;
        UserService.updateUser(id, access_token, rests);
    });
    const { data, isPending, isSuccess, isError } = mutation;

    useEffect(() => {
        setName(user?.name);
        setEmail(user?.email);
        setPhone(user?.phone);
        setAddress(user?.address);
        setAvatar(user?.avatar);
    }, [user]);

    useEffect(() => {
        if (isSuccess) {
            toast.success("Cập nhật thông tin thành công");
            handleGetDetailsUser(user?.id, user?.access_token);
        } else if (isError) {
            toast.error("Update fail");
        }
    }, [isSuccess, isError]);

    const handleGetDetailsUser = async (id, token) => {
        const res = await UserService.getDetailsUser(id, token);
        dispatch(updateUser({ ...res?.data, access_token: token }));
        console.log("res - ", res);
    };

    const handleChangeName = (value) => {
        setName(value);
    };
    const handleChangeEmail = (value) => {
        setEmail(value);
    };
    const handleChangePhone = (value) => {
        setPhone(value);
    };
    const handleChangeAddress = (value) => {
        setAddress(value);
    };
    const handleChangeAvatar = async (event) => {
        const file = event.target.files[0];
        const base64 = await convertBase64(file);
        setAvatar(base64);
    };

    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            console.log(fileReader);
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                resolve(fileReader.result);
            };
            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };

    const handleUpdateUser = () => {
        mutation.mutate({
            id: user?.id,
            name,
            email,
            phone,
            address,
            avatar,
            access_token: user?.access_token,
        });
    };

    return (
        <div>
            <div className="uppercase font-bold text-sm my-20">
                <Link
                    to="/"
                    className="text-gray-500 hover:text-black hover:underline"
                >
                    trang chủ
                </Link>{" "}
                / <span className="text-gray-700">thông tin tài khoản</span>
            </div>
            <div className="flex">
                {/* Sidebar */}
                <div className="w-1/4">
                    <nav className="space-y-4">
                        <div className="font-medium">Thông tin tài khoản</div>
                        {/* <ul className="space-y-2 pl-9">
                            <li>
                                <a href="#" className="text-red-500 ">
                                    My Profile
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-700">
                                    Address Book
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-700">
                                    My Payment Options
                                </a>
                            </li>
                        </ul> */}
                        <div className="font-medium  mt-6">
                            Đơn hàng của tôi
                        </div>
                        {/* <ul className="space-y-2 pl-9">
                            <li>
                                <a href="#" className="text-gray-700">
                                    My Returns
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-700">
                                    My Cancellations
                                </a>
                            </li>
                        </ul> */}
                        <div className="font-medium mt-6">
                            Danh sách yêu thích
                        </div>
                    </nav>
                </div>

                {/* Main Content */}
                <div className="w-3/4 p-8 border border-gray-200 rounded-lg">
                    <h2 className="text-xl font-medium text-red-500 mb-6">
                        Cập nhật thông tin tài khoản
                    </h2>
                    <form className="space-y-4">
                        <div className="flex space-x-4">
                            <div className="w-1/2">
                                <InputForm
                                    label="Họ Tên"
                                    name="name"
                                    type="text"
                                    value={name}
                                    onChange={handleChangeName}
                                />
                            </div>
                            <div className="w-1/2">
                                <InputForm
                                    label="Số điện thoại"
                                    name="phone"
                                    type="tel"
                                    value={phone}
                                    onChange={handleChangePhone}
                                />
                            </div>
                        </div>
                        <div>
                            <InputForm
                                label="Email"
                                name="email"
                                type="email"
                                value={email}
                                onChange={handleChangeEmail}
                            />
                        </div>
                        <div>
                            <InputForm
                                label="Địa chỉ"
                                name="address"
                                type="text"
                                value={address}
                                onChange={handleChangeAddress}
                            />
                        </div>
                        <div>
                            {/* <InputForm
                                label="Avatar"
                                name="avatar"
                                type="file"
                                value={avatar}
                                onChange={(event) => {
                                    handleChangeAvatar(event);
                                }}
                            /> */}
                            <label
                                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                htmlFor="user_avatar"
                            >
                                Avatar
                            </label>
                            <input
                                className="block w-full text-sm text-slate-500 file:mr-4 file:py-3 file:px-4 rounded border border-gray-300 file:border-0 file:text-sm file:font-semibold file:bg-gray-700 file:text-white hover:file:bg-gray-100 hover:file:text-gray-700"
                                aria-describedby="user_avatar_help"
                                id="user_avatar"
                                type="file"
                                onChange={(event) => {
                                    handleChangeAvatar(event);
                                }}
                            />
                        </div>
                        <div>
                            {avatar && (
                                <img
                                    className="w-16 h-16 object-cover"
                                    src={avatar}
                                    alt=""
                                />
                            )}
                        </div>
                        {/* <div className="mt-6">
                            <div className="space-y-4">
                                <div>
                                    <label className="block mb-2">
                                        Password Changes
                                    </label>
                                    <input
                                        type="password"
                                        className="w-full p-3 border rounded"
                                        placeholder="Current Password"
                                    />
                                </div>
                                <input
                                    type="password"
                                    className="w-full p-3 border rounded"
                                    placeholder="New Password"
                                />
                                <input
                                    type="password"
                                    className="w-full p-3 border rounded"
                                    placeholder="Confirm New Password"
                                />
                            </div>
                        </div> */}
                        <div className="flex justify-end space-x-4 mt-6">
                            <button type="button" className="mr-8">
                                Hủy
                            </button>
                            <button
                                onClick={handleUpdateUser}
                                type="button"
                                className="bg-red-500 text-white font-medium px-12 py-4 rounded"
                            >
                                Lưu
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
export default Account;
