import {
    IconFacebook,
    IconInstagrem,
    IconLinkedin,
    IconTwitter,
} from "@/icons";
import { Link } from "react-router-dom";

const navigation = {
    account: [
        { id: 1, name: "My Account", link: "/account" },
        { id: 2, name: "Login / Register", link: "/login" },
        { id: 3, name: "Product", link: "/product" },
        { id: 4, name: "Cart", link: "/cart" },
        { id: 5, name: "Wishlist", link: "/wishlist" },
    ],
    link: [
        { id: 1, name: "Privacy Policy", href: "#" },
        { id: 2, name: "Terms Of Use", href: "#" },
        { id: 3, name: "FAQ", href: "#" },
        { id: 4, name: "Contact", href: "#" },
    ],
    social: [
        { id: 1, name: "Facebook", href: "#", icon: IconFacebook },
        { id: 2, name: "Instagram", href: "#", icon: IconTwitter },
        { id: 3, name: "X", href: "#", icon: IconInstagrem },
        { id: 4, name: "GitHub", href: "#", icon: IconLinkedin },
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
                    <p className="mt-6">Bắc Từ Liêm, Hà Nội</p>
                    <p className="my-4">pg.nga0412@gmail.com</p>
                    <p>0983337723</p>
                </div>

                <div>
                    <h4 className="text-xl font-medium">Account</h4>
                    <ul className="mt-6 space-y-4">
                        {navigation.account.map((item) => (
                            <li key={item.id}>
                                <Link
                                    to={item?.link}
                                    className="hover:underline"
                                    onClick={() =>
                                        window.scrollTo({
                                            top: 0,
                                            behavior: "smooth",
                                        })
                                    }
                                >
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
