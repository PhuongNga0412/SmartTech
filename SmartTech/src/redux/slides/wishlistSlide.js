import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    wishlistItems: [], // Danh sách sản phẩm trong wishlist
    user: "", // Thông tin người dùng (nếu cần)
};

export const wishlistSlice = createSlice({
    name: "wishlist",
    initialState,
    reducers: {
        addWishlist: (state, action) => {
            const { product } = action.payload;
            const existingItem = state.wishlistItems.find(
                (item) => item._id === product._id
            );
            if (!existingItem) {
                state.wishlistItems.push(product);
            }
        },

        removeWishlistProduct: (state, action) => {
            const { productId } = action.payload;

            state.wishlistItems = state.wishlistItems.filter(
                (item) => item._id !== productId
            );
        },
    },
});

export const { addWishlist, removeWishlistProduct } = wishlistSlice.actions;

export default wishlistSlice.reducer;
