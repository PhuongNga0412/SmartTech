"use client";
import imgLogo from "@/assets/image/logo.jpeg";
import { useEffect, useState } from "react";
import * as UserService from "@/services/UserService";
import { Dialog, DialogPanel, PopoverGroup } from "@headlessui/react";
import { FiSearch } from "react-icons/fi";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";
import {
    AccountIcon,
    CartIcon,
    HeartIcon,
    IconLogOut,
    IconMallBag,
} from "../icons";
import { FiLogIn } from "react-icons/fi";
import { RiSettings3Line } from "react-icons/ri";
import { RiUserSettingsLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { resetUser } from "@/redux/slides/userSlide";
import { searchProduct } from "@/redux/slides/productSlide";

const Header = () => {
    const dispatch = useDispatch();
    const order = useSelector((state) => state.order);
    const wishlist = useSelector((state) => state.wishlist);
    const navigate = useNavigate();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [userAvatar, setUserAvatar] = useState("");
    const [search, setSearch] = useState("");

    const onSearch = (e) => {
        setSearch(e.target.value);
        dispatch(searchProduct(e.target.value));
    };

    const user = useSelector((state) => state.user);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        setUserAvatar(user?.avatar);
    }, [user?.avatar]);

    const handleLogOut = async () => {
        setIsOpen(!isOpen);
        try {
            await UserService.logoutUser();
            dispatch(resetUser());
            localStorage.removeItem("access_token");
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    const handleNavigateMyOrder = () => {
        toggleDropdown();
        navigate("/my-order", {
            state: {
                id: user?.id,
                token: user?.access_token,
            },
        });
    };

    return (
        <header className="bg-white sticky top-0 z-20">
            <nav
                aria-label="Global"
                className="container max-w-[1170px] mx-auto flex items-center justify-between pt-10 pb-4"
            >
                <div className="flex lg:flex-1">
                    <Link
                        to="/"
                        className="flex items-center gap-2 -m-1.5 p-1.5"
                    >
                        <img alt="" src={imgLogo} className="h-8 w-auto" />
                        <p className="text-xl font-semibold">SmartTech</p>
                    </Link>
                </div>
                <div className="flex lg:hidden">
                    <button
                        type="button"
                        onClick={() => setMobileMenuOpen(true)}
                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                    >
                        <span className="sr-only">Open main menu</span>
                        <Bars3Icon aria-hidden="true" className="h-6 w-6" />
                    </button>
                </div>
                <PopoverGroup className="hidden lg:flex lg:gap-x-12">
                    <Link
                        to="/"
                        className="font-semibold leading-6 text-gray-900"
                    >
                        Trang Chủ
                    </Link>
                    <Link
                        to="/product"
                        className="font-semibold leading-6 text-gray-900"
                    >
                        Sản Phẩm
                    </Link>
                    <Link
                        to="/contact"
                        className="font-semibold leading-6 text-gray-900"
                    >
                        Liên Hệ
                    </Link>
                    <Link
                        to="/about"
                        className="font-semibold leading-6 text-gray-900"
                    >
                        Giới Thiệu
                    </Link>
                </PopoverGroup>
                <div className="hidden lg:flex lg:flex-1 lg:justify-end items-center gap-4">
                    {/* --------------------------------Search-------------------------------- */}
                    <div className="relative hidden md:block">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <div className="w-4 h-4 text-gray-500 dark:text-gray-400">
                                <FiSearch />
                            </div>
                            <span className="sr-only">Search icon</span>
                        </div>
                        <input
                            value={search}
                            onChange={onSearch}
                            type="text"
                            id="search-navbar"
                            className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Nhập tên sản phẩm..."
                        />
                    </div>

                    <div className="relative text-2xl">
                        <Link to="/wishlist">{HeartIcon}</Link>
                        <div className="absolute inset-1/2 -top-1/2 w-4 h-4 bg-red-500 rounded-full text-white flex justify-center items-center text-sm">
                            {wishlist?.wishlistItems?.length}
                        </div>
                    </div>
                    <div className="relative text-2xl">
                        <Link to="/cart">{CartIcon}</Link>
                        <div className="absolute inset-1/2 -top-[3px] w-4 h-4 bg-red-500 rounded-full text-white flex justify-center items-center text-sm">
                            {order?.orderItems?.length}
                        </div>
                    </div>
                    {user?.access_token ? (
                        <div className="relative text-2xl">
                            {userAvatar ? (
                                <img
                                    onClick={toggleDropdown}
                                    className="w-8 h-8 rounded-full object-cover border-solid border-2 border-gray-500 "
                                    src={userAvatar}
                                    alt="avatar"
                                />
                            ) : (
                                <button onClick={toggleDropdown}>
                                    {AccountIcon}
                                </button>
                            )}
                            {isOpen && (
                                <div className="absolute right-0 mt-2 z-10 min-w-[224px] flex flex-col gap-[13px] p-5 text-base dark:text-gray-400 bg-white rounded border">
                                    <Link
                                        onClick={toggleDropdown}
                                        to="/account"
                                        className="flex gap-4 items-center"
                                    >
                                        <RiUserSettingsLine className="text-2xl" />
                                        <p>Thông tin tài khoản</p>
                                    </Link>
                                    {user?.isAdmin && (
                                        <Link
                                            onClick={toggleDropdown}
                                            to="/system/admin"
                                            className="flex gap-4 items-center"
                                        >
                                            <div>
                                                <RiSettings3Line className="text-2xl" />
                                            </div>
                                            <p>Quản lý hệ thống</p>
                                        </Link>
                                    )}
                                    <button
                                        onClick={handleNavigateMyOrder}
                                        className="flex gap-4 items-center"
                                    >
                                        <div>{IconMallBag}</div>
                                        <p>Đơn hàng của tôi</p>
                                    </button>
                                    <button
                                        onClick={handleLogOut}
                                        className="flex gap-4 items-center"
                                    >
                                        <div>{IconLogOut}</div>
                                        <p>Đăng xuất</p>
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="relative text-2xl">
                            <button onClick={toggleDropdown}>
                                {AccountIcon}
                            </button>

                            {isOpen && (
                                <div className="absolute right-0 mt-2 z-10 min-w-[224px] flex flex-col gap-[13px] p-5 text-base dark:text-gray-400 bg-white rounded border">
                                    <Link
                                        onClick={toggleDropdown}
                                        to="/login"
                                        className="flex gap-4 items-center"
                                    >
                                        <FiLogIn className="text-2xl" />
                                        <p>Đăng nhập</p>
                                    </Link>

                                    <Link
                                        to="/signup"
                                        onClick={toggleDropdown}
                                        className="flex gap-4 items-center"
                                    >
                                        <FiLogIn className="text-2xl" />
                                        <p>Đăng ký</p>
                                    </Link>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </nav>
            <div className="h-[0.5px] bg-gray-300"></div>
            <Dialog
                open={mobileMenuOpen}
                onClose={setMobileMenuOpen}
                className="lg:hidden"
            >
                <div className="fixed inset-0 z-10" />
                <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                    <div className="flex items-center justify-between">
                        <a href="#" className="-m-1.5 p-1.5">
                            <span className="sr-only">Your Company</span>
                            <img
                                alt=""
                                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                                className="h-8 w-auto"
                            />
                        </a>
                        <button
                            type="button"
                            onClick={() => setMobileMenuOpen(false)}
                            className="-m-2.5 rounded-md p-2.5 text-gray-700"
                        >
                            <span className="sr-only">Close menu</span>
                            <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                        </button>
                    </div>
                    <div className="mt-6 flow-root">
                        <div className="-my-6 divide-y divide-gray-500/10">
                            <div className="space-y-2 py-6">
                                <Link
                                    to="/"
                                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                >
                                    Trang Chủ
                                </Link>
                                <Link
                                    to="/product"
                                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                >
                                    Sản Phẩm
                                </Link>
                                <Link
                                    to="/contact"
                                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                >
                                    Liên Hệ
                                </Link>
                                <Link
                                    to="/about"
                                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                >
                                    Giới Thiệu
                                </Link>
                            </div>
                            <div className="py-6">
                                <Link
                                    to="/login"
                                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                >
                                    Đăng nhập
                                </Link>
                                <Link
                                    to="/signup"
                                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                >
                                    Đăng ký
                                </Link>
                            </div>
                        </div>
                    </div>
                </DialogPanel>
            </Dialog>
        </header>
    );
};

export default Header;
