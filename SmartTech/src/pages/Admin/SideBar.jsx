"use client";

import { useState } from "react";
import {
    Dialog,
    DialogBackdrop,
    DialogPanel,
    TransitionChild,
} from "@headlessui/react";
import {
    Bars3Icon,
    FolderIcon,
    HomeIcon,
    UsersIcon,
    XMarkIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const navigation = [
    // { name: "Dashboard", link: "", icon: HomeIcon, current: true },
    {
        name: "Quản lý người dùng",
        link: "",
        icon: UsersIcon,
        current: true,
    },
    {
        name: "Quản lý sản phẩm",
        link: "product-manager",
        icon: FolderIcon,
        current: false,
    },
    {
        name: "Quản lý đơn hàng",
        link: "order-manager",
        icon: FolderIcon,
        current: false,
    },
];

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

export default function SideBar() {
    const user = useSelector((state) => state.user);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [current, setCurrent] = useState("User Management");

    return (
        <>
            <div>
                <Dialog
                    open={sidebarOpen}
                    onClose={setSidebarOpen}
                    className="relative z-50 lg:hidden"
                >
                    <DialogBackdrop
                        transition
                        className="fixed inset-0 bg-gray-900/80 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
                    />

                    <div className="fixed inset-0 flex">
                        <DialogPanel
                            transition
                            className="relative mr-16 flex w-full max-w-xs flex-1 transform transition duration-300 ease-in-out data-[closed]:-translate-x-full"
                        >
                            <TransitionChild>
                                <div className="absolute left-full top-0 flex w-16 justify-center pt-5 duration-300 ease-in-out data-[closed]:opacity-0">
                                    <button
                                        type="button"
                                        onClick={() => setSidebarOpen(false)}
                                        className="-m-2.5 p-2.5"
                                    >
                                        <span className="sr-only">
                                            Close sidebar
                                        </span>
                                        <XMarkIcon
                                            aria-hidden="true"
                                            className="h-6 w-6 text-white"
                                        />
                                    </button>
                                </div>
                            </TransitionChild>
                            {/* Sidebar component, swap this element with another sidebar if you like */}
                            <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-2 ring-1 ring-white/10">
                                <Link
                                    to="/"
                                    className="flex h-16 shrink-0 items-center text-white text-2xl font-semibold"
                                >
                                    SmartTech
                                </Link>
                                <nav className="flex flex-1 flex-col">
                                    <ul
                                        role="list"
                                        className="flex flex-1 flex-col gap-y-7"
                                    >
                                        <li>
                                            <ul
                                                role="list"
                                                className="-mx-2 space-y-1"
                                            >
                                                {navigation.map((item) => (
                                                    <li key={item.name}>
                                                        <Link
                                                            to={item.link}
                                                            onClick={() => {
                                                                setCurrent(
                                                                    item.name
                                                                );
                                                                setSidebarOpen(
                                                                    false
                                                                );
                                                            }}
                                                            className={classNames(
                                                                current ===
                                                                    item.name
                                                                    ? "bg-gray-800 text-white"
                                                                    : "text-gray-400 hover:bg-gray-800 hover:text-white",
                                                                "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6"
                                                            )}
                                                        >
                                                            <item.icon
                                                                aria-hidden="true"
                                                                className="h-6 w-6 shrink-0"
                                                            />
                                                            {item.name}
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </DialogPanel>
                    </div>
                </Dialog>

                {/* Static sidebar for desktop */}
                <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
                    {/* Sidebar component, swap this element with another sidebar if you like */}
                    <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6">
                        <Link
                            to="/"
                            className="flex h-16 shrink-0 items-center text-white text-2xl font-semibold"
                        >
                            SmartTech
                        </Link>
                        <nav className="flex flex-1 flex-col">
                            <ul
                                role="list"
                                className="flex flex-1 flex-col gap-y-7"
                            >
                                <li>
                                    <ul role="list" className="-mx-2 space-y-1">
                                        {navigation.map((item) => (
                                            <li key={item.name}>
                                                <Link
                                                    to={item.link}
                                                    onClick={() =>
                                                        setCurrent(item.name)
                                                    }
                                                    className={classNames(
                                                        current === item.name
                                                            ? "bg-gray-800 text-white"
                                                            : "text-gray-400 hover:bg-gray-800 hover:text-white",
                                                        "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6"
                                                    )}
                                                >
                                                    <item.icon
                                                        aria-hidden="true"
                                                        className="h-6 w-6 shrink-0"
                                                    />
                                                    {item.name}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </li>

                                <li className="-mx-6 mt-auto">
                                    <div className="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-white hover:bg-gray-800">
                                        <img
                                            alt=""
                                            src={user?.avatar}
                                            className="h-8 w-8 rounded-full bg-gray-800"
                                        />
                                        <span aria-hidden="true">
                                            {user?.name}
                                        </span>
                                    </div>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>

                <div className="sticky top-0 z-40 flex items-center gap-x-6 bg-gray-900 px-4 py-4 shadow-sm sm:px-6 lg:hidden">
                    <button
                        type="button"
                        onClick={() => setSidebarOpen(true)}
                        className="-m-2.5 p-2.5 text-gray-400 lg:hidden"
                    >
                        <span className="sr-only">Open sidebar</span>
                        <Bars3Icon aria-hidden="true" className="h-6 w-6" />
                    </button>
                    <div className="flex-1 text-sm font-semibold leading-6 text-white">
                        Dashboard
                    </div>
                    <div>
                        <img
                            alt=""
                            src={user?.avatar}
                            className="h-8 w-8 rounded-full bg-gray-800"
                        />
                    </div>
                </div>

                <main className="py-10 lg:pl-72">
                    <div className="px-4 sm:px-6 lg:px-8">
                        {/* Your content */}
                    </div>
                </main>
            </div>
        </>
    );
}
