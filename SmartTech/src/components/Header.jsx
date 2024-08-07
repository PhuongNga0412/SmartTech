"use client";

import { useState } from "react";
import { Dialog, DialogPanel, PopoverGroup } from "@headlessui/react";
import { FiSearch } from "react-icons/fi";
import {
    Bars3Icon,
    ComputerDesktopIcon,
    DevicePhoneMobileIcon,
    TvIcon,
    XMarkIcon,
} from "@heroicons/react/24/outline";
import { PhoneIcon, PlayCircleIcon } from "@heroicons/react/20/solid";
import { TbDeviceWatchStats } from "react-icons/tb";
import { Link } from "react-router-dom";
import { AccountIcon, CartIcon, HeartIcon } from "../icons";

const products = [
    {
        name: "Smartphone",
        description: "Get a better understanding of your traffic",
        href: "#",
        icon: DevicePhoneMobileIcon,
    },
    {
        name: "Laptop",
        description: "Speak directly to your customers",
        href: "#",
        icon: ComputerDesktopIcon,
    },
    {
        name: "TV",
        description: "Your customers’ data will be safe and secure",
        href: "#",
        icon: TvIcon,
    },
    {
        name: "Smartwatches",
        description: "Connect with third-party tools",
        href: "#",
        icon: TbDeviceWatchStats,
    },
    // {
    //     name: "Automations",
    //     description: "Build strategic funnels that will convert",
    //     href: "#",
    //     icon: ArrowPathIcon,
    // },
];
const callsToAction = [
    { name: "Watch demo", href: "#", icon: PlayCircleIcon },
    { name: "Contact sales", href: "#", icon: PhoneIcon },
];

const Header = () => {
    // const navigate = useNavigate();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <header className="bg-white  ">
            <nav
                aria-label="Global"
                className="container max-w-[1170px] mx-auto flex items-center justify-between pt-10 pb-4"
            >
                <div className="flex lg:flex-1">
                    <Link to="/" className="-m-1.5 p-1.5">
                        <span className="sr-only">Your Company</span>
                        <img
                            alt=""
                            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                            className="h-8 w-auto"
                        />
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
                    {/* <Popover className="relative">
                        <PopoverButton
                            onClick={() => navigate("/products")}
                            className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900"
                        >
                            Product
                            <ChevronDownIcon
                                aria-hidden="true"
                                className="h-5 w-5 flex-none text-gray-400"
                            />
                        </PopoverButton>

                        <PopoverPanel
                            transition
                            className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5 transition data-[closed]:translate-y-1 data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in"
                        >
                            <div className="p-4">
                                {products.map((item) => (
                                    <div
                                        key={item.name}
                                        className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50"
                                    >
                                        <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                                            <item.icon
                                                aria-hidden="true"
                                                className="h-6 w-6 text-gray-600 group-hover:text-indigo-600"
                                            />
                                        </div>
                                        <div className="flex-auto">
                                            <a
                                                href={item.href}
                                                className="block font-semibold text-gray-900"
                                            >
                                                {item.name}
                                                <span className="absolute inset-0" />
                                            </a>
                                            <p className="mt-1 text-gray-600">
                                                {item.description}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50">
                                {callsToAction.map((item) => (
                                    <a
                                        key={item.name}
                                        href={item.href}
                                        className="flex items-center justify-center gap-x-2.5 p-3 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-100"
                                    >
                                        <item.icon
                                            aria-hidden="true"
                                            className="h-5 w-5 flex-none text-gray-400"
                                        />
                                        {item.name}
                                    </a>
                                ))}
                            </div>
                        </PopoverPanel>
                    </Popover> */}

                    <Link
                        to="/"
                        className="font-semibold leading-6 text-gray-900"
                    >
                        Home
                    </Link>
                    <Link
                        to="/contact"
                        className="font-semibold leading-6 text-gray-900"
                    >
                        Contact
                    </Link>
                    <Link
                        to="/about"
                        className="font-semibold leading-6 text-gray-900"
                    >
                        About
                    </Link>
                    <Link
                        to="/signup"
                        className="font-semibold leading-6 text-gray-900"
                    >
                        Sign Up
                    </Link>
                </PopoverGroup>
                <div className="hidden lg:flex lg:flex-1 lg:justify-end items-center gap-4">
                    {/* <Link
                        to="/login"
                        className="text-sm font-semibold leading-6 text-gray-900"
                    >
                        Log in <span aria-hidden="true">&rarr;</span>
                    </Link> */}

                    <div className="relative hidden md:block">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <div className="w-4 h-4 text-gray-500 dark:text-gray-400">
                                <FiSearch />
                            </div>
                            <span className="sr-only">Search icon</span>
                        </div>
                        <input
                            type="text"
                            id="search-navbar"
                            className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="What are you looking for?"
                        />
                    </div>
                    <div className="relative text-2xl">
                        <Link to="/wishlist">{HeartIcon}</Link>
                        <div className="absolute inset-1/2 -top-1/2 w-4 h-4 bg-red-500 rounded-full text-white flex justify-center items-center text-sm">
                            4
                        </div>
                    </div>
                    <div className="relative text-2xl">
                        <Link to="/cart">{CartIcon}</Link>
                        <div className="absolute inset-1/2 -top-[3px] w-4 h-4 bg-red-500 rounded-full text-white flex justify-center items-center text-sm">
                            4
                        </div>
                    </div>
                    <div className="text-2xl">
                        <Link to="/account">{AccountIcon}</Link>
                    </div>
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
                                {/* <Disclosure as="div" className="-mx-3">
                                    <DisclosureButton className="group flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                                        Product
                                        <ChevronDownIcon
                                            aria-hidden="true"
                                            className="h-5 w-5 flex-none group-data-[open]:rotate-180"
                                        />
                                    </DisclosureButton>
                                    <DisclosurePanel className="mt-2 space-y-2">
                                        {[...products, ...callsToAction].map(
                                            (item) => (
                                                <DisclosureButton
                                                    key={item.name}
                                                    as="a"
                                                    href={item.href}
                                                    className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                                >
                                                    {item.name}
                                                </DisclosureButton>
                                            )
                                        )}
                                    </DisclosurePanel>
                                </Disclosure> */}
                                <Link
                                    to="/"
                                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                >
                                    Home
                                </Link>
                                <Link
                                    to="/contact"
                                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                >
                                    Contact
                                </Link>
                                <Link
                                    to="/about"
                                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                >
                                    About
                                </Link>
                            </div>
                            <div className="py-6">
                                <Link
                                    to="/login"
                                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                >
                                    Log in
                                </Link>
                                <Link
                                    to="/login"
                                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                >
                                    Sign Up
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
