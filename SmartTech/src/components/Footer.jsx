import {
    IconFacebook,
    IconInstagrem,
    IconLinkedin,
    IconTwitter,
} from "@/icons";
import { Link } from "react-router-dom";

const navigation = {
    account: [
        { name: "My Account", href: "#" },
        { name: "Login / Register", href: "#" },
        { name: "Cart", href: "#" },
        { name: "Wishlist", href: "#" },
        { name: "Shop", href: "#" },
    ],
    link: [
        { name: "Privacy Policy", href: "#" },
        { name: "Terms Of Use", href: "#" },
        { name: "FAQ", href: "#" },
        { name: "Contact", href: "#" },
    ],
    social: [
        {
            name: "Facebook",
            href: "#",
            icon: IconFacebook,
        },
        {
            name: "Instagram",
            href: "#",
            icon: IconTwitter,
        },
        {
            name: "X",
            href: "#",
            icon: IconInstagrem,
        },
        {
            name: "GitHub",
            href: "#",
            icon: IconLinkedin,
        },
    ],
};

export default function Example() {
    return (
        <footer className="bg-black text-white pt-20 pb-6">
            <div className="container max-w-[1170px] mx-auto grid grid-cols-2 md:grid-cols-5 gap-[87px] pb-[60px]">
                <div>
                    <h4 className="text-xl font-medium">Exclusive</h4>
                    <p className="my-6 text-xl font-medium">Subscribe</p>
                    <p>Get 10% off your first order</p>
                    <div className="mt-4 flex">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="p-4 rounded-md text-black focus:outline-none"
                        />
                        {/* <button className="p-2 bg-white text-black rounded-r-md">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L3.707 10.707a1 1 0 01-1.414-1.414l6-6z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </button> */}
                    </div>
                </div>

                <div>
                    <h4 className="text-xl font-medium">Support</h4>
                    <p className="mt-6">
                        111 Bijoy sarani, Dhaka, DH 1515, Bangladesh.
                    </p>
                    <p className="my-4">exclusive@gmail.com</p>
                    <p>+88015-88888-9999</p>
                </div>

                <div>
                    <h4 className="text-xl font-medium">Account</h4>
                    <ul className="mt-6 space-y-4">
                        {navigation.account.map((item) => (
                            <li key={item.id}>
                                <Link to="/" className="hover:underline">
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h4 className="text-xl font-medium">Quick Link</h4>
                    <ul className="mt-6 space-y-4">
                        {navigation.link.map((item) => (
                            <li key={item.id}>
                                <Link to="/" className="hover:underline">
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h4 className="text-xl font-medium">Download App</h4>
                    <p className="mt-6 text-xs font-medium text-gray-400">
                        Save $3 with App New User Only
                    </p>
                    <div className="mt-3 mb-7">
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                            alt="Google Play"
                            className="w-32"
                        />
                    </div>
                    <div className="mt-4 flex space-x-2">
                        {navigation.social.map((item) => (
                            <a
                                key={item.id}
                                href="#"
                                className="hover:text-gray-400"
                            >
                                {item.icon}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
            <div className="text-center pt-4 text-gray-400">
                &copy; Copyright Rimel 2022. All rights reserved.
            </div>
        </footer>
    );
}
