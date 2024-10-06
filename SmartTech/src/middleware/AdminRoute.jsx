import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as UserService from "@/services/UserService";
import { useEffect, useState } from "react";
import { isJsonString } from "@/utils";
import { jwtDecode } from "jwt-decode";
import { updateUser } from "@/redux/slides/userSlide";

const AdminRoute = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const isAdmin = useSelector((state) => state.user.isAdmin);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchUserDetails = async () => {
            const { storageData, decoded } = handleDecoded();
            if (decoded?.id) {
                await handleGetDetailsUser(decoded?.id, storageData);
            } else {
                setLoading(false);
            }
        };

        fetchUserDetails();
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
                localStorage.setItem(
                    "access_token",
                    JSON.stringify(data?.access_token)
                );
                config.headers["token"] = `Bearer ${data?.access_token}`;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    const handleGetDetailsUser = async (id, token) => {
        try {
            const res = await UserService.getDetailsUser(id, token);
            dispatch(updateUser({ ...res?.data, access_token: token }));
        } catch (error) {
            console.error("Failed to fetch user details", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="w-full h-screen gap-x-2 flex justify-center items-center">
                <div className="w-5 bg-[#d991c2] animate-pulse h-5 rounded-full animate-bounce"></div>
                <div className="w-5 animate-pulse h-5 bg-[#9869b8] rounded-full animate-bounce"></div>
                <div className="w-5 h-5 animate-pulse bg-[#6756cc] rounded-full animate-bounce"></div>
            </div>
        );
    }

    if (!isAdmin) {
        return <Navigate to="/login" />;
    }

    return children;
};

export default AdminRoute;
