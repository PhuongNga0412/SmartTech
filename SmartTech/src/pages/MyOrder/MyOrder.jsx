import { useQuery } from "@tanstack/react-query";
import * as OrderService from "@/services/OrderService";
import { Loading } from "@/components/LoadingComponent/Loading";
import { Link, useLocation } from "react-router-dom";
import { convertPrice } from "@/utils";
import { useMutationHooks } from "@/hook/useMutationHooks";

const MyOrder = () => {
    const location = useLocation();
    const { state } = location;

    const fetchMyOrder = async () => {
        const res = await OrderService.getOrderbyUserId(
            state?.id,
            state?.token
        );
        return res.data;
    };

    const queryOrder = useQuery({
        queryKey: ["orders"],
        queryFn: fetchMyOrder,
        enabled: !!state?.id && !!state?.token,
    });
    const { isLoading, data } = queryOrder;

    const mutation = useMutationHooks((data) => {
        const { id, token, orderItems } = data;
        const res = OrderService.cancelOrder(id, token, orderItems);
        return res;
    });

    const handleCancelOrder = (order) => {
        mutation.mutate(
            {
                id: order?._id,
                token: state?.token,
                orderItems: order?.orderItems,
            },
            {
                onSuccess: () => {
                    queryOrder.refetch();
                },
            }
        );
    };

    const canCancelOrder = (status) => {
        return status === "Preparing";
    };

    const getStatusColor = (status) => {
        switch (status) {
            case "Preparing":
                return "text-yellow-500";
            case "Shipped":
                return "text-blue-500";
            case "Completed":
                return "text-green-500";
            case "Cancelled":
                return "text-red-500";
            default:
                return "text-gray-500";
        }
    };
    return (
        <div>
            <div className="uppercase font-bold mt-20 mb-6 text-sm">
                <Link
                    to="/"
                    className="text-gray-500 hover:text-black hover:underline"
                >
                    trang chủ
                </Link>{" "}
                / <span className="text-gray-700">đơn hàng của tôi</span>
            </div>
            <Loading isLoading={isLoading}>
                <div className="flex flex-col gap-6">
                    {data
                        ?.sort(
                            (a, b) =>
                                new Date(b.createdAt) - new Date(a.createdAt)
                        )
                        .map((order) => (
                            <div
                                key={order._id}
                                className="p-6 bg-white rounded-lg shadow-md"
                            >
                                <div className="flex justify-between items-center border-b pb-4">
                                    <div>
                                        <h2 className="text-xl font-bold">
                                            Mã vận đơn:{" "}
                                            <span className="text-blue-500">
                                                #{order?._id}
                                            </span>{" "}
                                            <span
                                                className={getStatusColor(
                                                    order.status
                                                )}
                                            >
                                                {order.status}
                                            </span>
                                        </h2>
                                        <p className="text-gray-500">
                                            Ngày tạo:{" "}
                                            <span className="text-black">
                                                {new Date(
                                                    order.createdAt
                                                ).toLocaleDateString("vi-VN", {
                                                    day: "numeric",
                                                    month: "short",
                                                    year: "numeric",
                                                })}{" "}
                                            </span>
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xl font-bold">
                                            {convertPrice(order?.totalPrice)}
                                        </p>
                                        <p className="text-gray-500">
                                           Tổng
                                        </p>
                                    </div>
                                </div>

                                <table className="w-full mt-4">
                                    <thead>
                                        <tr className="text-left text-gray-500">
                                            <th className="pb-2">Sản phẩm</th>
                                            <th className="pb-2">
                                                Phương thức vận chuyển
                                            </th>
                                            <th className="pb-2">Đơn giá</th>
                                            <th className="pb-2">Số lượng</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-gray-700">
                                        {order?.orderItems?.map((item) => (
                                            <tr
                                                key={item.product}
                                                className="border-b"
                                            >
                                                <td className="py-2 flex items-center">
                                                    <img
                                                        src={item?.image?.[1]}
                                                        alt="HDI Adapter Cable"
                                                        className="w-12 h-12 mr-4"
                                                    />
                                                    <span>{item?.name}</span>
                                                </td>
                                                <td className="py-2">Fast</td>
                                                <td className="py-2">
                                                    {item?.price.toLocaleString()}
                                                </td>
                                                <td className="py-2">
                                                    {item?.amount}
                                                </td>
                                            </tr>
                                        ))}
                                        <tr>
                                            <td
                                                colSpan="4"
                                                className="py-4 text-right"
                                            >
                                                {order.status ===
                                                "Cancelled" ? (
                                                    <button
                                                        disabled
                                                        className="bg-gray-500 text-white font-medium py-4 px-4 rounded"
                                                    >
                                                        Đã Hủy
                                                    </button>
                                                ) : canCancelOrder(
                                                      order.status
                                                  ) ? (
                                                    <button
                                                        onClick={() =>
                                                            handleCancelOrder(
                                                                order
                                                            )
                                                        }
                                                        className="bg-red-500 text-white font-medium py-4 px-4 rounded hover:bg-red-600"
                                                    >
                                                        Hủy đơn hàng
                                                    </button>
                                                ) : null}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        ))}
                </div>
            </Loading>
        </div>
    );
};
export default MyOrder;
