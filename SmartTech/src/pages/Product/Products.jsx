import { useState } from "react";
import { useSelector } from "react-redux";
import * as ProductService from "@/services/ProductService";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import ProductCard from "@/components/Product/ProductCard";
import { Loading } from "@/components/LoadingComponent/Loading";
import { useDebounce } from "@/hook/useDebounce";

const Products = () => {
    const [pending, setPending] = useState(false);
    const [limit, setLimit] = useState(8);
    const searchProduct = useSelector((state) => state.product.search);
    const searchDebounce = useDebounce(searchProduct, 1000);

    const fetchProductAll = async (context) => {
        const limit = context?.queryKey && context?.queryKey[1];
        const search = context?.queryKey && context?.queryKey[2];
        const res = await ProductService.getAllProduct(search, limit);
        // if (search?.length > 0 || refSearch.current) {
        //     setStateProduct(res?.data);
        //     return [];
        // } else {
        //     return res;
        // }
        return res;
    };

    const { isLoading, data: products } = useQuery({
        queryKey: ["products", limit, searchDebounce],
        queryFn: fetchProductAll,
        retry: 3,
        retryDelay: 1000,
        placeholderData: keepPreviousData,
    });

    // useEffect(() => {
    //     if (refSearch.current) {
    //         setPending(true);
    //         fetchProductAll(searchDebounce);
    //     }
    //     refSearch.current = true;
    //     setPending(false);
    // }, [searchDebounce]);

    // useEffect(() => {
    //     if (products?.data?.length > 0) {
    //         setStateProduct(products?.data);
    //     }
    // }, [products]);

    return (
        <Loading className="m-auto" isLoading={isLoading || pending}>
            <div className="flex flex-wrap gap-[28px] mt-[79px]">
                {products?.data?.map((product) => (
                    <ProductCard key={product._id} data={product} />
                ))}
            </div>
            <button
                disabled={products?.total === products?.data?.length}
                onClick={() => setLimit((prev) => prev + 8)}
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
export default Products;
