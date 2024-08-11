import axios from "axios";

export const fetchApi = async () => {
    const res = await axios.get(
        `${import.meta.env.VITE_API_URL_BACKEND}/product/get-all`
    );
    return res.data;
};
