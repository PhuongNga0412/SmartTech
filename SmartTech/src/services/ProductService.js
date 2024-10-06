import { axiosJWT } from "@/services/UserService";
import axios from "axios";

export const getAllProduct = async (search, limit, page, checked, sort) => {
    let res = {};
    const filters = [];

    // Thêm bộ lọc theo tên sản phẩm nếu có từ khóa tìm kiếm
    if (search && search.length > 0) {
        filters.push(`filter=name,${search}`);
    }

    // Thêm bộ lọc cho các danh mục đã chọn
    if (checked && checked.length > 0) {
        checked.forEach((filter) => {
            if (filter && filter.length > 0) {
                filters.push(`${filter}`);
            }
        });
    }

    // Tạo query string
    const queryString =
        filters.length > 0
            ? `?${filters.join("&")}&limit=${limit}&page=${page}&sort=${sort}`
            : `?limit=${limit}&page=${page}&sort=${sort}`;

    // Gửi request đến API
    res = await axios.get(
        `${import.meta.env.VITE_API_URL_BACKEND}/product/get-all${queryString}`
    );

    return res.data;
};

export const getProductType = async (type, search, limit, page) => {
    if (type) {
        let res = {};
        if (search && search?.length > 0) {
            res = await axios.get(
                `${
                    import.meta.env.VITE_API_URL_BACKEND
                }/product/get-all?filter=type,${type}&filter=name&filter=${search}&limit=${limit}&page=${page}`
            );
        } else {
            res = await axios.get(
                `${
                    import.meta.env.VITE_API_URL_BACKEND
                }/product/get-all?filter=type,${type}&limit=${limit}&page=${page}`
            );
        }
        return res.data;
    }
};

// export const getProductType = async (type) => {
//     if (type) {
//         const res = await axios.get(
//             `${
//                 import.meta.env.VITE_API_URL_BACKEND
//             }/product/get-all?filter=type&filter=${type}`
//         );
//         return res.data;
//     }
// };

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

// export const addToWishlist = async (userId, productId, token) => {
//     const res = await axios.post(
//         `${import.meta.env.VITE_API_URL_BACKEND}/wishlist/add`,
//         { userId, productId },
//         {
//             headers: {
//                 token: `Bearer ${token}`,
//             },
//         }
//     );

//     return res;
// };

export const addToWishlist = async (product, access_token) => {
    const res = await axiosJWT.post(
        `${import.meta.env.VITE_API_URL_BACKEND}/wishlist/add`,
        product,
        {
            headers: {
                token: `Bearer ${access_token}`,
            },
        }
    );
    return res.data;
};
