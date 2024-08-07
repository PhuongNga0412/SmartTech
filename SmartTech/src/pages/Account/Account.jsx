const Account = () => {
    return (
        <div>
            <div className="text-sm my-20">Home / My Account</div>
            <div className="flex">
                {/* Sidebar */}
                <div className="w-1/4">
                    <nav className="space-y-4">
                        <div className="font-medium">Manage My Account</div>
                        <ul className="space-y-2 pl-9">
                            <li>
                                <a href="#" className="text-red-500 ">
                                    My Profile
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-700">
                                    Address Book
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-700">
                                    My Payment Options
                                </a>
                            </li>
                        </ul>
                        <div className="font-medium  mt-6">My Orders</div>
                        <ul className="space-y-2 pl-9">
                            <li>
                                <a href="#" className="text-gray-700">
                                    My Returns
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-700">
                                    My Cancellations
                                </a>
                            </li>
                        </ul>
                        <div className="font-medium mt-6">My WishList</div>
                    </nav>
                </div>

                {/* Main Content */}
                <div className="w-3/4 p-8 border border-gray-200 rounded-lg">
                    <h2 className="text-xl font-medium text-red-500 mb-6">
                        Edit Your Profile
                    </h2>
                    <form className="space-y-4">
                        <div className="flex space-x-4">
                            <div className="w-1/2">
                                <label className="block mb-2">First Name</label>
                                <input
                                    type="text"
                                    className="w-full p-3 border rounded"
                                    placeholder="Md"
                                />
                            </div>
                            <div className="w-1/2">
                                <label className="block mb-2">Last Name</label>
                                <input
                                    type="text"
                                    className="w-full p-3 border rounded"
                                    placeholder="Rimel"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block mb-2">Email</label>
                            <input
                                type="email"
                                className="w-full p-3 border rounded"
                                placeholder="rimel11@gmail.com"
                            />
                        </div>
                        <div>
                            <label className="block mb-2">Address</label>
                            <input
                                type="text"
                                className="w-full p-3 border rounded"
                                placeholder="Kingston, 5236, United States"
                            />
                        </div>
                        <div className="mt-6">
                            <div className="space-y-4">
                                <div>
                                    <label className="block mb-2">
                                        Password Changes
                                    </label>
                                    <input
                                        type="password"
                                        className="w-full p-3 border rounded"
                                        placeholder="Current Password"
                                    />
                                </div>
                                <input
                                    type="password"
                                    className="w-full p-3 border rounded"
                                    placeholder="New Password"
                                />
                                <input
                                    type="password"
                                    className="w-full p-3 border rounded"
                                    placeholder="Confirm New Password"
                                />
                            </div>
                        </div>
                        <div className="flex justify-end space-x-4 mt-6">
                            <button type="button" className="mr-8">
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="bg-red-500 text-white font-medium px-12 py-4 rounded"
                            >
                                Save Changes
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
export default Account;
