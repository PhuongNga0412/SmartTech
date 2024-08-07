import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
    return (
        <div>
            <Header />
            <div className="container mx-auto max-w-[1170px] mb-[140px]">
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};
export default MainLayout;
