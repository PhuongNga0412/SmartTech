const Wishlist = require("../models/WishlistModel");
const WishlistService = require("../services/WishlistService");

const addToWishlist = async (req, res) => {
    try {
        const { userId, productId } = req.body;

        if (!userId || !productId) {
            return res
                .status(400)
                .json({ message: "User ID and Product ID are required" });
        }

        let wishlist = await Wishlist.findOne({ user: userId });

        if (!wishlist) {
            wishlist = new Wishlist({ user: userId, products: [productId] });
        } else {
            if (!wishlist.products.includes(productId)) {
                wishlist.products.push(productId);
            }
        }

        await wishlist.save();
        res.status(200).json({ message: "Product added to wishlist" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getWishlist = async (req, res) => {
    try {
        const { userId } = req.query;

        if (!userId) {
            return res.status(400).json({ message: "User ID is required" });
        }

        const wishlist = await Wishlist.findOne({ user: userId }).populate(
            "products"
        );

        if (!wishlist) {
            return res.status(404).json({ message: "Wishlist not found" });
        }

        res.status(200).json(wishlist);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const removeProductFromWishlist = async (req, res) => {
    const { userId, productId } = req.body;

    try {
        const result = await WishlistService.removeProductFromWishlist(
            userId,
            productId
        );

        if (!result) {
            return res
                .status(404)
                .json({ message: "Wishlist không tìm thấy." });
        }

        res.status(200).json({
            message: "Sản phẩm đã được xóa khỏi wishlist.",
            result,
        });
    } catch (error) {
        res.status(500).json({
            message: "Có lỗi xảy ra khi xóa sản phẩm khỏi wishlist.",
            error,
        });
    }
};

module.exports = { addToWishlist, getWishlist, removeProductFromWishlist };
