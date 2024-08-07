import {
    CategoryCamera,
    CategoryCellphone,
    CategoryComputer,
    CategoryGamepad,
    CategoryHeadphone,
    CategorySmartwatch,
} from "@/icons";

const Category = () => {
    return (
        <div>
            <div className="flex items-center gap-4">
                <div className="w-[20px] h-[40px] bg-red-500 rounded"></div>
                <h3 className="font-semibold text-red-500">Categories</h3>
            </div>
            <h2 className="font-semibold text-4xl mt-5 mb-[60px]">
                Browse By Category
            </h2>
            <div className="flex justify-between">
                <div className="flex flex-col justify-center items-center w-[170px] h-[145px] border-2 border-gray-400 rounded group hover:bg-red-500 hover:text-white">
                    <div className="hover:stroke-white">
                        {CategoryCellphone}
                    </div>
                    <p className="mt-4 font-medium">Phones</p>
                </div>

                <div className="flex flex-col justify-center items-center w-[170px] h-[145px] border-2 border-gray-400 rounded group hover:bg-red-500 hover:text-white">
                    <div className="hover:stroke-white">{CategoryComputer}</div>
                    <p className="mt-4 font-medium">Computers</p>
                </div>
                <div className="flex flex-col justify-center items-center w-[170px] h-[145px] border-2 border-gray-400 rounded group hover:bg-red-500 hover:text-white">
                    <div className="hover:stroke-white">
                        {CategorySmartwatch}
                    </div>
                    <p className="mt-4 font-medium">SmartWatch</p>
                </div>
                <div className="flex flex-col justify-center items-center w-[170px] h-[145px] border-2 border-gray-400 rounded group hover:bg-red-500 hover:text-white">
                    <div className="hover:stroke-white">{CategoryCamera}</div>
                    <p className="mt-4 font-medium">Camera</p>
                </div>
                <div className="flex flex-col justify-center items-center w-[170px] h-[145px] border-2 border-gray-400 rounded group hover:bg-red-500 hover:text-white">
                    <div className="hover:stroke-white">
                        {CategoryHeadphone}
                    </div>
                    <p className="mt-4 font-medium">HeadPhones</p>
                </div>
                <div className="flex flex-col justify-center items-center w-[170px] h-[145px] border-2 border-gray-400 rounded group hover:bg-red-500 hover:text-white">
                    <div className="hover:stroke-white">{CategoryGamepad}</div>
                    <p className="mt-4 font-medium">Gaming</p>
                </div>
            </div>
            <div className="h-[1px] my-16 bg-slate-300"></div>
        </div>
    );
};
export default Category;
