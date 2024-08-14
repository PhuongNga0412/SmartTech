import ProductCard from "@/components/Product/ProductCard";

const ProductMonth = (products) => {
    return (
        <div className="mb-[140px]">
            <div className="flex items-center gap-4">
                <div className="w-[20px] h-[40px] bg-red-500 rounded"></div>
                <h3 className="font-semibold text-red-500">This Month</h3>
            </div>
            <h2 className="font-semibold text-4xl mt-5 mb-14">
                Best Selling Products
            </h2>
            <div className="flex flex-wrap gap-7">
                {products?.products?.map((item) => (
                    <ProductCard key={item._id} data={item} />
                ))}
            </div>
        </div>
    );
};
export default ProductMonth;
