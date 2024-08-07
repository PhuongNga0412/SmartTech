import ProductCard from "@/components/Product/ProductCard";
import {
    DeliveryIcon,
    HeartIcon,
    IconDelivery,
    IconMinus,
    IconPlus,
    IconReturn,
    Wishlist,
} from "@/icons";

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

const ProductDetail = () => {
    return (
        <div>
            <div className="text-sm text-gray-500 mt-[80px]">
                Account / Gaming / Havic HV G-92 Gamepad
            </div>
            <div className="bg-white flex gap-[70px] mt-[80px] mb-[140px]">
                <div className="flex gap-[30px]">
                    <div className="flex flex-col gap-4 min-w-[170px]">
                        <img
                            src="https://i.pinimg.com/564x/d0/b3/e3/d0b3e38e9db5136bdb1bd847c8f67f9a.jpg"
                            alt="Product 1"
                            className="h-[138px] object-cover rounded"
                        />
                        <img
                            src="https://i.pinimg.com/564x/84/af/f8/84aff8a9bca9d3b3f6a50b747d89a943.jpg"
                            alt="Product 2"
                            className="h-[138px] object-cover rounded"
                        />
                        <img
                            src="https://i.pinimg.com/564x/d7/4b/97/d74b977257d1e3dc36237cab17fd1f19.jpg"
                            alt="Product 3"
                            className="h-[138px] object-cover rounded"
                        />
                        <img
                            src="https://i.pinimg.com/564x/d7/4b/97/d74b977257d1e3dc36237cab17fd1f19.jpg"
                            alt="Product 3"
                            className="h-[138px] object-cover rounded"
                        />
                    </div>
                    <div>
                        <img
                            src="https://i.pinimg.com/736x/dd/9f/b3/dd9fb398c6e5c4fa30e695feb6dbb9d1.jpg"
                            alt="Product 4"
                            className="min-w-[500px] h-full object-cover rounded"
                        />
                    </div>
                </div>
                <div className="pl-6">
                    <div className="flex justify-between items-center">
                        <h1 className="text-2xl font-semibold">
                            Havic HV G-92 Gamepad
                        </h1>
                    </div>
                    <div className="mt-4 flex items-center">
                        <span className="text-yellow-500">
                            &#9733;&#9733;&#9733;&#9733;&#9734;
                        </span>
                        <span className="text-sm text-gray-500 ml-2">
                            (150 Reviews)
                        </span>
                        <span className="text-sm text-green-500 ml-4">
                            In Stock
                        </span>
                    </div>
                    <div className="mt-4 text-2xl">$192.00</div>
                    <p className="mt-6 text-sm ">
                        PlayStation 5 Controller Skin High quality vinyl with
                        air channel adhesive for easy bubble free install & mess
                        free removal Pressure sensitive.
                    </p>
                    <div className="h-[0.5px] mt-6 bg-black"></div>
                    <div className="mt-6 flex items-center gap-6">
                        <label className="block text-xl">Colours:</label>
                        <div className="mt-1 flex space-x-2">
                            <button className="w-6 h-6 bg-red-500 rounded-full border border-gray-300 focus:outline-none"></button>
                            <button className="w-6 h-6 bg-gray-300 rounded-full border border-gray-300 focus:outline-none"></button>
                        </div>
                    </div>
                    <div className="mt-6 flex gap-6 items-center">
                        <label className="block text-xl">Size:</label>
                        <div className="mt-1 flex space-x-2">
                            {["XS", "S", "M", "L", "XL"].map((size) => (
                                <button
                                    key={size}
                                    className="h-8 w-8 border border-gray-300 rounded text-sm text-center font-medium text-gray-700 focus:outline-none hover:bg-red-500 hover:text-white"
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="mt-6 flex items-center space-x-4">
                        <div className="flex items-center border border-gray-300 rounded-md">
                            <button className="px-3 py-[10px] text-gray-600">
                                {IconMinus}
                            </button>
                            <span className="px-4 text-xl font-medium">2</span>
                            <button className="px-3 py-[10px] text-gray-600">
                                {IconPlus}
                            </button>
                        </div>
                        <button className="px-12 py-[10px] font-medium bg-red-500 text-white rounded">
                            Buy Now
                        </button>
                        <button className="px-1 border border-gray-300 rounded">
                            {Wishlist}
                        </button>
                    </div>
                    <div className="mt-10">
                        <div className="flex items-center gap-4 pl-4 pb-4 pt-6 border border-black rounded-t">
                            <div>{IconDelivery}</div>
                            <div className="ml-3 text-sm ">
                                <p className="font-medium mb-2">
                                    Free Delivery
                                </p>
                                <p className="text-xs">
                                    Enter your postal code for Delivery
                                    Availability
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center pt-4 pl-4 pb-6 gap-4 border-x border-b border-black rounded-b">
                            <div>{IconReturn}</div>
                            <div className="ml-3 text-sm ">
                                <p className="font-medium mb-2">
                                    Return Delivery
                                </p>
                                <p className="text-xs">
                                    Free 30 Days Delivery Returns. Details
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mb-[140px]">
                <div className="flex items-center gap-4 mb-[60px]">
                    <div className="w-[20px] h-[40px] bg-red-500 rounded"></div>
                    <h3 className="font-semibold text-red-500">Related Item</h3>
                </div>
                <div className="flex gap-[30px]">
                    {products.map((item) => (
                        <ProductCard key={item.id} data={item} />
                    ))}
                </div>
            </div>
        </div>
    );
};
export default ProductDetail;
