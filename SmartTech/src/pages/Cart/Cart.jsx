const Cart = () => {
    return (
        <div className="p-8">
            {/* Breadcrumb */}
            <div className="mb-6 text-sm">
                <a href="#" className="text-gray-500">
                    Home
                </a>{" "}
                / <span className="text-gray-700">Cart</span>
            </div>

            {/* Cart Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border rounded-lg">
                    <thead>
                        <tr className="w-full bg-gray-100 border-b">
                            <th className="p-4 text-left">Product</th>
                            <th className="p-4 text-left">Price</th>
                            <th className="p-4 text-left">Quantity</th>
                            <th className="p-4 text-left">Subtotal</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-b">
                            <td className="p-4 flex items-center">
                                <img
                                    src="https://via.placeholder.com/50"
                                    alt="LCD Monitor"
                                    className="w-12 h-12 mr-4"
                                />
                                LCD Monitor
                            </td>
                            <td className="p-4">$650</td>
                            <td className="p-4">
                                <input
                                    type="number"
                                    className="border w-12 p-2 rounded"
                                ></input>
                            </td>
                            <td className="p-4">$650</td>
                        </tr>
                        <tr className="border-b">
                            <td className="p-4 flex items-center">
                                <img
                                    src="https://via.placeholder.com/50"
                                    alt="HI Gamepad"
                                    className="w-12 h-12 mr-4"
                                />
                                HI Gamepad
                            </td>
                            <td className="p-4">$550</td>
                            <td className="p-4">
                                <input
                                    type="number"
                                    className="border w-12 p-2 rounded"
                                ></input>
                            </td>
                            <td className="p-4">$1100</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* Buttons */}
            <div className="flex justify-between mt-6">
                <button className="font-medium border border-gray-700 px-12 py-4 rounded">
                    Return To Shop
                </button>
                <button className="font-medium border border-gray-700 px-12 py-4 rounded">
                    Update Cart
                </button>
            </div>

            {/* Coupon and Cart Total */}
            <div className="flex justify-between mt-8">
                {/* Coupon */}
                <div className="flex gap-4 items-start">
                    <input
                        type="text"
                        placeholder="Coupon Code"
                        className="py-4 pl-6 pr-40 border rounded"
                    />
                    <button className="bg-red-500 text-white font-medium rounded py-4 px-12">
                        Apply Coupon
                    </button>
                </div>

                {/* Cart Total */}
                <div className="min-w-[470px] px-6 py-8 border rounded-lg">
                    <h2 className="text-xl font-medium mb-6">Cart Total</h2>
                    <div className="flex justify-between mb-2 border-b pb-4">
                        <span>Subtotal:</span>
                        <span>$1750</span>
                    </div>
                    <div className="flex justify-between border-b pb-4">
                        <span>Shipping:</span>
                        <span>Free</span>
                    </div>
                    <div className="flex justify-between mt-4">
                        <span>Total:</span>
                        <span>$1750</span>
                    </div>
                    <div className="flex justify-center">
                        <button className="bg-red-500 text-white font-medium px-12 py-4 rounded mt-4">
                            Proceed to checkout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Cart;
