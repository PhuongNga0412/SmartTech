import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import * as ProductService from "@/services/ProductService";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import ProductCard from "@/components/Product/ProductCard";
import { Loading } from "@/components/LoadingComponent/Loading";
import { useDebounce } from "@/hook/useDebounce";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

const priceRanges = [
    { label: "Dưới 10 triệu", value: "0,10000000" },
    { label: "Từ 10 - 15 triệu", value: "10000000,15000000" },
    { label: "Từ 15 - 20 triệu", value: "15000000,20000000" },
    { label: "Từ 20 - 30 triệu", value: "20000000,30000000" },
];

const Products = () => {
    const [isOpen, setIsOpen] = useState(true); // State để kiểm soát hiển thị danh sách
    const [isOpenRangePrice, setIsOpenRangePrice] = useState(true); // State để kiểm soát hiển thị danh sách
    const [checked, setChecked] = useState([]);
    const [checkedPrice, setCheckedPrice] = useState([]);
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [typeProduct, setTypeProduct] = useState();
    const [pending, setPending] = useState(false);
    const searchProduct = useSelector((state) => state.product.search);
    const searchDebounce = useDebounce(searchProduct, 1000);
    const [sort, setSort] = useState("");
    const [paginate, setPaginate] = useState({
        limit: 9,
        page: 0,
        total: 1,
    });

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };
    const toggleDropdownPrice = () => {
        setIsOpenRangePrice(!isOpenRangePrice);
    };

    const handlePageClick = (data) => {
        setPaginate((prev) => ({ ...prev, page: data.selected }));
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    const fetchAllTypeProduct = async () => {
        const res = await ProductService.getAllTypeProduct();
        if (res?.status === "OK") {
            setTypeProduct(res?.data);
        }
    };

    useEffect(() => {
        fetchAllTypeProduct();
    }, []);

    const handleSortChange = (e) => {
        const selectedSort = e.target.value;
        setSort(selectedSort);

        // Gọi lại hàm để lấy sản phẩm mới với sort mới
        // fetchProducts({ filters: buildFilterQuery(), sort: selectedSort });
    };

    const handleCheck = (item) => {
        setPaginate((prev) => ({ ...prev, page: 0 }));
        setChecked((prev) => {
            const isChecked = checked.includes(item);
            if (isChecked) {
                return checked.filter((it) => it !== item);
            } else {
                return [...prev, item];
            }
        });
    };

    const handlePriceChange = (range) => {
        setPaginate((prev) => ({ ...prev, page: 0 }));
        setCheckedPrice((prev) => {
            const isChecked = checkedPrice.includes(range);
            if (isChecked) {
                return prev.filter((item) => item !== range);
            } else {
                return [...prev, range];
            }
        });
    };

    const buildFilterQuery = () => {
        const filters = [];
        let overallMin = Infinity; // Khởi tạo min lớn nhất
        let overallMax = -Infinity; // Khởi tạo max nhỏ nhất
        if (checked.length > 0) {
            filters.push(`filter=type,${checked.join(",")}`);
        }
        if (checked.length > 0) {
            filters.push(`filter=type,${checked.join(",")}`);
        }
        if (checkedPrice.length > 0) {
            checkedPrice.forEach((priceRange) => {
                const [minPrice, maxPrice] = priceRange.split(",").map(Number); // Tách minPrice và maxPrice
                if (minPrice < overallMin) overallMin = minPrice; // Cập nhật overallMin
                if (maxPrice > overallMax) overallMax = maxPrice; // Cập nhật overallMax
            });

            // Thêm bộ lọc giá chung vào filters
            filters.push(`filter=price,${overallMin},${overallMax}`);
        }
        if (minPrice && maxPrice) {
            filters.push(`filter=price,${minPrice},${maxPrice}`);
        } else if (minPrice) {
            filters.push(`filter=price,${minPrice},`); // Chỉ có giá tối thiểu
        } else if (maxPrice) {
            filters.push(`filter=price,0,${maxPrice}`); // Chỉ có giá tối đa
        }
        return filters;
    };

    const fetchProductAll = async (context) => {
        const limit = context?.queryKey && context?.queryKey[1];
        const search = context?.queryKey && context?.queryKey[2];
        const page = context?.queryKey && context?.queryKey[3];
        const filters = buildFilterQuery();
        console.log(search);
        const res = await ProductService.getAllProduct(
            search,
            limit,
            page,
            filters,
            sort
        );
        if (res?.status === "OK") {
            setPaginate((prev) => ({ ...prev, total: res?.totalPage }));
        }

        return res;
    };

    const minPriceDebounced = useDebounce(minPrice, 500);
    const maxPriceDebounced = useDebounce(maxPrice, 500);
    const { isLoading, data: products } = useQuery({
        queryKey: [
            "products",
            paginate?.limit,
            searchDebounce,
            paginate?.page,
            checked,
            checkedPrice,
            minPriceDebounced,
            maxPriceDebounced,
            sort,
        ],
        queryFn: fetchProductAll,
        retry: 3,
        retryDelay: 1000,
        // placeholderData: keepPreviousData,
    });
    console.log(products);

    return (
        <div>
            <div className="flex justify-between items-center mt-20 mb-6">
                <div className="uppercase font-bold text-sm">
                    <Link
                        to="/"
                        className="text-gray-500 hover:text-black hover:underline"
                    >
                        trang chủ
                    </Link>{" "}
                    / <span className="text-gray-700">sản phẩm</span>
                </div>
                <div className="text-sm flex items-center gap-2">
                    <span className="text-xs text-[#1a1a1a]">Sort by:</span>
                    <select
                        name="sort"
                        id="sort"
                        className="border max-w-[180px] min-w-[140px] border-gray outline-none cursor-pointer py-[4.5px] px-[10px] text-[#999]"
                        onChange={handleSortChange}
                        value={sort}
                    >
                        <option value="" disabled selected hidden>
                            Mới nhất
                        </option>
                        <option value="mostPopular">Mới nhất</option>
                        <option value="price">Giá thấp nhất</option>
                        <option value="-price">Giá cao nhất</option>
                    </select>
                </div>
            </div>
            <div className="flex gap-10">
                <div className="min-w-[264px]">
                    <div className="flex pt-[6px] pb-5 mb-5 justify-between border-b border-gray">
                        <span className="text-lg font-bold text-[#1a1a1a] dark:text-white">
                            Bộ lọc tìm kiếm
                        </span>
                        <button
                            className="text-xs"
                            onClick={() => setChecked([])}
                        >
                            Clean All
                        </button>
                    </div>
                    <div className="border-b border-gray pb-5 mb-5">
                        <div className="flex items-center justify-between">
                            <p>Danh mục</p>
                            <button onClick={toggleDropdown}>
                                {isOpen ? (
                                    <FiChevronUp className="w-5 h-5 text-[#1a1a1a]" />
                                ) : (
                                    <FiChevronDown className="w-5 h-5 text-[#1a1a1a]" />
                                )}
                            </button>
                        </div>

                        {isOpen && ( // Chỉ hiển thị danh sách nếu isOpen là true
                            <div className="pt-[10px] opacity-1">
                                {typeProduct?.map((item) => (
                                    <div
                                        key={item}
                                        className="text-[#1a1a1a] mb-2"
                                    >
                                        <input
                                            type="checkbox"
                                            id={item}
                                            className="w-4 h-4"
                                            checked={checked.includes(item)}
                                            onChange={() => handleCheck(item)}
                                        />
                                        <label htmlFor={item} className="ml-3">
                                            {item}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    <div>
                        <div className="flex items-center justify-between">
                            <p>Mức giá</p>
                            <button onClick={toggleDropdownPrice}>
                                {isOpenRangePrice ? (
                                    <FiChevronUp className="w-5 h-5 text-[#1a1a1a]" />
                                ) : (
                                    <FiChevronDown className="w-5 h-5 text-[#1a1a1a]" />
                                )}
                            </button>
                        </div>

                        {isOpenRangePrice && (
                            <div className="pt-[10px] pb-[20px] opacity-1">
                                {priceRanges?.map((range, index) => (
                                    <div
                                        key={index}
                                        className="text-[#1a1a1a] mb-2"
                                    >
                                        <input
                                            type="checkbox"
                                            id={range.value}
                                            // value={range.value}
                                            checked={checkedPrice.includes(
                                                range.value
                                            )}
                                            onChange={() =>
                                                handlePriceChange(range.value)
                                            }
                                            className="w-4 h-4"
                                        />
                                        <label
                                            htmlFor={range.value}
                                            className="ml-3"
                                        >
                                            {range.label}
                                        </label>
                                    </div>
                                ))}

                                <p className="text-sm text-[#1a1a1a] mb-2">
                                    Hoặc nhập khoảng giá phù hợp với bạn:
                                </p>
                                <div className="flex gap-2">
                                    <input
                                        type="number"
                                        placeholder="Giá tối thiểu"
                                        value={minPrice}
                                        onChange={(e) =>
                                            setMinPrice(e.target.value)
                                        }
                                        className="max-w-[130px] border p-1"
                                    />
                                    <input
                                        type="number"
                                        placeholder="Giá tối đa"
                                        value={maxPrice}
                                        onChange={(e) =>
                                            setMaxPrice(e.target.value)
                                        }
                                        className="max-w-[130px] border p-1"
                                    />
                                </div>
                                {/* <button
                                    onClick={handleFilterByPrice}
                                    className="btn-search"
                                >
                                    Tìm kiếm
                                </button> */}
                            </div>
                        )}
                    </div>
                </div>
                <div className="w-full">
                    <Loading
                        className="m-auto"
                        isLoading={isLoading || pending}
                    >
                        {products?.data.length !== 0 ? (
                            <div>
                                <div className="flex flex-wrap gap-[28px] mt-[79px]">
                                    {products?.data?.map((product) => (
                                        <div key={product._id}>
                                            <ProductCard data={product} />
                                        </div>
                                    ))}
                                </div>
                                <div className="flex justify-center mt-14">
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
                                </div>
                            </div>
                        ) : (
                            <div>Không có kết quả phù hợp</div>
                        )}
                    </Loading>
                </div>
            </div>
        </div>
    );
};
export default Products;
