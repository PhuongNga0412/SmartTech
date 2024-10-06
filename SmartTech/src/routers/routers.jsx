import { createBrowserRouter, json, redirect } from "react-router-dom";

import MainLayout from "@/layouts/MainLayout";
import Login from "@/pages/Login/Login";
// import Products from "@/pages/Products";
import SignUp from "@/pages/SignUp/SignUp";
import Error from "@/pages/Error/Error";
import Contact from "@/pages/Contact/Contact";
import About from "@/pages/About/About";
import Cart from "@/pages/Cart/Cart";
import Home from "@/pages/Home/Home";
import Account from "@/pages/Account/Account";
import Wishlist from "@/pages/Wishlist/Wishlist";
import ProductDetail from "@/components/Product/ProductDetail";

import { getUserAdminStatus } from "@/api/api";
import UserManagement from "@/pages/Admin/UserManagement/UserManagement";
import ProductManagement from "@/pages/Admin/ProductManagement/ProductManagement";
import Dashboard from "@/pages/Admin/Dashboard/Dashboard";
import Admin from "@/pages/Admin/Admin";
import Products from "@/pages/Product/Products";
import TypeProduct from "@/pages/TypeProduct/TypeProduct";
import Payment from "@/pages/Payment/Payment";
import OrderSuccess from "@/pages/OrderSuccess/OrderSuccess";
import MyOrder from "@/pages/MyOrder/MyOrder";
import AdminRoute from "@/middleware/AdminRoute";
import OrderManagement from "@/pages/Admin/OrderManagement/OrderManagement";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        errorElement: <Error />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/product",
                element: <Products />,
            },
            {
                path: "/product/:type",
                element: <TypeProduct />,
            },
            {
                path: "/contact",
                element: <Contact />,
            },
            {
                path: "/about",
                element: <About />,
            },
            {
                path: "/wishlist",
                element: <Wishlist />,
            },
            {
                path: "/cart",
                element: <Cart />,
            },
            {
                path: "/account",
                element: <Account />,
            },
            {
                path: "/payment",
                element: <Payment />,
            },
            {
                path: "/order-success",
                element: <OrderSuccess />,
            },
            {
                path: "/my-order",
                element: <MyOrder />,
            },
            {
                path: "/detail/:id",
                element: <ProductDetail />,
            },
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/signup",
                element: <SignUp />,
            },
        ],
    },
    {
        path: "/system/admin",
        element: (
            <AdminRoute>
                <Admin />
            </AdminRoute>
        ),

        children: [
            // {
            //     index: true,
            //     element: <Dashboard />,
            // },
            {
                index: true,
                // path: "user-manager",
                element: <UserManagement />,
            },
            {
                path: "product-manager",
                element: <ProductManagement />,
            },
            {
                path: "order-manager",
                element: <OrderManagement />,
            },
        ],
    },
]);
export default router;
