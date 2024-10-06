import {
    ProductCardHeartIcon,
    ProductCardHeartIconFill,
    ProductCardViewIcon,
} from "@/icons";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { LuHeartOff } from "react-icons/lu";
import {
    addWishlist,
    removeWishlistProduct,
} from "@/redux/slides/wishlistSlide";
import * as WishlistService from "@/services/WishlistService";
import { toast } from "react-toastify";

const ProductCard = ({ data }) => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const wishlist = useSelector((state) => state.wishlist.wishlistItems);
    const navigate = useNavigate();
    const handleDetailsProduct = (id) => {
        navigate(`/detail/${id}`);
    };
    const check = wishlist.some((item) => item._id === data?._id);

    const handleRemoveWishlist = async () => {
        try {
            await WishlistService.removeFromWishlist(user.id, data._id);
            dispatch(removeWishlistProduct({ productId: data?._id }));
            toast.success("Sản phẩm đã được xóa khỏi wishlist!");
        } catch (error) {
            toast.error("Có lỗi xảy ra khi xóa sản phẩm khỏi wishlist!");
        }
    };

    const handleAddWishlist = async () => {
        const check = wishlist.find((item) => item?._id === data?._id);
        console.log(check);
        if (!check) {
            try {
                await WishlistService.addToWishlist(user.id, data._id);
                toast.success("Sản phẩm đã được thêm vào wishlist!");
                dispatch(addWishlist({ product: data }));
            } catch (error) {
                toast.error("Không thể thêm sản phẩm vào wishlist.");
            }
        }
    };

    return (
        <div>
            <div className="relative">
                {data?.discount > 0 && (
                    <span className="absolute top-3 left-3 bg-red-500 text-white text-xs rounded px-3 py-1">
                        - {data?.discount}%
                    </span>
                )}
                <div className="absolute top-2 right-2 flex flex-col items-center space-y-2">
                    {!check ? (
                        <button
                            onClick={handleAddWishlist}
                            className="bg-white rounded-full w-[34px] h-[34px] flex justify-center items-center shadow-md"
                        >
                            {ProductCardHeartIcon}
                        </button>
                    ) : (
                        <button
                            onClick={handleRemoveWishlist}
                            className="bg-white rounded-full w-[34px] h-[34px] flex justify-center items-center shadow-md"
                        >
                            {/* <LuHeartOff className="text-xl" /> */}
                            {ProductCardHeartIconFill}
                        </button>
                    )}

                    <button className="bg-white rounded-full w-[34px] h-[34px] flex justify-center items-center shadow-md">
                        {ProductCardViewIcon}
                    </button>
                </div>
                {data.image ? (
                    <img
                        onClick={() =>
                            data.countInStock !== 0 &&
                            handleDetailsProduct(data._id)
                        }
                        src={data?.image?.[1]}
                        alt="Product"
                        className="w-[270px] h-[250px] object-cover rounded cursor-pointer"
                    />
                ) : (
                    <img
                        src="https://i.pinimg.com/564x/82/39/18/823918e015243ab53be190ab33abd994.jpg"
                        alt="Product"
                        className="w-[270px] h-[250px] object-cover rounded"
                    />
                )}

                <button className="absolute hidden bottom-0 bg-black text-white w-full py-2 rounded mt-4 font-bold group-hover:block">
                    Add To Cart
                </button>
            </div>
            <div className="mt-4">
                <div
                    onClick={() =>
                        data.countInStock !== 0 &&
                        handleDetailsProduct(data._id)
                    }
                    className="cursor-pointer max-w-[270px] font-medium text-base line-clamp-2 overflow-hidden min-h-12"
                >
                    {data.name}
                </div>
                <div className="flex items-center space-x-2">
                    <span className="text-red-500 font-medium text-base">
                        {data.price.toLocaleString()} VND
                    </span>
                    <span className="line-through text-gray-500">
                        {data.basePrice} VND
                    </span>
                </div>
                <div className="flex items-center mt-2">
                    <div className="flex ">
                        {/* Repeat for other stars */}
                        {/* <span className="text-gray-300"> */}
                        {[...Array(5)].map((_, index) => (
                            <svg
                                key={index}
                                xmlns="http://www.w3.org/2000/svg"
                                className={`h-6 w-6 ${
                                    index < data.rating
                                        ? "text-yellow-400"
                                        : "text-gray-300"
                                }`}
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                // onClick={() => handleStarClick(index)}
                                style={{ cursor: "pointer" }}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9.362,9.158c0,0-3.16,0.35-5.268,0.584c-0.19,0.023-0.358,0.15-0.421,0.343s0,0.394,0.14,0.521    c1.566,1.429,3.919,3.569,3.919,3.569c-0.002,0-0.646,3.113-1.074,5.19c-0.036,0.188,0.032,0.387,0.196,0.506    c0.163,0.119,0.373,0.121,0.538,0.028c1.844-1.048,4.606-2.624,4.606-2.624s2.763,1.576,4.604,2.625    c0.168,0.092,0.378,0.09,0.541-0.029c0.164-0.119,0.232-0.318,0.195-0.505c-0.428-2.078-1.071-5.191-1.071-5.191    s2.353-2.14,3.919-3.566c0.14-0.131,0.202-0.332,0.14-0.524s-0.23-0.319-0.42-0.341c-2.108-0.236-5.269-0.586-5.269-0.586    s-1.31-2.898-2.183-4.83c-0.082-0.173-0.254-0.294-0.456-0.294s-0.375,0.122-0.453,0.294C10.671,6.26,9.362,9.158,9.362,9.158z"
                                />
                            </svg>
                        ))}
                        {/* </span> */}
                    </div>
                    <span className="ml-2 text-gray-500 font-semibold text-sm">
                        ({data.rating})
                    </span>
                </div>
            </div>
        </div>
    );
};
export default ProductCard;
