import { axiosJWT } from "@/services/UserService";

export const createOrder = async (data, access_token) => {
    console.log("day", { data, access_token });
    const res = await axiosJWT.post(
        `${import.meta.env.VITE_API_URL_BACKEND}/order/create`,
        data,
        {
            headers: {
                token: `Bearer ${access_token}`,
            },
        }
    );
    return res.data;
};

export const getOrderbyUserId = async (id, access_token) => {
    const res = await axiosJWT.get(
        `${import.meta.env.VITE_API_URL_BACKEND}/order/get-order/${id}`,
        {
            headers: {
                token: `Bearer ${access_token}`,
            },
        }
    );
    return res.data;
};

export const cancelOrder = async (id, access_token, orderItems) => {
    const res = await axiosJWT.delete(
        `${import.meta.env.VITE_API_URL_BACKEND}/order/cancel-order/${id}`,
        { data: orderItems },
        {
            headers: {
                token: `Bearer ${access_token}`,
            },
        }
    );
    return res.data;
};

export const getAllOrder = async (access_token) => {
    const res = await axiosJWT.get(
        `${import.meta.env.VITE_API_URL_BACKEND}/order/get-all-order`,
        {
            headers: {
                token: `Bearer ${access_token}`,
            },
        }
    );
    return res.data;
};

export const updateOrderStatus = async (id, status, access_token) => {
    const res = await axiosJWT.put(
        `${import.meta.env.VITE_API_URL_BACKEND}/order/status`,
        { id, status },
        {
            headers: {
                token: `Bearer ${access_token}`,
            },
        }
    );
    return res.data;
};
