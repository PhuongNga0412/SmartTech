import { useEffect, useState } from "react";
import * as ProductService from "@/services/ProductService";
import ProductCard from "@/components/Product/ProductCard";
import { Loading } from "@/components/LoadingComponent/Loading";
import { useLocation } from "react-router-dom";

const TypeProduct = () => {
    const { state } = useLocation();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchProductType = async (type) => {
        setLoading(true);
        const res = await ProductService.getProductType(type);
        if (res?.status === "OK") {
            setLoading(false);
            setProducts(res?.data);
        } else {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (state) {
            fetchProductType(state);
        }
    }, [state]);

    return (
        <Loading isLoading={loading}>
            <div className="flex flex-wrap gap-[28px] mt-[79px]">
                {products?.map((product) => (
                    <ProductCard key={product._id} data={product} />
                ))}
            </div>
            <button
                disabled={products?.total === products?.data?.length}
                // onClick={() => setLimit((prev) => prev + 8)}
                className={`block mx-auto mt-14 py-4 px-5 rounded font-medium text-white ${
                    products?.total === products?.data?.length
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-red-500 hover:bg-red-600"
                }`}
            >
                Load More
            </button>
        </Loading>
    );
};
export default TypeProduct;
