import axios from "axios";

export const axiosJWT = axios.create();

export const loginUser = async (data) => {
    const res = await axios.post(
        `${import.meta.env.VITE_API_URL_BACKEND}/user/sign-in`,
        data
    );
    console.log(data);
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
                token: `Beare ${access_token}`,
            },
        }
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

export const updateUser = async (id, data, access_token) => {
    const res = await axiosJWT.put(
        `${import.meta.env.VITE_API_URL_BACKEND}/user/update-user/${id}`,
        data,
        {
            headers: {
                token: `Beare ${access_token}`,
            },
        }
    );
    return res.data;
};
