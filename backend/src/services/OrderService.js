const Order = require("../models/OrderProduct");
const Product = require("../models/ProductModel");

const createOrder = (newOrder) => {
    return new Promise(async (resolve, reject) => {
        const {
            orderItems,
            paymentMethod,
            itemsPrice,
            shippingPrice,
            totalPrice,
            fullName,
            address,
            city,
            phone,
            user,
            status,
            isPaid,
        } = newOrder;
        try {
            const promises = orderItems.map(async (order) => {
                console.log("orderItems - ", orderItems);
                const productData = await Product.findOneAndUpdate(
                    {
                        _id: order.product,
                        countInStock: { $gte: order.amount },
                    },
                    {
                        $inc: {
                            countInStock: -order.amount,
                        },
                    },
                    { new: true }
                );
                if (productData) {
                    const createdOrder = await Order.create({
                        orderItems,
                        shippingAddress: {
                            fullName,
                            address,
                            phone,
                            city,
                        },
                        paymentMethod,
                        itemsPrice,
                        shippingPrice,
                        totalPrice,
                        user: user,
                        status: status || "Preparing",
                        isPaid,
                    });
                    if (createdOrder) {
                        return {
                            status: "OK",
                            message: "SUCCESS",
                            // data: createdOrder,
                        };
                    }
                } else {
                    return {
                        status: "OK",
                        message: "ERR",
                        id: order.product,
                    };
                }
            });
            const result = await Promise.all(promises);
            const newData = result && result.filter((item) => item.id);
            if (newData.length) {
                resolve({
                    status: "ERR",
                    message: `San pham voi id: ${newData.join(
                        ","
                    )} khong du hang`,
                });
            }
            resolve({
                status: "OK",
                message: "SUCCESS",
            });
            console.log(result);
        } catch (e) {
            reject(e);
        }
    });
};

const getDetailOrder = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const order = await Order.find({
                user: id,
            });

            if (order === null) {
                resolve({
                    status: "OkK",
                    message: "the order is not defined",
                });
            }

            resolve({
                status: "OK",
                message: "SUCCESS",
                data: order,
            });
        } catch (e) {
            reject(e);
        }
    });
};

// const cancelOrderDetails = (id, data) => {
//     return new Promise(async (resolve, reject) => {
//         try {
//             const promises = data.map(async (order) => {
//                 const productData = Product.findOneAndUpdate(
//                     {
//                         _id: order.product,
//                     },
//                     {
//                         $inc: {
//                             countInStock: +order.amount,
//                         },
//                     },
//                     { new: true }
//                 );
//                 const updatedOrder = await Order.findByIdAndUpdate(
//                     id,
//                     { status: "Cancelled" },
//                     { new: true }
//                 );
//                 if (productData) {
//                     const order = await Order.findByIdAndDelete(id);

//                     if (order === null) {
//                         resolve({
//                             status: "ERR",
//                             message: "The order is not defined",
//                         });
//                     }
//                 } else {
//                     return {
//                         status: "OK",
//                         message: "ERR",
//                         id: order.product,
//                     };
//                 }
//             });
//             const result = await Promise.all(promises);
//             const newData = result && result.filter((item) => item.id);
//             if (newData.length) {
//                 resolve({
//                     status: "ERR",
//                     message: `San pham voi id: ${newData.join(
//                         ","
//                     )} khong ton tai`,
//                 });
//             }
//             resolve({
//                 status: "OK",
//                 message: "SUCCESS",
//                 data: order,
//             });
//         } catch (e) {
//             reject(e);
//         }
//     });
// };

const cancelOrderDetails = async (id, data) => {
    try {
        const productUpdatePromises = data.map((orderItem) =>
            Product.findOneAndUpdate(
                { _id: orderItem.product },
                { $inc: { countInStock: +orderItem.amount } },
                { new: true }
            )
        );

        const updatedOrder = await Order.findByIdAndUpdate(
            id,
            { status: "Cancelled" },
            { new: true }
        );

        if (!updatedOrder) {
            return {
                status: "ERR",
                message: "Order not found",
            };
        }

        // Đợi tất cả các cập nhật sản phẩm hoàn tất
        await Promise.all(productUpdatePromises);

        return {
            status: "OK",
            message: "Order successfully cancelled",
            data: updatedOrder,
        };
    } catch (e) {
        throw new Error(`Failed to cancel order: ${e.message}`);
    }
};

const getAllOrder = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const allOrder = await Order.find();

            resolve({
                status: "OK",
                message: "GET ALL ORDER SUCCESS",
                data: allOrder,
            });
        } catch (e) {
            reject(e);
        }
    });
};

module.exports = {
    createOrder,
    getDetailOrder,
    cancelOrderDetails,
    getAllOrder,
};
