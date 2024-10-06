import axios from "axios";

export const addToWishlist = async (userId, productId) => {
    try {
        const response = await axios.post(
            `${import.meta.env.VITE_API_URL_BACKEND}/wishlist/add`,
            {
                userId,
                productId,
            }
        );
        return response.data;
    } catch (error) {
        console.error("Error adding to wishlist:", error);
        throw error;
    }
};

export const getWishlist = async (userId) => {
    try {
        const response = await axios.get(
            `${import.meta.env.VITE_API_URL_BACKEND}/wishlist`,
            {
                params: { userId },
            }
        );
        return response.data;
    } catch (error) {
        console.error("Error fetching wishlist:", error);
        throw error;
    }
};

export const removeFromWishlist = async (userId, productId, access_token) => {
    const res = await axios.delete(
        `${import.meta.env.VITE_API_URL_BACKEND}/wishlist/remove`,
        {
            headers: {
                token: `Bearer ${access_token}`,
            },
            data: { userId, productId },
        }
    );
    return res.data;
};
