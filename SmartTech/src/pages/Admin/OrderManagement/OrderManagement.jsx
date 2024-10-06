import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";

import * as OrderService from "@/services/OrderService";
import { useMutationHooks } from "@/hook/useMutationHooks";

import { toast } from "react-toastify";

import { Loading } from "@/components/LoadingComponent/Loading";

import { orderContant } from "@/contant";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";

export default function OrderManagement() {
    const [openModal, setOpenModal] = useState(false);
    const [rowSelected, setRowSelected] = useState("");
    const [status, setStatus] = useState("");
    const [searchTerm, setSearchTerm] = useState("");

    const user = useSelector((state) => state?.user);

    const handleChangeStatus = (event) => {
        setStatus(event.target.value);
    };

    const onCloseModal = () => {
        setOpenModal(false);
    };

    const getAllOrder = async () => {
        const res = await OrderService.getAllOrder(user?.access_token);
        return res;
    };

    const queryOrder = useQuery({
        queryKey: ["orders"],
        queryFn: getAllOrder,
    });
    const { data: orders, isLoading } = queryOrder;

    const mutationUpdate = useMutationHooks((data) => {
        const { id, token, status } = data;
        return OrderService.updateOrderStatus(id, status, token);
    });

    const handleDetailOrder = (order) => {
        setRowSelected(order?._id);
        setStatus(order?.status);
        setOpenModal(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!rowSelected || !status) {
            console.error("Order ID and status are required");
            return;
        }

        mutationUpdate.mutate(
            {
                id: rowSelected,
                token: user?.access_token,
                status,
            },
            {
                onSettled: () => {
                    queryOrder.refetch();
                    setOpenModal(false);
                },
            }
        );
    };

    const getStatusColor = (status) => {
        switch (status) {
            case "Preparing":
                return "w-3 h-3 rounded-full bg-yellow-500";
            case "Shipped":
                return "w-3 h-3 rounded-full bg-blue-500";
            case "Completed":
                return "w-3 h-3 rounded-full bg-green-500";
            case "Cancelled":
                return "w-3 h-3 rounded-full bg-red-500";
            default:
                return "w-3 h-3 rounded-full bg-gray-500";
        }
    };

    const filteredOrders = orders?.data?.filter((item) =>
        item?.shippingAddress?.fullName
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase())
    );

    return (
        <div className="sm:px-6 lg:pr-[70px]">
            <div className="sm:flex sm:items-center">
                <div className=" flex justify-between items-center sm:flex-auto">
                    <h1 className="text-base font-semibold leading-6 text-gray-900">
                        ĐƠN HÀNG
                    </h1>
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)} // Cập nhật giá trị tìm kiếm
                        placeholder="Tìm kiếm theo tên khách hàng"
                        className="mt-2 p-2 border border-gray-300 rounded-md"
                    />
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
                                            Địa chỉ giao hàng
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                        >
                                            Trạng thái
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                        >
                                            Thanh toán
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                        >
                                            Hình thức thanh toán
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                        >
                                            Tổng tiền
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                    {filteredOrders
                                        ?.sort(
                                            (a, b) =>
                                                new Date(b.createdAt) -
                                                new Date(a.createdAt)
                                        )
                                        .map((item) => (
                                            <tr
                                                key={item._id}
                                                onClick={() =>
                                                    setRowSelected(item._id)
                                                }
                                            >
                                                <td className="py-5 pl-4 pr-3 text-sm sm:pl-0">
                                                    <div className="flex items-center">
                                                        <div className="font-medium text-gray-900">
                                                            {
                                                                item
                                                                    ?.shippingAddress
                                                                    ?.fullName
                                                            }
                                                        </div>
                                                        {/* <div className="mt-1 text-gray-500">
                                                        {item.type}
                                                    </div> */}
                                                    </div>
                                                </td>
                                                <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                                                    <div className="text-gray-900">
                                                        {
                                                            item
                                                                ?.shippingAddress
                                                                ?.phone
                                                        }
                                                    </div>
                                                </td>
                                                <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                                                    <div className="text-gray-900">
                                                        {
                                                            item
                                                                ?.shippingAddress
                                                                ?.address
                                                        }
                                                    </div>
                                                </td>
                                                <td className="flex items-center gap-2 whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                                                    <div
                                                        className={getStatusColor(
                                                            item?.status
                                                        )}
                                                    ></div>
                                                    <div className="text-gray-900">
                                                        {item?.status}
                                                    </div>
                                                </td>
                                                <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                                                    <div className="text-gray-900">
                                                        {item?.isPaid
                                                            ? "Đã thanh toán"
                                                            : "Chưa thanh toán"}
                                                    </div>
                                                </td>
                                                <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                                                    <div className="text-gray-900">
                                                        {
                                                            orderContant
                                                                .payment[
                                                                item
                                                                    ?.paymentMethod
                                                            ]
                                                        }
                                                    </div>
                                                </td>
                                                <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                                                    <div className="text-gray-900">
                                                        {item?.totalPrice.toLocaleString()}
                                                    </div>
                                                </td>

                                                <td className="relative whitespace-nowrap py-5 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                                                    <button
                                                        onClick={() =>
                                                            handleDetailOrder(
                                                                item
                                                            )
                                                        }
                                                        className="text-indigo-600 hover:text-indigo-900 mr-4"
                                                    >
                                                        Sửa
                                                    </button>
                                                    {/* <button
                                                    onClick={() =>
                                                        setIsModalOpenDelete(
                                                            true
                                                        )
                                                    }
                                                    className="text-red-600 hover:text-red-900"
                                                >
                                                    Delete
                                                </button> */}
                                                </td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </Loading>
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
                                <form onSubmit={handleSubmit}>
                                    <h3 className="uppercase text-2xl font-semibold py-4">
                                        trạng thái đơn hàng
                                    </h3>

                                    <div className="flex flex-wrap -mx-3 mb-6">
                                        <div className="relative w-full px-3">
                                            <label
                                                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                                htmlFor="grid-password"
                                            >
                                                trạng thái
                                            </label>
                                            <select
                                                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                id="department"
                                                value={status}
                                                onChange={handleChangeStatus}
                                            >
                                                <option value="Preparing">
                                                    Chuẩn bị
                                                </option>
                                                <option value="Shipped">
                                                    Giao hàng
                                                </option>
                                                <option value="Completed">
                                                    Hoàn thành
                                                </option>
                                                <option value="Cancelled">
                                                    Hủy
                                                </option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                                        <button
                                            type="submit"
                                            className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2"
                                        >
                                            Sửa
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
        </div>
    );
}
