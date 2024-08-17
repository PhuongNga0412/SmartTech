import { axiosJWT } from "@/services/UserService";
import axios from "axios";

export const getAllProduct = async (search, limit, page) => {
    let res = {};
    if (search && search?.length > 0) {
        res = await axios.get(
            `${
                import.meta.env.VITE_API_URL_BACKEND
            }/product/get-all?filter=name&filter=${search}&limit=${limit}&page=${page}`
        );
    } else {
        res = await axios.get(
            `${
                import.meta.env.VITE_API_URL_BACKEND
            }/product/get-all?limit=${limit}&page=${page}`
        );
    }
    return res.data;
};

export const getProductType = async (type) => {
    if (type) {
        const res = await axios.get(
            `${
                import.meta.env.VITE_API_URL_BACKEND
            }/product/get-all?filter=type&filter=${type}`
        );
        return res.data;
    }
};

export const createProduct = async (data) => {
    const res = await axios.post(
        `${import.meta.env.VITE_API_URL_BACKEND}/product/create`,
        data
    );
    return res.data;
};

export const getDetailsProduct = async (id) => {
    const res = await axios.get(
        `${import.meta.env.VITE_API_URL_BACKEND}/product/details/${id}`
    );
    return res.data;
};

export const updateProduct = async (id, access_token, data) => {
    const res = await axiosJWT.put(
        `${import.meta.env.VITE_API_URL_BACKEND}/product/update/${id}`,
        data,
        {
            headers: {
                token: `Bearer ${access_token}`,
            },
        }
    );
    return res.data;
};

export const deleteProduct = async (id, access_token) => {
    const res = await axiosJWT.delete(
        `${import.meta.env.VITE_API_URL_BACKEND}/product/delete/${id}`,
        {
            headers: {
                token: `Bearer ${access_token}`,
            },
        }
    );
    return res.data;
};

export const getAllTypeProduct = async () => {
    const res = await axios.get(
        `${import.meta.env.VITE_API_URL_BACKEND}/product/get-all-type`
    );
    return res.data;
};
