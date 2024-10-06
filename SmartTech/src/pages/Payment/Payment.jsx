import {
    Dialog,
    DialogBackdrop,
    DialogPanel,
    DialogTitle,
} from "@headlessui/react";

import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createElement, useEffect, useMemo, useState } from "react";
import InputComponent from "@/components/InputComponent/InputComponent";
import { useMutationHooks } from "@/hook/useMutationHooks";
import * as UserService from "@/services/UserService";
import * as OrderService from "@/services/OrderService";
import * as PaymentService from "@/services/PaymentService";
import { updateUser } from "@/redux/slides/userSlide";
import { Loading } from "@/components/LoadingComponent/Loading";
import { removeAllOrderProduct } from "@/redux/slides/orderSlide";
import { PayPalButton } from "react-paypal-button-v2";
import { CheckIcon } from "@heroicons/react/24/outline";

const Payment = () => {
    const navigate = useNavigate();
    const order = useSelector((state) => state.order);
    const user = useSelector((state) => state.user);

    const [delivery, setDelivery] = useState("fast");
    const [payment, setPayment] = useState("later_money");
    const [sdk, setSdk] = useState(false);
    const [openOrderSuccess, setOpenOrderSuccess] = useState(false);

    const [open, setOpen] = useState(false);
    const [stateUserDetails, setStateUserDetails] = useState({
        name: "",
        phone: "",
        address: "",
        city: "",
    });

    const dispatch = useDispatch();

    // useEffect(() => {
    //     setFieldsValue(stateUserDetails);
    // }, [stateUserDetails]);

    useEffect(() => {
        if (open) {
            setStateUserDetails({
                city: user?.city,
                name: user?.name,
                address: user?.address,
                phone: user?.phone,
            });
        }
    }, [open]);

    const handleChangeAddress = () => {
        setOpen(true);
    };

    const priceMemo = useMemo(() => {
        const result = order?.orderItemsSelected?.reduce((total, cur) => {
            return total + cur.price * cur.amount;
        }, 0);
        return result;
    }, [order]);

    const priceDiscountMemo = useMemo(() => {
        const result = order?.orderItemsSelected?.reduce((total, cur) => {
            return total + cur.discount * cur.amount;
        }, 0);
        if (Number(result)) {
            return result;
        }
        return 0;
    }, [order]);

    const deliveryPriceMemo = useMemo(() => {
        if (priceMemo > 200000) {
            return 10000;
        } else if (priceMemo === 0) {
            return 0;
        } else {
            return 20000;
        }
    }, [priceMemo]);

    const totalPriceMemo = useMemo(() => {
        return (
            Number(priceMemo) -
            Number(priceDiscountMemo) +
            Number(deliveryPriceMemo)
        );
    }, [priceMemo, priceDiscountMemo, deliveryPriceMemo]);

    const mutationAddOrder = useMutationHooks((data) => {
        const { token, ...rests } = data;
        const res = OrderService.createOrder({ ...rests }, token);
        console.log(data);
        return res;
    });

    const handleAddOrder = () => {
        if (
            user?.access_token &&
            order?.orderItemsSelected &&
            user?.name &&
            user?.address &&
            user?.phone &&
            user?.city &&
            priceMemo &&
            user?.id
        ) {
            mutationAddOrder.mutate({
                token: user?.access_token,
                orderItems: order?.orderItemsSelected,
                fullName: user?.name,
                address: user?.address,
                phone: user?.phone,
                city: user?.city,
                paymentMethod: payment,
                itemsPrice: priceMemo,
                shippingPrice: deliveryPriceMemo,
                totalPrice: totalPriceMemo,
                user: user?.id,
                status: "Preparing",
                isPaid: false,
            });
        }
        setOpenOrderSuccess(true);
    };

    const mutationUpdate = useMutationHooks((data) => {
        const { id, token, ...rests } = data;
        UserService.updateUser(id, token, rests);
    });

    // const { isLoading, data } = mutationUpdate;
    const {
        data: dataAdd,
        isLoading: isLoadingAddOrder,
        isSuccess,
        isError,
    } = mutationAddOrder;

    useEffect(() => {
        if (isSuccess && dataAdd?.status === "OK") {
            const arrayOrdered = [];
            order?.orderItemsSelected?.forEach((element) => {
                arrayOrdered.push(element.product);
            });
            dispatch(removeAllOrderProduct({ listChecked: arrayOrdered }));
        } else if (isError) {
            toast.error();
        }
    }, [isSuccess, isError]);

    const handleCancelUpdate = () => {
        setStateUserDetails({
            name: "",
            email: "",
            phone: "",
            isAdmin: false,
        });

        setOpen(false);
    };
    const handleUpdateUser = (e) => {
        e.preventDefault();
        const { name, address, city, phone } = stateUserDetails;
        console.log(stateUserDetails);
        if (name && address && city && phone) {
            mutationUpdate.mutate(
                {
                    id: user?.id,
                    ...stateUserDetails,
                    token: user?.access_token,
                },
                {
                    onSuccess: () => {
                        dispatch(updateUser({ name, address, city, phone }));
                        setOpen(false);
                    },
                }
            );
        }
    };

    const handleOnChange = (e) => {
        setStateUserDetails({
            ...stateUserDetails,
            [e.target.name]: e.target.value,
        });
    };
    const handleDelivery = (e) => {
        setDelivery(e.target.value);
    };

    const onSuccessPaypal = () => {
        mutationAddOrder.mutate({
            token: user?.access_token,
            orderItems: order?.orderItemsSelected,
            fullName: user?.name,
            address: user?.address,
            phone: user?.phone,
            city: user?.city,
            paymentMethod: payment,
            itemsPrice: priceMemo,
            shippingPrice: deliveryPriceMemo,
            totalPrice: totalPriceMemo,
            user: user?.id,
            status: "Preparing",
            isPaid: true,
        });
        setOpenOrderSuccess(true);
    };

    const handlePayment = (e) => {
        setPayment(e.target.value);
    };

    const addPaypal = async () => {
        const { data } = await PaymentService.getConfig();
        const script = document.createElement("script");
        script.type = "text/javascript";
        script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
        script.async = true;
        script.onload = () => {
            setSdk(true);
        };
        document.body.appendChild(script);
    };

    useEffect(() => {
        if (!window.paypal) {
            addPaypal();
        } else {
            setSdk(true);
        }
    }, []);

    return (
        <div className="mt-[80px]">
            {/* Breadcrumb */}
            <div className="uppercase font-bold mb-6 text-sm">
                <Link
                    to="/"
                    className="text-gray-500 hover:text-black hover:underline"
                >
                    trang chủ
                </Link>{" "}
                / <span className="text-gray-700">thanh toán</span>
            </div>

            {/* Cart Table */}
            <Loading isLoading={isLoadingAddOrder}>
                <div className="lg:flex lg:gap-20">
                    <div className="lg:flex-1 overflow-x-auto mb-6">
                        <table className="min-w-full bg-white border rounded-lg">
                            <thead>
                                <tr className="w-full bg-gray-100 border-b">
                                    <th className="p-4 text-left">Sản phẩm</th>
                                    <th className="p-4 text-left">Đơn giá</th>
                                    <th className="p-4 text-center">
                                        Số lượng
                                    </th>
                                    <th className="p-4 text-left">Tạm tính</th>
                                </tr>
                            </thead>
                            <tbody>
                                {order?.orderItemsSelected?.map((order) => (
                                    <tr
                                        key={order.product}
                                        className="border-b"
                                    >
                                        <td className="p-4 flex items-center">
                                            <img
                                                src={order?.image?.[1]}
                                                alt="LCD Monitor"
                                                className="w-12 h-12 mr-4"
                                            />
                                            {order?.name}
                                        </td>
                                        <td className="p-4">
                                            {order?.price.toLocaleString()}
                                        </td>
                                        <td className="p-4 text-center">
                                            {order?.amount}
                                        </td>

                                        <td className="p-4">
                                            {(
                                                order?.price * order?.amount
                                            ).toLocaleString()}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Coupon and Cart Total */}
                    <div className="flex-1">
                        {/* Cart Total */}
                        <div className="">
                            <div className="flex justify-between mb-2 border-b pb-4">
                                <div className="flex gap-2 ">
                                    <p>Địa chỉ: </p>
                                    <p className="font-bold">{`${user?.address}, ${user?.city}`}</p>
                                </div>
                                <div>
                                    <button
                                        onClick={handleChangeAddress}
                                        className="font-bold text-red-500"
                                    >
                                        Thay đổi
                                    </button>
                                </div>
                            </div>

                            <div className="flex justify-between mb-4 ">
                                <span>Tạm tính:</span>
                                <span>{priceMemo.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between mb-4">
                                <span>Phí vận chuyển:</span>
                                <span>
                                    {deliveryPriceMemo.toLocaleString()}
                                </span>
                            </div>
                            <div className="flex justify-between mb-8">
                                <span>Tổng:</span>
                                <span>{totalPriceMemo.toLocaleString()}</span>
                            </div>

                            <div className="mb-8">
                                <div>
                                    <input
                                        type="radio"
                                        id="payment_method"
                                        value="later_money"
                                        checked={payment === "later_money"}
                                        onChange={handlePayment}
                                    />
                                    <label
                                        htmlFor="payment_method"
                                        className="!text-base !text-black ml-4"
                                    >
                                        Thanh toán khi nhận hàng
                                    </label>
                                </div>
                                <div>
                                    <input
                                        type="radio"
                                        id="payment_paypal"
                                        value="paypal"
                                        checked={payment === "paypal"}
                                        onChange={handlePayment}
                                    />
                                    <label
                                        htmlFor="payment_momo"
                                        className="!text-base !text-black ml-4"
                                    >
                                        Thanh toán bằng Paypal
                                    </label>
                                </div>
                            </div>

                            <div className="mb-8">
                                <div className="">
                                    <input
                                        type="radio"
                                        id="fast"
                                        value="fast"
                                        checked={delivery === "fast"}
                                        onChange={handleDelivery}
                                    />
                                    <label
                                        htmlFor="fast"
                                        className="!text-base !text-black ml-4"
                                    >
                                        Fast
                                    </label>
                                </div>
                                {/* <div>
                                    <input
                                        type="radio"
                                        id="gojek"
                                        value="gojek"
                                        checked={delivery === "gojek"}
                                        onChange={handleDelivery}
                                    />
                                    <label
                                        htmlFor="gojek"
                                        className="!text-base !text-black ml-4"
                                    >
                                        Gojek
                                    </label>
                                </div> */}
                            </div>

                            <div className="flex gap-4 mb-8">
                                <input
                                    type="text"
                                    placeholder="Coupon Code"
                                    className="py-4 px-6 rounded border-gray-300 s"
                                />
                                <button className="bg-red-500 text-white font-medium px-12 py-4 rounded">
                                    Apply Coupon
                                </button>
                            </div>

                            {payment === "paypal" && sdk ? (
                                <PayPalButton
                                    amount={totalPriceMemo}
                                    // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
                                    onSuccess={onSuccessPaypal}
                                    onError={() => {
                                        alert("Fail");
                                    }}
                                />
                            ) : (
                                <button
                                    onClick={handleAddOrder}
                                    className="bg-red-500 text-white font-medium w-full py-4 rounded"
                                >
                                    Đặt Hàng
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </Loading>

            <Dialog open={open} onClose={setOpen} className="relative z-30">
                <DialogBackdrop
                    transition
                    className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
                />

                <div className="fixed inset-0 z-30 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <DialogPanel
                            transition
                            className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg sm:p-6 data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
                        >
                            <div>
                                <div className="mt-3 sm:mt-5">
                                    <DialogTitle
                                        as="h3"
                                        className="uppercase text-center text-2xl font-semibold mb-5 leading-6 text-gray-900"
                                    >
                                        Cập nhật thông tin giao hàng
                                    </DialogTitle>
                                    <div className="mt-2">
                                        <form
                                            onSubmit={handleUpdateUser}
                                            // className="container bg-white w-full h-[80%] max-w-lg mx-auto rounded-lg shadow py-6 px-8 relative overflow-auto"
                                        >
                                            <div className="flex flex-wrap -mx-3 mb-6">
                                                <div className="relative w-full px-3">
                                                    <label
                                                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                                        htmlFor="grid-password"
                                                    >
                                                        Full Name
                                                    </label>
                                                    <InputComponent
                                                        value={
                                                            stateUserDetails.name
                                                        }
                                                        onChange={
                                                            handleOnChange
                                                        }
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
                                                        Phone
                                                    </label>
                                                    <InputComponent
                                                        value={
                                                            stateUserDetails.phone
                                                        }
                                                        onChange={
                                                            handleOnChange
                                                        }
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
                                                        Address
                                                    </label>
                                                    <InputComponent
                                                        value={
                                                            stateUserDetails.address
                                                        }
                                                        onChange={
                                                            handleOnChange
                                                        }
                                                        name="address"
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
                                                        City
                                                    </label>
                                                    <InputComponent
                                                        value={
                                                            stateUserDetails.city
                                                        }
                                                        onChange={
                                                            handleOnChange
                                                        }
                                                        name="city"
                                                    />
                                                    {/* <p className="italic text-red-500 text-xs absolute -bottom-5">
                            {message.address}
                        </p> */}
                                                </div>
                                            </div>

                                            <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                                                <button
                                                    type="submit"
                                                    className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2"
                                                >
                                                    Cập nhật
                                                </button>
                                                <button
                                                    type="button"
                                                    data-autofocus
                                                    onClick={handleCancelUpdate}
                                                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                                                >
                                                    Hủy
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>

            <Dialog
                open={openOrderSuccess}
                onClose={setOpenOrderSuccess}
                className="relative z-40"
            >
                <DialogBackdrop
                    transition
                    className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
                />

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <DialogPanel
                            transition
                            className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-sm sm:p-6 data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
                        >
                            <div>
                                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                                    <CheckIcon
                                        aria-hidden="true"
                                        className="h-6 w-6 text-green-600"
                                    />
                                </div>
                                <div className="mt-3 text-center sm:mt-5">
                                    <DialogTitle
                                        as="h3"
                                        className="text-base font-semibold leading-6 text-gray-900"
                                    >
                                        Đặt hàng thành công
                                    </DialogTitle>
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-500">
                                            Cảm ơn bạn đã tin tưởng và lựa chọn
                                            sản phẩm của chúng tôi.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-5 sm:mt-6">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setOpenOrderSuccess(false);
                                        navigate("/my-order", {
                                            state: {
                                                id: user?.id,
                                                token: user?.access_token,
                                            },
                                        });
                                    }}
                                    className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Đơn hàng của tôi
                                </button>
                            </div>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
        </div>
    );
};
export default Payment;
