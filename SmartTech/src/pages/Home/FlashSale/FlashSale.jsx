import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

import { FreeMode, Navigation } from "swiper/modules";
import { HiChevronRight } from "react-icons/hi";
import { HiChevronLeft } from "react-icons/hi";
import { Semiclone } from "@/icons";
import ProductCard from "@/components/Product/ProductCard";
import { Loading } from "@/components/LoadingComponent/Loading";
import CountdownTimer from "@/components/CountdownTimer/CountdownTimer";

const FlashSale = ({ products, isLoading }) => {
    const targetDate = new Date("2024-10-06T23:59:59");
    return (
        <div>
            <div className="flex items-center gap-4">
                <div className="w-[20px] h-[40px] bg-red-500 rounded"></div>
                <h3 className="font-semibold text-red-500">{"Today's"}</h3>
            </div>
            <div className="relative flex items-center gap-[87px] mt-[13px]">
                <h2 className="font-semibold text-4xl">Flash Sales</h2>
                <CountdownTimer targetDate={targetDate} />
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

            <Loading isLoading={isLoading}>
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
                        {products
                            ?.filter((item) => item.discount) // Lọc những sản phẩm có discount
                            .sort((a, b) => b.discount - a.discount) // Sắp xếp sản phẩm theo discount giảm dần
                            .map((item) => (
                                <SwiperSlide
                                    className="swiper-slide"
                                    key={item._id}
                                >
                                    <ProductCard data={item} />
                                </SwiperSlide>
                            ))}
                    </Swiper>
                </div>
            </Loading>

            <div className="h-[1px] my-16 bg-slate-300"></div>
        </div>
    );
};
export default FlashSale;
