// import { ProductForm } from "@/components/AdminForm/ProductForm";
import { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";

import * as UserService from "@/services//UserService";
import { useMutationHooks } from "@/hook/useMutationHooks";
import FormEdit from "@/components/AdminForm/FormEdit/FormEdit";
import InputComponent from "@/components/InputComponent/InputComponent";

import { toast } from "react-toastify";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import ModalConfirmDelete from "@/components/ModalConfirmDelete/ModalConfirmDelete";

import { Loading } from "@/components/LoadingComponent/Loading";
import ReactPaginate from "react-paginate";
import { getAllUser } from "@/services/UserService";

export default function UserManagement() {
    const [openModal, setOpenModal] = useState(false);
    const [openModalEdit, setOpenModalEdit] = useState(false);
    const [rowSelected, setRowSelected] = useState("");
    const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);

    const user = useSelector((state) => state?.user);
    // const searchInput = useRef();

    const [stateUser, setStateUser] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        isAdmin: false,
        avatar: "",
    });

    const [paginate, setPaginate] = useState({
        limit: 8,
        page: 0,
        total: 1,
    });

    const onCloseModal = () => {
        setOpenModal(false);
        setOpenModalEdit(false);
    };

    const [stateUserDetails, setStateUserDetails] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        isAdmin: false,
        avatar: "",
    });

    const handleOnChange = (e) => {
        setStateUser({
            ...stateUser,
            [e.target.name]: e.target.value,
        });
    };
    const handleOnChangeDetails = (e) => {
        setStateUserDetails({
            ...stateUserDetails,
            [e.target.name]: e.target.value,
        });
    };

    const handleChangeAvatar = async (event) => {
        const file = event.target.files[0];
        const base64 = await convertBase64(file);
        setStateUser({
            ...stateUser,
            avatar: base64,
        });
    };
    const handleChangeUserDetails = async (event) => {
        const file = event.target.files[0];
        const base64 = await convertBase64(file);
        setStateUserDetails({
            ...stateUserDetails,
            avatar: base64,
        });
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

    const mutation = useMutationHooks((data) => {
        const { name, email, phone, address, isAdmin, avatar } = data;
        const res = UserService.signupUser({
            name,
            email,
            phone,
            address,
            isAdmin,
            avatar,
        });
        return res;
    });
    const { data, isSuccess, isError } = mutation;

    const mutationUpdate = useMutationHooks((data) => {
        const { id, token, ...rests } = data;
        const res = UserService.updateUser(id, token, { ...rests });
        return res;
    });
    const {
        data: dataUpdated,
        isSuccess: isSuccessUpdate,
        isError: isErrorUpdate,
    } = mutationUpdate;

    const mutationDelete = useMutationHooks((data) => {
        const { id, token } = data;
        const res = UserService.deleteUser(id, token);
        return res;
    });
    const {
        data: dataDeleted,
        isSuccess: isSuccessDeleted,
        isError: isErrorDeleted,
    } = mutationDelete;

    useEffect(() => {
        if (isSuccess && data?.status === "OK") {
            toast.success("Tài khoản đã được tạo thành công!");
            setStateUser({
                name: "",
                email: "",
                phone: "",
                address: "",
                isAdmin: false,
                avatar: "",
            });
            onCloseModal();
        } else if (isError) {
            toast.error("Có lỗi xảy ra. Vui lòng thử lại sau.");
        }
    }, [isSuccess]);

    useEffect(() => {
        if (isSuccessUpdate && dataUpdated?.status === "OK") {
            toast.success("Tài khoản đã được cập nhật thành công!");
            // setStateUserDetails({
            //     name: "",
            //     email: "",
            //     phone: "",
            //     address: "",
            //     isAdmin: false,
            //     avatar: "",
            // });
            onCloseModal();
        } else if (isErrorUpdate) {
            setStateUserDetails({
                name: "",
                email: "",
                phone: "",
                address: "",
                isAdmin: false,
                avatar: "",
            });
            onCloseModal();
        }
    }, [isSuccessUpdate, isErrorUpdate]);

    useEffect(() => {
        if (isSuccessDeleted && dataDeleted?.status === "OK") {
            toast.success("Xóa thành công tài khoản!");
            handleCancelDelete();
        } else if (isErrorDeleted) {
            toast.error("Có lỗi xảy ra. Vui lòng thử lại sau.");
        }
    }, [isSuccessDeleted, isErrorDeleted]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const params = {
            name: stateUser.name,
            avatar: stateUser.avatar,
            phone: stateUser.phone,
            email: stateUser.email,
            address: stateUser.address,
        };
        mutation.mutate(params, {
            onSettled: () => {
                queryUser.refetch();
            },
        });
    };

    const getAllUsers = async (context) => {
        const limit = context?.queryKey && context?.queryKey[1];
        const page = context?.queryKey && context?.queryKey[2];
        const res = await UserService.getAllUser(limit, page);
        console.log(res);
        if (res?.status === "OK") {
            setPaginate((prev) => ({
                ...prev,
                total: res?.totalPageUser,
            }));
        }

        return res;
    };

    const queryUser = useQuery({
        queryKey: ["users", paginate.limit, paginate.page],
        queryFn: getAllUsers,
    });
    const { data: users, isLoading } = queryUser;

    const fetchGetDetailsUser = async (rowSelected) => {
        const res = await UserService.getDetailsUser(rowSelected);
        console.log(res?.data);
        if (res?.data) {
            setStateUserDetails({
                name: res?.data?.name,
                email: res?.data?.email,
                phone: res?.data?.phone,
                address: res?.data?.address,
                isAdmin: res?.data?.isAdmin,
                avatar: res?.data?.avatar,
            });
        }
    };

    const handleDetailUser = () => {
        setOpenModalEdit(true);
    };

    useEffect(() => {
        if (rowSelected) {
            fetchGetDetailsUser(rowSelected);
        }
    }, [rowSelected]);

    const handleUpdateProduct = (e) => {
        e.preventDefault();
        mutationUpdate.mutate(
            {
                id: rowSelected,
                token: user?.access_token,
                ...stateUserDetails,
            },
            {
                onSettled: () => {
                    queryUser.refetch();
                },
            }
        );
        console.log("state.pro - ", stateUserDetails);
    };

    const handleCancelDelete = () => {
        setIsModalOpenDelete(false);
    };

    const handleDeleteUser = () => {
        mutationDelete.mutate(
            { id: rowSelected, token: user?.access_token },
            {
                onSettled: () => {
                    queryUser.refetch();
                },
            }
        );
    };

    const handlePageClick = (data) => {
        setPaginate((prev) => ({ ...prev, page: data.selected }));
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <div className="sm:px-6 lg:pr-[70px]">
            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                    <h1 className="text-base font-semibold leading-6 text-gray-900">
                        TÀI KHOẢN NGƯỜI DÙNG
                    </h1>
                </div>
                <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                    <button
                        onClick={() => setOpenModal(true)}
                        type="button"
                        className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Thêm mới
                    </button>
                </div>
            </div>
            <Loading isLoading={isLoading}>
                <div className="mt-8 flow-root">
                    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                            <table className="min-w-full divide-y divide-gray-300">
                                <thead>
                                    <tr>
                                        <th
                                            scope="col"
                                            className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                                        >
                                            Họ Tên
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                        >
                                            Số điện thoại
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                        >
                                            isAdmin
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                        >
                                            Địa chỉ
                                        </th>
                                        <th
                                            scope="col"
                                            className="relative py-3.5 pl-3 pr-4 sm:pr-0"
                                        >
                                            <span className="sr-only">
                                                Edit
                                            </span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                    {users?.data?.map((item) => (
                                        <tr
                                            key={item.name}
                                            onClick={() =>
                                                setRowSelected(item._id)
                                            }
                                        >
                                            <td className="py-5 pl-4 pr-3 text-sm sm:pl-0">
                                                <div className="flex items-center">
                                                    <div className="h-11 w-11 flex-shrink-0">
                                                        <img
                                                            alt=""
                                                            src={item?.avatar}
                                                            className="h-11 w-11 rounded object-cover"
                                                        />
                                                    </div>
                                                    <div className="ml-4">
                                                        <div className="font-medium text-gray-900">
                                                            {item.name}
                                                        </div>
                                                        {/* <div className="mt-1 text-gray-500">
                                                        {item.type}
                                                    </div> */}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                                                <div className="text-gray-900">
                                                    {item?.phone}
                                                </div>
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                                                {item?.isAdmin ? (
                                                    <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                                                        TRUE
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-green-600/20">
                                                        FALSE
                                                    </span>
                                                )}
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                                                {item?.email}
                                            </td>
                                            <td className="relative whitespace-nowrap py-5 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                                                <button
                                                    onClick={handleDetailUser}
                                                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                                                >
                                                    Sửa
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        setIsModalOpenDelete(
                                                            true
                                                        )
                                                    }
                                                    className="text-red-600 hover:text-red-900"
                                                >
                                                    Xóa
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div className="flex justify-center">
                                <ReactPaginate
                                    previousLabel={"<<"}
                                    nextLabel={">>"}
                                    breakLabel="..."
                                    pageCount={paginate?.total}
                                    pageRangeDisplayed={3}
                                    forcePage={paginate?.page}
                                    onPageChange={handlePageClick}
                                    activeClassName="text-red-700 font-bold dark:text-red-700 "
                                    containerClassName="inline-flex -space-x-px text-sm"
                                    pageLinkClassName="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                                    previousLinkClassName="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                                    nextLinkClassName="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                                    breakLinkClassName="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                                    activeLinkClassName="flex items-center justify-center px-3 h-8 text-red-700 font-semibold border-gray-300 bg-red-100 dark:text-red-700 "
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </Loading>

            {/* -------------------------------create------------------------------- */}
            <Dialog
                open={openModal}
                onClose={onCloseModal}
                className="relative z-10"
            >
                <DialogBackdrop
                    transition
                    className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
                />

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <DialogPanel
                            transition
                            className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg sm:p-6 data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
                        >
                            <div>
                                <form
                                    onSubmit={handleSubmit}
                                    // className="container bg-white w-full h-[80%] max-w-lg mx-auto rounded-lg shadow py-6 px-8 relative overflow-auto"
                                >
                                    <h3 className="uppercase text-2xl font-semibold py-4">
                                        Thêm mới tài khoản
                                    </h3>
                                    <div className="flex flex-wrap -mx-3 mb-6">
                                        <div className="relative w-full px-3">
                                            <label
                                                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                                htmlFor="grid-password"
                                            >
                                                họ tên
                                            </label>
                                            <InputComponent
                                                value={stateUser.name}
                                                onChange={handleOnChange}
                                                name="name"
                                            />
                                            {/* <p className="italic text-red-500 text-xs absolute -bottom-5">
                            {message.address}
                        </p> */}
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap -mx-3 mb-6">
                                        <div className="relative w-full px-3">
                                            <label
                                                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                                htmlFor="grid-password"
                                            >
                                                email
                                            </label>
                                            <InputComponent
                                                value={stateUser.email}
                                                onChange={handleOnChange}
                                                name="email"
                                            />
                                            {/* <p className="italic text-red-500 text-xs absolute -bottom-5">
                            {message.address}
                        </p> */}
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap -mx-3 mb-6">
                                        <div className="relative w-full px-3">
                                            <label
                                                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                                htmlFor="grid-password"
                                            >
                                                số điện thoại
                                            </label>
                                            <InputComponent
                                                value={stateUser.phone}
                                                onChange={handleOnChange}
                                                name="phone"
                                            />
                                            {/* <p className="italic text-red-500 text-xs absolute -bottom-5">
                            {message.address}
                        </p> */}
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap -mx-3 mb-6">
                                        <div className="relative w-full px-3">
                                            <label
                                                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                                htmlFor="grid-password"
                                            >
                                                địa chỉ
                                            </label>
                                            <InputComponent
                                                value={stateUser.address}
                                                onChange={handleOnChange}
                                                name="address"
                                            />

                                            {/* <p className="italic text-red-500 text-xs absolute -bottom-5">
                            {message.address}
                        </p> */}
                                        </div>
                                    </div>

                                    <div>
                                        <div>
                                            <label
                                                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                                htmlFor="user_avatar"
                                            >
                                                avatar
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
                                    </div>
                                    <div className="flex gap-4">
                                        {stateUser?.image?.map(
                                            (image, index) => (
                                                <img
                                                    key={index}
                                                    className="mt-4 w-20 h-20 object-cover"
                                                    src={image}
                                                    alt=""
                                                />
                                            )
                                        )}
                                    </div>

                                    <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                                        <button
                                            type="submit"
                                            className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2"
                                        >
                                            Thêm
                                        </button>
                                        <button
                                            type="button"
                                            data-autofocus
                                            onClick={() => setOpenModal(false)}
                                            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                                        >
                                            Hủy
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>

            {/* -------------------------------update------------------------------- */}
            <FormEdit
                title="CẬP NHẬT THÔNG TIN NGƯỜI DÙNG"
                isOpen={openModalEdit}
                onClose={() => setOpenModalEdit(false)}
            >
                <form
                    onSubmit={handleUpdateProduct}
                    // className="container bg-white w-full h-[80%] max-w-lg mx-auto rounded-lg shadow py-6 px-8 relative overflow-auto"
                >
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="relative w-full px-3">
                            <label
                                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                htmlFor="grid-password"
                            >
                                họ tên
                            </label>
                            <InputComponent
                                value={stateUserDetails.name}
                                onChange={handleOnChangeDetails}
                                name="name"
                            />
                            {/* <p className="italic text-red-500 text-xs absolute -bottom-5">
                            {message.address}
                        </p> */}
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="relative w-full px-3">
                            <label
                                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                htmlFor="grid-password"
                            >
                                email
                            </label>
                            <InputComponent
                                value={stateUserDetails.email}
                                onChange={handleOnChangeDetails}
                                name="email"
                            />
                            {/* <p className="italic text-red-500 text-xs absolute -bottom-5">
                            {message.address}
                        </p> */}
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="relative w-full px-3">
                            <label
                                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                htmlFor="grid-password"
                            >
                                số điện thoại
                            </label>
                            <InputComponent
                                value={stateUserDetails.phone}
                                onChange={handleOnChangeDetails}
                                name="phone"
                            />
                            {/* <p className="italic text-red-500 text-xs absolute -bottom-5">
                            {message.address}
                        </p> */}
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="relative w-full px-3">
                            <label
                                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                htmlFor="grid-password"
                            >
                                địa chỉ
                            </label>
                            <InputComponent
                                value={stateUserDetails.address}
                                onChange={handleOnChangeDetails}
                                name="address"
                            />
                            {/* <p className="italic text-red-500 text-xs absolute -bottom-5">
                            {message.address}
                        </p> */}
                        </div>
                    </div>

                    <div>
                        <div>
                            <label
                                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                htmlFor="user_avatar"
                            >
                                avatar
                            </label>
                            <input
                                className="block w-full text-sm text-slate-500 file:mr-4 file:py-3 file:px-4 rounded border border-gray-300 file:border-0 file:text-sm file:font-semibold file:bg-gray-700 file:text-white hover:file:bg-gray-100 hover:file:text-gray-700"
                                aria-describedby="user_avatar_help"
                                id="user_avatar"
                                type="file"
                                onChange={(event) => {
                                    handleChangeUserDetails(event);
                                }}
                            />
                        </div>
                    </div>
                    <div>
                        {stateUserDetails?.avatar && (
                            <img
                                className="mt-4 w-20 h-20 object-cover"
                                src={stateUserDetails?.avatar}
                                alt=""
                            />
                        )}
                    </div>

                    <div className="flex justify-center gap-3">
                        <button
                            onClick={() => setOpenModalEdit(false)}
                            className="block text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 my-4 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                            type="button"
                        >
                            Hủy
                        </button>
                        <button
                            className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 my-4 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                            type="submit"
                        >
                            Cập nhật
                        </button>
                    </div>
                </form>
            </FormEdit>

            {/* -------------------------------delete------------------------------- */}
            <ModalConfirmDelete
                open={isModalOpenDelete}
                onClose={handleCancelDelete}
                onClick={handleDeleteUser}
            >
                <div>Xác nhận xóa tài khoản người dùng?</div>
            </ModalConfirmDelete>
        </div>
    );
}
