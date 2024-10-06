const OrderService = require("../services/OrderService");
const Order = require("../models/OrderProduct");

const createOrder = async (req, res) => {
    try {
        const {
            paymentMethod,
            itemsPrice,
            shippingPrice,
            totalPrice,
            fullName,
            address,
            city,
            phone,
            status,
            isPaid,
        } = req.body;
        if (
            !paymentMethod ||
            !itemsPrice ||
            !shippingPrice ||
            !totalPrice ||
            !fullName ||
            !address ||
            !city ||
            !phone
        ) {
            return res.status(200).json({
                status: "ERR",
                message: "The input is required",
            });
        }
        const response = await OrderService.createOrder(req.body);
        return res.status(200).json(response);
    } catch (e) {
        console.error(e);
        return res.status(404).json({
            message: e,
        });
    }
};

const getOrderDetails = async (req, res) => {
    try {
        const userId = req.params.id;
        if (!userId) {
            return res.status(200).json({
                status: "ERR",
                message: "The productId is required",
            });
        }

        const response = await OrderService.getDetailOrder(userId);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e,
        });
    }
};

const cancelOrderDetails = async (req, res) => {
    try {
        const orderId = req.params.id;
        const data = req.body;
        if (!orderId) {
            return res.status(200).json({
                status: "ERR",
                message: "The userId is required",
            });
        }
        const response = await OrderService.cancelOrderDetails(orderId, data);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: es,
        });
    }
};

const getAllOrder = async (req, res) => {
    try {
        const data = await OrderService.getAllOrder();
        return res.status(200).json(data);
    } catch (e) {
        return res.status(404).json({
            message: e,
        });
    }
};

const updateOrderStatus = async (req, res) => {
    try {
        const { id, status } = req.body;

        // Kiểm tra xem `id` và `status` có được cung cấp không
        if (!id || !status) {
            return res
                .status(400)
                .json({ message: "Order ID and status are required" });
        }

        // Kiểm tra xem `status` có hợp lệ không
        const validStatuses = [
            "Preparing",
            "Shipped",
            "Completed",
            "Cancelled",
        ];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ message: "Invalid status" });
        }

        // Tìm và cập nhật đơn hàng
        const order = await Order.findByIdAndUpdate(
            id,
            { status },
            { new: true } // Trả về tài liệu đã cập nhật
        );

        // Kiểm tra nếu không tìm thấy đơn hàng
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        return res.status(200).json(order);
    } catch (error) {
        console.error("Failed to update order status:", error);
        return res.status(500).json({
            message: "Failed to update order status",
            error: error.message,
        });
    }
};
module.exports = {
    createOrder,
    getOrderDetails,
    cancelOrderDetails,
    getAllOrder,
    updateOrderStatus,
};
