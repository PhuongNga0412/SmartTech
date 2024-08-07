const NewArrival = () => {
    return (
        <div className="mb-[140px]">
            <div className="flex items-center gap-4">
                <div className="w-[20px] h-[40px] bg-red-500 rounded"></div>
                <h3 className="font-semibold text-red-500">Featured</h3>
            </div>
            <h2 className="font-semibold text-4xl mt-5 mb-14">New Arrival</h2>
            <div className="h-[600px] my-10 grid grid-cols-1 md:grid-cols-2 gap-[30px]">
                <div className="relative bg-black text-white rounded">
                    <img
                        className="w-full h-full object-cover"
                        src="https://moviesgamesandtech.com/wp-content/uploads/2020/10/PS5.jpg"
                        alt=""
                    />
                    <div className="absolute text-black bottom-8 left-8">
                        <div>
                            <h2 className="text-2xl font-bold">
                                PlayStation 5
                            </h2>
                            <p className="mt-2">
                                Black and White version of the PS5 coming out on
                                sale.
                            </p>
                        </div>
                        <div className="mt-4">
                            <a
                                href="#"
                                className="underline hover:text-gray-400"
                            >
                                Shop Now
                            </a>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-[30px] ">
                    <div className=" flex-1 relative bg-black text-white rounded">
                        <img
                            className="w-full h-full"
                            src="https://moviesgamesandtech.com/wp-content/uploads/2020/10/PS5.jpg"
                            alt=""
                        />
                        <div className="absolute text-black bottom-8 left-8">
                            <div>
                                <h2 className="text-2xl font-bold">
                                    PlayStation 5
                                </h2>
                                <p className="mt-2">
                                    Black and White version of the PS5 coming
                                    out on sale.
                                </p>
                            </div>
                            <div className="mt-4">
                                <a
                                    href="#"
                                    className="underline hover:text-gray-400"
                                >
                                    Shop Now
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-[30px]">
                        <div className=" flex-1 relative bg-black text-white rounded">
                            <img
                                className="w-full h-full"
                                src="https://moviesgamesandtech.com/wp-content/uploads/2020/10/PS5.jpg"
                                alt=""
                            />
                            <div className="absolute text-black bottom-8 left-8">
                                <div>
                                    <h2 className="text-2xl font-bold">
                                        PlayStation 5
                                    </h2>
                                    <p className="mt-2">
                                        Black and White version of the PS5
                                        coming out on sale.
                                    </p>
                                </div>
                                <div className="mt-4">
                                    <a
                                        href="#"
                                        className="underline hover:text-gray-400"
                                    >
                                        Shop Now
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="flex-1 relative bg-black text-white rounded">
                            <img
                                className="w-full h-full"
                                src="https://moviesgamesandtech.com/wp-content/uploads/2020/10/PS5.jpg"
                                alt=""
                            />
                            <div className="absolute text-black bottom-8 left-8">
                                <div>
                                    <h2 className="text-2xl font-bold">
                                        PlayStation 5
                                    </h2>
                                    <p className="mt-2">
                                        Black and White version of the PS5
                                        coming out on sale.
                                    </p>
                                </div>
                                <div className="mt-4">
                                    <a
                                        href="#"
                                        className="underline hover:text-gray-400"
                                    >
                                        Shop Now
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default NewArrival;
