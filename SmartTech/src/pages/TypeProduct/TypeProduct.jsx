import { useState } from "react";
import * as ProductService from "@/services/ProductService";
import ProductCard from "@/components/Product/ProductCard";
import { Loading } from "@/components/LoadingComponent/Loading";
import { Link, useParams } from "react-router-dom";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { useDebounce } from "@/hook/useDebounce";

const TypeProduct = () => {
    const [loading, setLoading] = useState(false);

    const type = useParams();

    const [paginate, setPaginate] = useState({
        limit: 8,
        page: 0,
        total: 1,
    });

    const searchProduct = useSelector((state) => state.product.search);
    const searchDebounce = useDebounce(searchProduct, 1000);

    const fetchProductAll = async (context) => {
        console.log(context);
        const type = context?.queryKey && context?.queryKey[1];
        const limit = context?.queryKey && context?.queryKey[2];
        const search = context?.queryKey && context?.queryKey[3];
        const page = context?.queryKey && context?.queryKey[4];
        const res = await ProductService.getProductType(
            type,
            search,
            limit,
            page
        );

        if (res?.status === "OK") {
            setPaginate((prev) => ({ ...prev, total: res?.totalPage }));
        }

        return res;
    };

    const { isLoading, data: products } = useQuery({
        queryKey: [
            "products",
            type?.type,
            paginate?.limit,
            searchDebounce,
            paginate?.page,
        ],
        queryFn: fetchProductAll,
        retry: 3,
        retryDelay: 1000,
        placeholderData: keepPreviousData,
    });

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
                    {products?.data?.map((product) => (
                        <ProductCard key={product._id} data={product} />
                    ))}
                </div>
                {/* <div className="flex justify-center mt-14">
                    <ReactPaginate
                        previousLabel={"< previous"}
                        nextLabel={"next >"}
                        breakLabel="..."
                        pageCount={paginate?.total}
                        pageRangeDisplayed={3}
                        forcePage={paginate?.page}
                        onPageChange={handlePageClick}
                        activeClassName="text-red-700 font-bold dark:text-red-700 "
                        containerClassName="inline-flex -space-x-px text-sm"
                        pageLinkClassName="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                        previousLinkClassName="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                        nextLinkClassName="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                        breakLinkClassName="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                        activeLinkClassName="flex items-center justify-center px-3 h-8 text-red-700 font-semibold border-gray-300 bg-red-100 dark:text-red-700 "
                    />
                </div> */}
                <button
                    disabled={products?.total === products?.data?.length}
                    onClick={() =>
                        setPaginate((prev) => ({
                            ...prev,
                            limit: prev.limit + 8,
                        }))
                    }
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
