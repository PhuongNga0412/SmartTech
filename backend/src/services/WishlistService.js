const Wishlist = require("../models/WishlistModel");

const addToWishlist = async (userId, productId) => {
    try {
        if (!userId || !productId) {
            throw new Error("User ID and Product ID are required");
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
        return {
            status: "OK",
            message: "SUCCESS",
            data: wishlist,
        };
    } catch (e) {
        console.error("Error in addToWishlist:", e);
        throw e;
    }
};

const getWishlist = async (userId) => {
    try {
        if (!userId) {
            throw new Error("User ID is required");
        }

        const wishlist = await Wishlist.findOne({ user: userId }).populate(
            "products"
        );
        if (!wishlist) {
            return { status: "FAIL", message: "Wishlist not found" };
        }

        return { status: "OK", message: "SUCCESS", data: wishlist };
    } catch (e) {
        console.error("Error in getWishlist:", e);
        throw e;
    }
};

const removeProductFromWishlist = async (userId, productId) => {
    try {
        const wishlist = await Wishlist.findOne({ user: userId });

        const result = await Wishlist.findOneAndUpdate(
            { user: userId },
            { $pull: { products: productId } },
            { new: true }
        );

        console.log("Kết quả sau khi cập nhật:", result);
        return result;
    } catch (error) {
        throw new Error("Có lỗi xảy ra khi xóa sản phẩm khỏi wishlist.");
    }
};

module.exports = { addToWishlist, getWishlist, removeProductFromWishlist };
