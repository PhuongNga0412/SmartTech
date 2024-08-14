import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

import { FreeMode, Navigation } from "swiper/modules";
import { HiChevronRight } from "react-icons/hi";
import { HiChevronLeft } from "react-icons/hi";
import { Semiclone } from "@/icons";
import ProductCard from "@/components/Product/ProductCard";

const FlashSale = (products) => {
    console.log("sale", products);
    return (
        <div>
            <div className="flex items-center gap-4">
                <div className="w-[20px] h-[40px] bg-red-500 rounded"></div>
                <h3 className="font-semibold text-red-500">{"Today's"}</h3>
            </div>
            <div className="relative flex items-center gap-[87px] mt-[13px]">
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
                <div className="absolute right-0 bottom-0 flex">
                    <div className="relative right-32 transform ">
                        <div className="swiper-button-prev bg-white border-2  rounded-full cursor-pointer">
                            <HiChevronLeft className=" text-black" />
                        </div>
                    </div>
                    <div className="">
                        <div className="swiper-button-next bg-white border-2 rounded-full cursor-pointer">
                            <HiChevronRight className=" text-black" />
                        </div>
                    </div>
                </div>
            </div>
            {/* Products Sale */}

            <div className="mt-10">
                <Swiper
                    slidesPerView={4}
                    spaceBetween={30}
                    navigation={{
                        nextEl: ".swiper-button-next",
                        prevEl: ".swiper-button-prev",
                    }}
                    modules={[FreeMode, Navigation]}
                    className="mySwiper mt-10"
                >
                    {products?.products?.map(
                        (item) =>
                            item.discount && (
                                <SwiperSlide
                                    className="swiper-slide"
                                    key={item._id}
                                >
                                    <ProductCard data={item} />
                                </SwiperSlide>
                            )
                    )}
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
