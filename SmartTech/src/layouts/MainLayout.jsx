import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { isJsonString } from "@/utils";
// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
// import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import * as UserService from "@/services/UserService";
import { useDispatch } from "react-redux";
import { updateUser } from "@/redux/slides/userSlide";

const MainLayout = () => {
    const dispatch = useDispatch();
    // useEffect(() => {
    //     fetchApi();
    // }, []);
    // const fetchApi = async () => {
    //     const res = await axios.get(
    //         `${import.meta.env.VITE_API_URL_BACKEND}/product/get-all`
    //     );
    //     return res.data;
    // };

    // const query = useQuery({ queryKey: ["todos"], queryFn: fetchApi });

    useEffect(() => {
        const { storageData, decoded } = handleDecoded();
        if (decoded?.id) {
            handleGetDetailsUser(decoded?.id, storageData);
        }
    }, []);

    const handleDecoded = () => {
        let storageData = localStorage.getItem("access_token");
        let decoded = {};
        if (storageData && isJsonString(storageData)) {
            storageData = JSON.parse(storageData);
            decoded = jwtDecode(storageData);
        }
        return { decoded, storageData };
    };

    UserService.axiosJWT.interceptors.request.use(
        async (config) => {
            const currentTime = new Date();
            const { decoded } = handleDecoded();
            if (decoded?.exp < currentTime.getTime() / 1000) {
                const data = await UserService.refreshToken();
                config.headers["token"] = `Bearer ${data?.access_token}`;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    const handleGetDetailsUser = async (id, token) => {
        const res = await UserService.getDetailsUser(id, token);
        dispatch(updateUser({ ...res?.data, access_token: token }));
        console.log("res - ", res);
    };

    return (
        <div>
            <Header />
            <div className="container mx-auto max-w-[1170px] mb-[140px]">
                <Outlet />
            </div>
            <Footer />
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                // transition: Bounce,
            />

            <ToastContainer />
        </div>
    );
};
export default MainLayout;
