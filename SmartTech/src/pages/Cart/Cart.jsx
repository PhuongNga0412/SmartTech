import { IconMinus, IconPlus } from "@/icons";
import {
    Dialog,
    DialogBackdrop,
    DialogPanel,
    DialogTitle,
} from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/24/outline";
import {
    decreaseAmount,
    increaseAmount,
    removeAllOrderProduct,
    removeOrderProduct,
    selectedOrder,
} from "@/redux/slides/orderSlide";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { RiDeleteBinLine } from "react-icons/ri";
import { toast } from "react-toastify";
import { useEffect, useMemo, useState } from "react";
import InputComponent from "@/components/InputComponent/InputComponent";
import { useMutationHooks } from "@/hook/useMutationHooks";
import * as UserService from "@/services/UserService";
import * as ProductService from "@/services//ProductService";
import { updateUser } from "@/redux/slides/userSlide";

const Cart = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const order = useSelector((state) => state.order);
    const [listChecked, setListChecked] = useState([]);
    const [open, setOpen] = useState(false);

    const handleCancelUpdate = () => {
        setStateUserDetails({
            name: "",
            phone: "",
            address: "",
            city: "",
        });
        setOpen(false);
    };

    const [stateUserDetails, setStateUserDetails] = useState({
        name: "",
        phone: "",
        address: "",
        city: "",
    });

    const handleChangeCount = async (type, idProduct) => {
        // Gọi dịch vụ để lấy thông tin chi tiết sản phẩm
        const productDetails = await ProductService.getDetailsProduct(
            idProduct
        );

        // Lấy số lượng tồn kho từ thông tin chi tiết
        const availableStock = productDetails?.data?.countInStock;

        const currentProduct = order?.orderItems.find(
            (item) => item?.product === idProduct
        );

        if (type === "increase") {
            if (currentProduct.amount < availableStock) {
                dispatch(increaseAmount({ idProduct }));
            } else {
                alert(
                    "Số lượng sản phẩm đã đạt giới hạn tối đa có sẵn trong kho."
                );
            }
        } else if (type === "decrease") {
            dispatch(decreaseAmount({ idProduct }));
        }
    };

    const handleDeleteOrder = (idProduct) => {
        dispatch(removeOrderProduct({ idProduct }));
        toast.error("Delete Order");
    };

    const handleOnChangeCheckAll = (e) => {
        if (e.target.checked) {
            const newListChecked = [];
            order?.orderItems?.forEach((item) => {
                newListChecked.push(item?.product);
            });
            setListChecked(newListChecked);
        } else {
            setListChecked([]);
        }
    };

    const onChange = (e) => {
        if (listChecked.includes(e.target.value)) {
            const newListChecked = listChecked.filter(
                (item) => item !== e.target.value
            );
            setListChecked(newListChecked);
        } else {
            setListChecked([...listChecked, e.target.value]);
        }
    };

    const handleDeleteAllOrder = () => {
        if (listChecked?.length > 1) {
            dispatch(removeAllOrderProduct({ listChecked }));
        }
    };

    useEffect(() => {
        dispatch(selectedOrder({ listChecked }));
    }, [listChecked]);

    useEffect(() => {
        if (open) {
            setStateUserDetails({
                ...stateUserDetails,
                name: user?.name,
                phone: user?.phone,
                address: user?.address,
                city: user?.city,
            });
        }
    }, [open]);

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
        if (priceMemo >= 5000000) {
            return 0;
        } else {
            return 30000;
        }
    }, [priceMemo]);

    const totalPriceMemo = useMemo(() => {
        return (
            Number(priceMemo) -
            Number(priceDiscountMemo) +
            Number(deliveryPriceMemo)
        );
    }, [priceMemo, priceDiscountMemo, deliveryPriceMemo]);

    const handleOnChange = (e) => {
        setStateUserDetails({
            ...stateUserDetails,
            [e.target.name]: e.target.value,
        });
    };

    const handleAddCart = () => {
        if (!order?.orderItemsSelected?.length) {
            toast.warning("Vui lòng chọn sản phẩm");
        } else if (user?.access_token) {
            if (!user?.phone || !user?.address || !user?.name || !user?.city) {
                setOpen(true);
            } else {
                navigate("/payment");
            }
        } else {
            navigate("/login", { state: location?.pathname });
        }
    };

    const mutationUpdate = useMutationHooks((data) => {
        // const { id, token, ...rests } = data;
        // const res = UserService.updateUser(id, { ...rests }, token);
        const { id, token, ...rests } = data;
        UserService.updateUser(id, token, rests);
    });

    const handleUpdateUser = (e) => {
        e.preventDefault();
        const { name, phone, address, city } = stateUserDetails;
        if (name && phone && address && city) {
            mutationUpdate.mutate(
                {
                    id: user?.id,
                    token: user?.access_token,
                    ...stateUserDetails,
                },
                {
                    onSuccess: () => {
                        dispatch(updateUser({ name, phone, address, city }));
                        setOpen(false);
                    },
                }
            );
        }
    };

    const handleChangeAddress = () => {
        setOpen(true);
    };

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
                / <span className="text-gray-700">giỏ hàng</span>
            </div>

            {/* Cart Table */}
            <div className="overflow-x-auto">
                {order?.orderItems?.length > 0 ? (
                    <table className="min-w-full bg-white border rounded-lg">
                        <thead>
                            <tr className="w-full bg-gray-100 border-b">
                                <th className="p-4 text-left">
                                    <input
                                        onChange={handleOnChangeCheckAll}
                                        type="checkbox"
                                        checked={
                                            listChecked?.length ===
                                            order?.orderItems?.length
                                        }
                                    />
                                </th>
                                <th className="p-4 text-left">Sản phẩm</th>
                                <th className="p-4 text-left">Đơn giá</th>
                                <th className="p-4 text-center">Số lượng</th>
                                <th className="p-4 text-left">Tổng</th>
                                <th className="p-4 text-left text-2xl">
                                    <button
                                        className="pointer-cursor"
                                        onClick={handleDeleteAllOrder}
                                    >
                                        <RiDeleteBinLine />
                                    </button>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {order?.orderItems?.map((order, index) => (
                                <tr key={index} className="border-b">
                                    <td className="p-4">
                                        <input
                                            onChange={onChange}
                                            value={order?.product}
                                            type="checkbox"
                                            checked={listChecked.includes(
                                                order?.product
                                            )}
                                        />
                                    </td>
                                    <td className="p-4 flex items-center">
                                        <img
                                            src={order?.image?.[0]}
                                            alt="LCD Monitor"
                                            className="w-12 h-12 mr-4"
                                        />
                                        {order?.name}
                                    </td>
                                    <td className="p-4">
                                        {order?.price.toLocaleString()}
                                    </td>
                                    <td className="p-4">
                                        <div className="flex justify-center divide-x divide-gray-300 rounded-md border border-gray-300">
                                            <button
                                                onClick={() =>
                                                    handleChangeCount(
                                                        "decrease",
                                                        order?.product
                                                    )
                                                }
                                                className="flex-1  px-3 py-[10px] text-gray-600"
                                            >
                                                {IconMinus}
                                            </button>

                                            <input
                                                defaultValue={order?.amount}
                                                value={order?.amount}
                                                type="number"
                                                className="flex-1  custom-number-input text-center px-2 w-10 text-xl font-medium border-0 focus:outline-none focus:ring-0"
                                            />

                                            <button
                                                onClick={() =>
                                                    handleChangeCount(
                                                        "increase",
                                                        order?.product
                                                    )
                                                }
                                                className="flex-1 px-3 py-[10px] text-gray-600"
                                            >
                                                {IconPlus}
                                            </button>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        {(
                                            order?.price * order?.amount
                                        ).toLocaleString()}
                                    </td>
                                    <td className="p-4 text-2xl">
                                        <button
                                            className="pointer-cursor"
                                            onClick={() =>
                                                handleDeleteOrder(
                                                    order?.product
                                                )
                                            }
                                        >
                                            <RiDeleteBinLine />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p className="uppercase text-center font-bold text-3xl py-10 text-gray-600">
                        không có sản phẩm nào trong giỏ hàng
                    </p>
                )}
            </div>

            {/* Buttons */}
            <div className="flex justify-between mt-6">
                <Link
                    to="/product"
                    className="font-medium border border-gray-700 px-12 py-4 rounded"
                >
                    Quay lại
                </Link>
                {/* <button className="font-medium border border-gray-700 px-12 py-4 rounded">
                    Update Cart
                </button> */}
            </div>

            {/* Coupon and Cart Total */}
            <div className="flex flex-col lg:flex-row gap-6 lg:justify-between mt-8">
                {/* Coupon */}
                <div className="flex gap-4 items-start">
                    <input
                        type="text"
                        placeholder="Coupon Code"
                        className="py-4 pl-6 pr-40 border rounded"
                    />
                    <button className="bg-red-500 text-white font-medium rounded py-4 px-12">
                        Apply Coupon
                    </button>
                </div>

                {/* Cart Total */}
                <div className="min-w-[470px] px-6 py-8 border rounded-lg">
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
                    <h2 className="text-xl font-medium mb-6">
                        Đơn giá giỏ hàng
                    </h2>
                    <div className="flex justify-between mb-2 border-b pb-4">
                        <span>Tạm tính:</span>
                        <span>{priceMemo.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between mb-2 border-b pb-4">
                        <span>Giảm giá:</span>
                        <span>{priceDiscountMemo}%</span>
                    </div>
                    <div className="flex justify-between border-b pb-4">
                        <span>Phí vận chuyển:</span>
                        <span>{deliveryPriceMemo.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between mt-4">
                        <span>Tổng:</span>
                        <span>{totalPriceMemo.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-center">
                        <button
                            onClick={handleAddCart}
                            className="bg-red-500 text-white font-medium px-12 py-4 rounded mt-4"
                        >
                            Thanh Toán
                        </button>
                    </div>
                </div>
            </div>

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
                                                        Họ Tên
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
                                                        Số điện thoại
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
                                                        Địa chỉ
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
                                                        Thành phố
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
        </div>
    );
};
export default Cart;
