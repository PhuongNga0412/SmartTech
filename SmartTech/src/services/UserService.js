import axios from "axios";

export const axiosJWT = axios.create();

export const loginUser = async (data) => {
    const res = await axios.post(
        `${import.meta.env.VITE_API_URL_BACKEND}/user/sign-in`,
        data
    );
    return res.data;
};

export const signupUser = async (data) => {
    const res = await axios.post(
        `${import.meta.env.VITE_API_URL_BACKEND}/user/sign-up`,
        data
    );
    console.log(data);
    return res.data;
};

export const getDetailsUser = async (id, access_token) => {
    const res = await axiosJWT.get(
        `${import.meta.env.VITE_API_URL_BACKEND}/user/get-details/${id}`,
        {
            headers: {
                token: `Bearer ${access_token}`,
            },
        }
    );
    return res.data;
};

// export const getAllUser = async (access_token) => {
//     const res = await axiosJWT.get(
//         `${import.meta.env.VITE_API_URL_BACKEND}/user/getAll`,
//         {
//             headers: {
//                 token: `Bearer ${access_token}`,
//             },
//         }
//     );
//     return res.data;
// };

export const getAllUser = async (limit, page) => {
    const res = await axios.get(
        `${
            import.meta.env.VITE_API_URL_BACKEND
        }/user/getAll?limit=${limit}&page=${page}`
    );

    return res.data;
};

export const refreshToken = async () => {
    const res = await axios.post(
        `${import.meta.env.VITE_API_URL_BACKEND}/user/refresh-token`,
        {
            withCredentials: true,
        }
    );
    return res.data;
};

export const logoutUser = async () => {
    const res = await axios.post(
        `${import.meta.env.VITE_API_URL_BACKEND}/user/log-out`
    );
    return res.data;
};

export const updateUser = async (id, access_token, data) => {
    const res = await axiosJWT.put(
        `${import.meta.env.VITE_API_URL_BACKEND}/user/update-user/${id}`,
        data,
        {
            headers: {
                token: `Bearer ${access_token}`,
            },
        }
    );
    return res.data;
};

export const deleteUser = async (id, access_token, data) => {
    const res = await axiosJWT.delete(
        `${import.meta.env.VITE_API_URL_BACKEND}/user/delete-user/${id}`,
        data,
        {
            headers: {
                token: `Bearer ${access_token}`,
            },
        }
    );
    return res.data;
};
