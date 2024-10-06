import FullServices from "@/components/Services/FullServices";
import {
    DeliveryIcon,
    inLogo,
    InstagramLogo,
    MoneyBagIcon,
    SaleIcon,
    ShopIcon,
    ShoppingBagIcon,
    TwitterLogo,
} from "@/icons";
import { Link } from "react-router-dom";

const icons = [
    { id: 1, icon: ShopIcon },
    { id: 2, icon: SaleIcon },
    { id: 3, icon: ShoppingBagIcon },
    { id: 4, icon: MoneyBagIcon },
];

const About = () => {
    return (
        <div>
            <div className="uppercase font-bold text-sm mt-[79px] mb-[42px]">
                <Link
                    to="/"
                    className="text-gray-500 hover:text-black hover:underline"
                >
                    trang chủ
                </Link>{" "}
                / <span className="text-gray-700">giới thiệu</span>
            </div>

            <div className="flex gap-[75px] items-center">
                <div className="flex-1">
                    <h2 className="font-semibold text-[54px]">Our Story</h2>
                    <p className="mt-10 mb-6">
                        Launced in 2015, Exclusive is South Asia’s premier
                        online shopping makterplace with an active presense in
                        Bangladesh. Supported by wide range of tailored
                        marketing, data and service solutions, Exclusive has
                        10,500 sallers and 300 brands and serves 3 millioons
                        customers across the region.{" "}
                    </p>
                    <p>
                        Exclusive has more than 1 Million products to offer,
                        growing at a very fast. Exclusive offers a diverse
                        assotment in categories ranging from consumer.
                    </p>
                </div>
                <div className="flex-1">
                    <img
                        src="https://cdn.sanity.io/images/tlr8oxjg/production/7b7f05720074a848850e0705779306c27da5a6cf-1065x597.png?w=3840&q=100&fit=clip&auto=format"
                        alt=""
                        className="h-[609px] object-cover"
                    />
                </div>
            </div>

            <div className="flex justify-between mt-[140px]">
                {icons.map((item) => (
                    <div
                        key={item.id}
                        className=" group py-[30px] px-[50px] border border-gray-200 rounded flex flex-col items-center hover:bg-red-500 hover:text-white"
                    >
                        <div className="w-20 h-20 bg-gray-300 rounded-full flex justify-center items-center group-hover:bg-red-400">
                            <div className="flex w-14 h-14 bg-black group-hover:bg-white group-hover:stroke-black justify-center items-center rounded-full">
                                {item.icon}
                            </div>
                        </div>
                        <p className="text-3xl font-bold mt-6 mb-3">10.5k </p>
                        <p>Sallers active our site</p>
                    </div>
                ))}
            </div>

            <div className="my-[140px] flex justify-between">
                <div>
                    <div>
                        <img
                            className="w-[370px] h-[430px] object-cover mb-8 rounded"
                            src="https://i.pinimg.com/564x/97/45/e9/9745e9dfe12b0ce5ef67fb66f477996f.jpg"
                            alt=""
                        />
                    </div>
                    <div>
                        <h3 className="font-medium text-3xl">Tom Cruise</h3>
                        <p className="mt-2 mb-4">Founder & Chairman</p>
                        <div className="flex gap-4 items-center">
                            <div>{TwitterLogo}</div>
                            <div>{InstagramLogo}</div>
                            <div>{inLogo}</div>
                        </div>
                    </div>
                </div>
                <div>
                    <div>
                        <img
                            className="w-[370px] h-[430px] object-cover mb-8 rounded"
                            src="https://i.pinimg.com/564x/b1/d9/a0/b1d9a0abe0ac725aba3fda53b0502079.jpg"
                            alt=""
                        />
                    </div>
                    <div>
                        <h3 className="font-medium text-3xl">Tom Cruise</h3>
                        <p className="mt-2 mb-4">Founder & Chairman</p>
                        <div className="flex gap-4 items-center">
                            <div>{TwitterLogo}</div>
                            <div>{InstagramLogo}</div>
                            <div>{inLogo}</div>
                        </div>
                    </div>
                </div>
                <div>
                    <div>
                        <img
                            className="w-[370px] h-[430px] object-cover mb-8 rounded"
                            src="https://i.pinimg.com/564x/e1/d8/05/e1d805d9ae86ca2ebe2078a6594f9571.jpg"
                            alt=""
                        />
                    </div>
                    <div>
                        <h3 className="font-medium text-3xl">Tom Cruise</h3>
                        <p className="mt-2 mb-4">Founder & Chairman</p>
                        <div className="flex gap-4 items-center">
                            <div>{TwitterLogo}</div>
                            <div>{InstagramLogo}</div>
                            <div>{inLogo}</div>
                        </div>
                    </div>
                </div>
            </div>

            <FullServices />
        </div>
    );
};
export default About;
