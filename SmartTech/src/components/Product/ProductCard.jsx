import { ProductCardHeartIcon, ProductCardViewIcon } from "@/icons";

const ProductCard = ({ data }) => {
    return (
        <div>
            <div className="max-w-[270px] max-h-[250px]">
                <div className="group relative border border-gray-300 rounded">
                    {data.discount && (
                        <span className="absolute top-3 left-3 bg-red-500 text-white text-xs rounded px-3 py-1">
                            {data.discount}%
                        </span>
                    )}
                    <div className="absolute top-2 right-2 flex flex-col items-center space-y-2">
                        <button className="bg-white rounded-full w-[34px] h-[34px] flex justify-center items-center shadow-md">
                            {ProductCardHeartIcon}
                        </button>
                        <button className="bg-white rounded-full w-[34px] h-[34px] flex justify-center items-center shadow-md">
                            {ProductCardViewIcon}
                        </button>
                    </div>
                    <img
                        src="https://i.pinimg.com/564x/82/39/18/823918e015243ab53be190ab33abd994.jpg"
                        alt="Product"
                        className="w-full h-auto object-cover rounded"
                    />
                    <button className="absolute hidden bottom-0 bg-black text-white w-full py-2 rounded mt-4 font-bold group-hover:block">
                        Add To Cart
                    </button>
                </div>
                <div className="mt-4">
                    <h3 className="font-medium text-base">{data.title}</h3>
                    <div className="flex items-center space-x-2">
                        <span className="text-red-500 font-medium text-base">
                            ${data.price}
                        </span>
                        <span className="line-through text-gray-500">
                            ${data.cost}
                        </span>
                    </div>
                    <div className="flex items-center mt-2">
                        <div className="flex space-x-1">
                            <span className="text-yellow-400">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path d="M9.049 2.927a1 1 0 011.902 0l1.234 3.792a1 1 0 00.95.69h3.998a1 1 0 01.592 1.806l-3.25 2.293a1 1 0 00-.364 1.118l1.235 3.792a1 1 0 01-1.541 1.118l-3.25-2.293a1 1 0 00-1.175 0l-3.25 2.293a1 1 0 01-1.541-1.118l1.234-3.792a1 1 0 00-.364-1.118L2.213 9.215a1 1 0 01.592-1.806h3.998a1 1 0 00.95-.69l1.234-3.792z" />
                                </svg>
                            </span>
                            {/* Repeat for other stars */}
                            <span className="text-gray-300">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path d="M9.049 2.927a1 1 0 011.902 0l1.234 3.792a1 1 0 00.95.69h3.998a1 1 0 01.592 1.806l-3.25 2.293a1 1 0 00-.364 1.118l1.235 3.792a1 1 0 01-1.541 1.118l-3.25-2.293a1 1 0 00-1.175 0l-3.25 2.293a1 1 0 01-1.541-1.118l1.234-3.792a1 1 0 00-.364-1.118L2.213 9.215a1 1 0 01.592-1.806h3.998a1 1 0 00.95-.69l1.234-3.792z" />
                                </svg>
                            </span>
                        </div>
                        <span className="ml-2 text-gray-500 font-semibold text-sm">
                            ({data.reviews})
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default ProductCard;
