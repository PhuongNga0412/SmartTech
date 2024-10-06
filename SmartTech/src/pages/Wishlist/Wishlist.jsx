import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getWishlist } from "@/services/WishlistService";
import ProductCard from "@/components/Product/ProductCard";
import { Link } from "react-router-dom";
import { removeWishlistProduct } from "@/redux/slides/wishlistSlide";

const Wishlist = () => {
    const [wishlist, setWishlist] = useState([]);
    const user = useSelector((state) => state.user);

    useEffect(() => {
        const fetchWishlist = async () => {
            if (user?.id) {
                try {
                    const response = await getWishlist(user.id);
                    console.log(response);
                    setWishlist(response.products);
                } catch (error) {
                    console.error("Failed to fetch wishlist:", error);
                }
            }
        };

        fetchWishlist();
    }, [user?.id]);

    return (
        <div>
            <div className="uppercase font-bold text-sm mt-[79px] mb-[42px]">
                <Link
                    to="/"
                    className="text-gray-500 hover:text-black hover:underline"
                >
                    trang chủ
                </Link>{" "}
                / <span className="text-gray-700">wishlist</span>
            </div>
            {wishlist.length === 0 ? (
                <p className="uppercase text-center font-bold text-3xl py-10 text-gray-600">
                    không có sản phẩm nào trong wishlist
                </p>
            ) : (
                <ul className="flex flex-wrap gap-[28px] mt-[79px]">
                    {wishlist.map((product) => (
                        <ProductCard key={product._id} data={product} />
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Wishlist;
