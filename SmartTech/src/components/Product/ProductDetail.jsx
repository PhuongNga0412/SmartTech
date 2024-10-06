import * as ProductService from "@/services//ProductService";
import * as WishlistService from "@/services/WishlistService";

import {
    IconDelivery,
    IconMinus,
    IconPlus,
    IconReturn,
    Wishlist,
} from "@/icons";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Loading } from "@/components/LoadingComponent/Loading";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addOrderProduct } from "../../redux/slides/orderSlide";
import { toast } from "react-toastify";
import { addWishlist } from "@/redux/slides/wishlistSlide";
import ProductCard from "@/components/Product/ProductCard";

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const [numProduct, setNumProduct] = useState(1);

    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();

    // const [typeProduct, setTypeProduct] = useState();
    const fetchProductAll = async () => {
        const limit = 100;
        const res = await ProductService.getAllProduct("", limit, 0);
        return res;
    };

    const { data: products } = useQuery({
        queryKey: ["products"],
        queryFn: fetchProductAll,
        retry: 3,
        retryDelay: 1000,
    });
    console.log(products);
    // const fetchAllTypeProduct = async () => {
    //     const res = await ProductService.getAllTypeProduct();
    //     if (res?.status === "OK") {
    //         setTypeProduct(res?.data);
    //     }
    // };

    // useEffect(() => {
    //     fetchAllTypeProduct();
    // }, []);

    const onChange = (value) => {
        setNumProduct(Number(value));
    };

    const handleChangeCount = (type) => {
        setNumProduct((prev) => {
            let newValue;
            if (type === "decrease") {
                newValue = Math.max(prev - 1, 1);
            } else {
                newValue = Math.min(prev + 1, productDetails?.countInStock);
                if (newValue === productDetails?.countInStock) {
                    alert(
                        "Số lượng bạn muốn thêm đã đạt số lượng tối đa có sẵn trong kho."
                    );
                }
            }
            return newValue;
        });
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

    const [selectedImage, setSelectedImage] = useState(
        productDetails?.image?.[0]
    );

    useEffect(() => {
        if (productDetails?.image?.length > 0) {
            setSelectedImage(productDetails.image[0]);
        }
    }, [productDetails]);

    const handleAddOrderProduct = () => {
        if (!user?.id) {
            navigate("/login", { state: location?.pathname });
        } else {
            toast.success("Thêm sản phẩm vào giỏ hàng");
            dispatch(
                addOrderProduct({
                    orderItem: {
                        name: productDetails?.name,
                        amount: numProduct,
                        image: productDetails?.image,
                        price: productDetails?.price,
                        product: productDetails?._id,
                    },
                })
            );
        }
    };
    const wishlist = useSelector((state) => state.wishlist);

    const handleAddWishlist = async () => {
        const check = wishlist.wishlistItems.find(
            (item) => item?._id === productDetails?._id
        );
        if (!check) {
            try {
                await WishlistService.addToWishlist(
                    user.id,
                    productDetails._id
                );
                toast.success("Sản phẩm đã được thêm vào wishlist!");
                dispatch(addWishlist({ product: productDetails }));
            } catch (error) {
                toast.error("Không thể thêm sản phẩm vào wishlist.");
            }
        }
    };
    const relatedProducts = products?.data?.filter(
        (item) => item?.type === productDetails?.type
    );
    console.log("1", relatedProducts);

    // Hàm để lấy ngẫu nhiên 4 sản phẩm từ danh sách
    const getRandomProducts = (products, count) => {
        if (!products || products.length === 0) return [];
        // Shuffle mảng
        const shuffled = products.sort(() => 0.5 - Math.random());
        // Lấy ra `count` sản phẩm đầu tiên
        return shuffled.slice(0, count);
    };

    // Lấy 4 sản phẩm ngẫu nhiên
    const randomRelatedProducts = getRandomProducts(relatedProducts, 4);

    return (
        <Loading isLoading={isLoading}>
            <div>
                <div className="uppercase text-sm text-gray-500 mt-[80px]">
                    <Link to="/">Home</Link> / {productDetails?.type} /{" "}
                    {productDetails?.name}
                </div>
                <div className="bg-white lg:flex lg:gap-[70px] mt-[80px] mb-[140px]">
                    <div className="md:flex flex-1 gap-[30px]">
                        <div className="flex flex-wrap md:flex-col gap-4 ">
                            {productDetails?.image?.map((img, index) => (
                                <img
                                    onClick={() => setSelectedImage(img)}
                                    key={index}
                                    src={img}
                                    alt="Product 1"
                                    className="w-[170px] h-[138px] object-cover rounded"
                                />
                            ))}
                        </div>
                        <div>
                            <img
                                src={selectedImage}
                                alt="Product 4"
                                className="w-[500px] object-cover rounded"
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
                                Còn hàng
                            </span>
                        </div>
                        <div className="mt-4 text-2xl">
                            {productDetails?.price.toLocaleString()} VNĐ
                        </div>
                        <p className="whitespace-pre-line mt-6 text-sm ">
                            {productDetails?.description}
                        </p>
                        <div className="h-[0.5px] mt-6 bg-black"></div>
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
                            <button
                                onClick={handleAddOrderProduct}
                                className="px-12 py-[10px] font-medium bg-red-500 text-white rounded"
                            >
                                Thêm vào giỏ hàng
                            </button>
                            <button
                                onClick={handleAddWishlist}
                                className="px-1 border border-gray-300 rounded"
                            >
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
                            Sản phẩm liên quan
                        </h3>
                    </div>
                    <div className="flex gap-[30px]">
                        {randomRelatedProducts?.map((item) => (
                            <ProductCard key={item?._id} data={item} />
                        ))}
                    </div>
                </div>
            </div>
        </Loading>
    );
};
export default ProductDetail;
