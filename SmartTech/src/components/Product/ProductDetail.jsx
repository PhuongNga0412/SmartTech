import ProductCard from "@/components/Product/ProductCard";
import * as ProductService from "@/services//ProductService";

import {
    IconDelivery,
    IconMinus,
    IconPlus,
    IconReturn,
    Wishlist,
} from "@/icons";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Loading } from "@/components/LoadingComponent/Loading";
import { useState } from "react";

const ProductDetail = () => {
    const { id } = useParams();
    const [numProduct, setNumProduct] = useState(1);

    const onChange = (value) => {
        setNumProduct(Number(value));
    };

    const handleChangeCount = (type) => {
        if (type === "decrease") {
            setNumProduct(numProduct - 1);
        } else {
            setNumProduct(numProduct + 1);
        }
    };

    const fetchGetDetailsProduct = async (context) => {
        const id = context?.queryKey && context?.queryKey[1];
        if (id) {
            const res = await ProductService.getDetailsProduct(id);
            return res.data;
        }
    };

    const { isLoading, data: productDetails } = useQuery({
        queryKey: ["product-details", id],
        queryFn: fetchGetDetailsProduct,
        enabled: !!id,
    });

    return (
        <Loading isLoading={isLoading}>
            <div>
                <div className="uppercase text-sm text-gray-500 mt-[80px]">
                    Home / {productDetails?.type} / {productDetails?.name}
                </div>
                <div className="bg-white flex gap-[70px] mt-[80px] mb-[140px]">
                    <div className="flex flex-1 gap-[30px]">
                        <div className="flex flex-col gap-4 min-w-[170px]">
                            <img
                                src={productDetails?.image?.[0]}
                                alt="Product 1"
                                className="h-[138px] object-cover rounded"
                            />
                            <img
                                src="https://cdn.mos.cms.futurecdn.net/JfqkFvWFtf6PE6UmkBHYG8.jpg"
                                alt="Product 2"
                                className="h-[138px] object-cover rounded"
                            />
                            <img
                                src="https://files.tecnoblog.net/wp-content/uploads/2024/02/galaxy-z-flip6-5k2-1060x596.jpg"
                                alt="Product 3"
                                className="h-[138px] object-cover rounded"
                            />
                            <img
                                src="https://fscl01.fonpit.de/userfiles/7676838/image/Galaxy_Z_Flip_0004-w782.jpg"
                                alt="Product 3"
                                className="h-[138px] object-cover rounded"
                            />
                        </div>
                        <div>
                            <img
                                src="https://primerphone.com/wp-content/uploads/2023/03/2023-03-05_140948-599x598.png"
                                alt="Product 4"
                                className="min-w-[500px] h-full object-cover rounded"
                            />
                        </div>
                    </div>
                    <div className=" flex-1">
                        <div className="flex justify-between items-center">
                            <h1 className="text-2xl font-semibold">
                                {productDetails?.name}
                            </h1>
                        </div>
                        <div className="mt-4 flex items-center">
                            <span className="text-yellow-500">
                                &#9733;&#9733;&#9733;&#9733;&#9734;
                            </span>
                            <span className="text-sm text-gray-500 ml-2">
                                ({productDetails?.rating})
                            </span>
                            <span className="text-sm text-green-500 ml-4">
                                In Stock
                            </span>
                        </div>
                        <div className="mt-4 text-2xl">
                            {productDetails?.price.toLocaleString()} VNĐ
                        </div>
                        <p className="whitespace-pre-line mt-6 text-sm ">
                            {productDetails?.description}
                        </p>
                        <div className="h-[0.5px] mt-6 bg-black"></div>
                        {/* <div className="mt-6 flex items-center gap-6">
                            <label className="block text-xl">Colours:</label>
                            <div className="mt-1 flex space-x-2">
                                <button className="w-6 h-6 bg-red-500 rounded-full border border-gray-300 focus:outline-none"></button>
                                <button className="w-6 h-6 bg-gray-300 rounded-full border border-gray-300 focus:outline-none"></button>
                            </div>
                        </div> */}
                        {/* <div className="mt-6 flex gap-6 items-center">
                            <label className="block text-xl">Size:</label>
                            <div className="mt-1 flex space-x-2">
                                {["XS", "S", "M", "L", "XL"].map((size) => (
                                    <button
                                        key={size}
                                        className="h-8 w-8 border border-gray-300 rounded text-sm text-center font-medium text-gray-700 focus:outline-none hover:bg-red-500 hover:text-white"
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div> */}
                        <div className="mt-6 flex items-center space-x-4">
                            <div className="flex items-center divide-x divide-gray-300 rounded-md border border-gray-300">
                                <div>
                                    <button
                                        onClick={() =>
                                            handleChangeCount("decrease")
                                        }
                                        className="px-3 py-[10px] text-gray-600"
                                    >
                                        {IconMinus}
                                    </button>
                                </div>
                                <div>
                                    <input
                                        onChange={onChange}
                                        defaultValue={1}
                                        value={numProduct}
                                        type="number"
                                        className="custom-number-input text-center px-2 w-20 text-xl font-medium border-0 focus:outline-none focus:ring-0"
                                    />
                                </div>
                                <div>
                                    <button
                                        onClick={() =>
                                            handleChangeCount("increase")
                                        }
                                        className="px-3 py-[10px] text-gray-600"
                                    >
                                        {IconPlus}
                                    </button>
                                </div>
                            </div>
                            <button className="px-12 py-[10px] font-medium bg-red-500 text-white rounded">
                                Buy Now
                            </button>
                            <button className="px-1 border border-gray-300 rounded">
                                {Wishlist}
                            </button>
                        </div>
                        <div className="mt-10">
                            <div className="flex items-center gap-4 pl-4 pb-4 pt-6 border border-black rounded-t">
                                <div>{IconDelivery}</div>
                                <div className="ml-3 text-sm ">
                                    <p className="font-medium mb-2">
                                        Free Delivery
                                    </p>
                                    <p className="text-xs">
                                        Enter your postal code for Delivery
                                        Availability
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center pt-4 pl-4 pb-6 gap-4 border-x border-b border-black rounded-b">
                                <div>{IconReturn}</div>
                                <div className="ml-3 text-sm ">
                                    <p className="font-medium mb-2">
                                        Return Delivery
                                    </p>
                                    <p className="text-xs">
                                        Free 30 Days Delivery Returns. Details
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mb-[140px]">
                    <div className="flex items-center gap-4 mb-[60px]">
                        <div className="w-[20px] h-[40px] bg-red-500 rounded"></div>
                        <h3 className="font-semibold text-red-500">
                            Related Item
                        </h3>
                    </div>
                    {/* <div className="flex gap-[30px]">
                        {products.map((item) => (
                            <ProductCard key={item.id} data={item} />
                        ))}
                    </div> */}
                </div>
            </div>
        </Loading>
    );
};
export default ProductDetail;
