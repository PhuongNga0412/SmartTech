import { Loading } from "@/components/LoadingComponent/Loading";
import ProductCard from "@/components/Product/ProductCard";
import { useNavigate } from "react-router-dom";

const ProductMonth = ({ products, isLoading }) => {
    const navigate = useNavigate();
    return (
        <div className="mb-[140px]">
            <div className="flex items-center gap-4">
                <div className="w-[20px] h-[40px] bg-red-500 rounded"></div>
                <h3 className="font-semibold text-red-500">This Month</h3>
            </div>
            <h2 className="font-semibold text-4xl mt-5 mb-14">
                Best Selling Products
            </h2>
            <Loading isLoading={isLoading}>
                <div className="flex flex-wrap gap-7">
                    {products?.map((item) => (
                        <ProductCard key={item._id} data={item} />
                    ))}
                </div>
            </Loading>
            <button
                onClick={() => navigate("/product")}
                className="block mx-auto mt-14 py-4 px-5 rounded bg-red-500 font-medium text-white"
            >
                Xem tất cả sản phẩm
            </button>
        </div>
    );
};
export default ProductMonth;
