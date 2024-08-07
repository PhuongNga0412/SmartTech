import { createBrowserRouter } from "react-router-dom";

import MainLayout from "@/layouts/MainLayout";
import Login from "@/pages/Login/Login";
import Products from "@/pages/Products";
import SignUp from "@/pages/SignUp/SignUp";
import Error from "@/pages/Error/Error";
import Contact from "@/pages/Contact/Contact";
import About from "@/pages/About/About";
import Cart from "@/pages/Cart/Cart";
import CheckOUt from "@/pages/CheckOut/CheckOut";
import Home from "@/pages/Home/Home";
import Account from "@/pages/Account/Account";
import Wishlist from "@/pages/Wishlist/Wishlist";
import ProductDetail from "@/components/Product/ProductDetail";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        errorElement: <Error />,
        children: [
            // {
            //     path: "/products",
            //     element: <Products />,
            // },
            {
                path: "/",
                element: <Home />,
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
                path: "/checkout",
                element: <CheckOUt />,
            },
            {
                path: "/detail",
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
]);
export default router;
