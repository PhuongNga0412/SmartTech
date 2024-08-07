import ProductCard from "@/components/Product/ProductCard";

const products = [
    {
        id: 1,
        title: "The north coat",
        price: 260,
        cost: 360,
        reviews: 65,
    },
    {
        id: 2,
        title: "Gucci duffle bag",
        price: 960,
        cost: 1160,
        reviews: 65,
    },
    {
        id: 3,
        title: "RGB liquid CPU Cooler",
        price: 160,
        cost: 170,
        reviews: 65,
    },
    {
        id: 4,
        title: "Small BookSelf",
        price: 360,
        cost: 1160,
        reviews: 65,
    },
];

const ProductMonth = () => {
    return (
        <div className="mb-[140px]">
            <div className="flex items-center gap-4">
                <div className="w-[20px] h-[40px] bg-red-500 rounded"></div>
                <h3 className="font-semibold text-red-500">This Month</h3>
            </div>
            <h2 className="font-semibold text-4xl mt-5 mb-14">
                Best Selling Products
            </h2>
            <div className="flex gap-[30px]">
                {products.map((item) => (
                    <ProductCard key={item.id} data={item} />
                ))}
            </div>
        </div>
    );
};
export default ProductMonth;
