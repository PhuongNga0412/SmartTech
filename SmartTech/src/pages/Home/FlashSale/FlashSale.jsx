import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

import { FreeMode, Pagination } from "swiper/modules";
import { Semiclone } from "@/icons";
import ProductCard from "@/components/Product/ProductCard";

const products = [
    {
        id: 1,
        title: "The north coat",
        price: 260,
        cost: 360,
        reviews: 65,
        discount: 40,
    },
    {
        id: 2,
        title: "Gucci duffle bag",
        price: 960,
        cost: 1160,
        reviews: 65,
        discount: 35,
    },
    {
        id: 3,
        title: "RGB liquid CPU Cooler",
        price: 160,
        cost: 170,
        reviews: 65,
        discount: 30,
    },
    {
        id: 4,
        title: "Small BookSelf",
        price: 360,
        cost: 1160,
        reviews: 65,
        discount: 25,
    },
    {
        id: 5,
        title: "Small BookSelf",
        price: 360,
        cost: 1160,
        reviews: 65,
    },
    {
        id: 6,
        title: "Small BookSelf",
        price: 360,
        cost: 1160,
        reviews: 65,
    },
    {
        id: 7,
        title: "Small BookSelf",
        price: 360,
        cost: 1160,
        reviews: 65,
    },
];

const FlashSale = () => {
    return (
        <div>
            <div className="flex items-center gap-4">
                <div className="w-[20px] h-[40px] bg-red-500 rounded"></div>
                <h3 className="font-semibold text-red-500">{"Today's"}</h3>
            </div>
            <div className="flex items-center gap-[87px] mt-[13px]">
                <h2 className="font-semibold text-4xl">Flash Sales</h2>
                <div className="flex gap-4">
                    <div>
                        <p className="font-medium text-xs">Days</p>
                        <div className="flex items-center gap-4">
                            <p className="font-bold text-3xl">03</p>
                            <div>{Semiclone}</div>
                        </div>
                    </div>
                    <div>
                        <p className="font-medium text-xs">Hours</p>
                        <div className="flex items-center gap-4">
                            <p className="font-bold text-3xl">23</p>
                            <div>{Semiclone}</div>
                        </div>
                    </div>
                    <div>
                        <p className="font-medium text-xs">Minutes</p>
                        <div className="flex items-center gap-4">
                            <p className="font-bold text-3xl">19</p>
                            <div>{Semiclone}</div>
                        </div>
                    </div>
                    <div>
                        <p className="font-medium text-xs">Seconds</p>
                        <p className="font-bold text-3xl">56</p>
                    </div>
                </div>
            </div>
            {/* Products Sale */}
            <div className="mt-10">
                <Swiper
                    slidesPerView={4}
                    spaceBetween={30}
                    // freeMode={true}
                    pagination={{
                        clickable: true,
                    }}
                    modules={[FreeMode, Pagination]}
                    // className="mySwiper"
                >
                    {products.map((item) => (
                        <SwiperSlide key={item.id}>
                            <ProductCard data={item} />
                        </SwiperSlide>
                    ))}
                    {/* <SwiperSlide>
                        <div>
                            <div>
                                <img
                                    src="https://techie.com.bd/wp-content/uploads/2019/09/Havit-HV-G92-Vibration-Gaming-Pad-Red-1024x1024.jpg"
                                    alt=""
                                    className="w-[270px] h-[250px]"
                                />
                            </div>
                            <div className="text-left">
                                <p className="font-medium ">
                                    HAVIT HV-G92 Gamepad
                                </p>
                                <p className="font-medium text-red-500">$120</p>
                                <p>***</p>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div>
                            <div>
                                <img
                                    src="https://techie.com.bd/wp-content/uploads/2019/09/Havit-HV-G92-Vibration-Gaming-Pad-Red-1024x1024.jpg"
                                    alt=""
                                    className="w-[270px] h-[250px]"
                                />
                            </div>
                            <div className="text-left">
                                <p className="font-medium ">
                                    HAVIT HV-G92 Gamepad
                                </p>
                                <p className="font-medium text-red-500">$120</p>
                                <p>***</p>
                            </div>
                        </div>
                    </SwiperSlide>

                    <SwiperSlide>Slide 3</SwiperSlide>
                    <SwiperSlide>Slide 4</SwiperSlide>
                    <SwiperSlide>Slide 5</SwiperSlide>
                    <SwiperSlide>Slide 6</SwiperSlide>
                    <SwiperSlide>Slide 7</SwiperSlide>
                    <SwiperSlide>Slide 8</SwiperSlide>
                    <SwiperSlide>Slide 9</SwiperSlide> */}
                </Swiper>
            </div>
            <button className="block mx-auto mt-14 py-4 px-5 rounded bg-red-500 font-medium text-white">
                View All Products
            </button>
            <div className="h-[1px] my-16 bg-slate-300"></div>
        </div>
    );
};
export default FlashSale;
