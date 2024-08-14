import { store } from "@/redux/store";
import axios from "axios";

export const fetchApi = async () => {
    const res = await axios.get(
        `${import.meta.env.VITE_API_URL_BACKEND}/product/get-all`
    );
    return res.data;
};

export const getUserAdminStatus = () => {
    const state = store.getState();
    console.log(state.user.isAdmin);
    return state.user.isAdmin;
};
