import { useEffect, useState } from "react";
import * as ProductService from "@/services/ProductService";
import ProductCard from "@/components/Product/ProductCard";
import { Loading } from "@/components/LoadingComponent/Loading";
import { Link, useLocation, useParams } from "react-router-dom";

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
    console.log(products);
    const type = useParams();
    console.log(type?.type);

    useEffect(() => {
        if (state) {
            fetchProductType(state);
        }
    }, [state]);

    return (
        <div>
            <div className="uppercase font-bold mt-20 mb-6 text-sm">
                <Link
                    to="/"
                    className="text-gray-500 hover:text-black hover:underline"
                >
                    trang chủ
                </Link>{" "}
                / <span className="text-gray-700">{type?.type}</span>
            </div>
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
                    Xem thêm
                </button>
            </Loading>
        </div>
    );
};
export default TypeProduct;
