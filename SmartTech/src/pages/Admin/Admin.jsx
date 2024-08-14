import SideBar from "@/pages/Admin/SideBar";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const Admin = () => {
    return (
        <div className="lg:flex">
            <SideBar />
            <div className="flex-1 mt-[84px]">
                <Outlet />
            </div>
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
        </div>
    );
};
export default Admin;
