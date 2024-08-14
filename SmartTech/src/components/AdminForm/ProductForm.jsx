import InputComponent from "@/components/InputComponent/InputComponent";
import { useEffect, useState } from "react";
import * as ProductService from "@/services//ProductService";
import { useMutationHooks } from "@/hook/useMutationHooks";
import { toast } from "react-toastify";

export function ProductForm({ onCloseModal }) {
    const [stateProduct, setStateProduct] = useState({
        name: "",
        image: "",
        type: "",
        price: "",
        countInStock: "",
        rating: "",
        description: "",
        discount: "",
        basePrice: "",
    });
    const handleOnChange = (e) => {
        setStateProduct({
            ...stateProduct,
            [e.target.name]: e.target.value,
        });
    };

    const handleChangeAvatar = async (event) => {
        const file = event.target.files[0];
        const base64 = await convertBase64(file);
        setStateProduct({
            ...stateProduct,
            image: base64,
        });
    };

    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            console.log(fileReader);
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                resolve(fileReader.result);
            };
            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };

    const mutation = useMutationHooks((data) => {
        const {
            name,
            image,
            type,
            price,
            countInStock,
            rating,
            description,
            discount,
            basePrice,
        } = data;
        const res = ProductService.createProduct({
            name,
            image,
            type,
            price,
            countInStock,
            rating,
            description,
            discount,
            basePrice,
        });
        return res;
    });
    const { data, isSuccess, isError } = mutation;
    console.log(data);
    useEffect(() => {
        if (isSuccess && data?.status === "OK") {
            toast.success("create ook");
            setStateProduct({
                name: "",
                image: "",
                type: "",
                price: "",
                countInStock: "",
                rating: "",
                description: "",
                discount: "",
                basePrice: "",
            });
            onCloseModal();
        } else if (isError) {
            toast.error("create fail");
        }
    }, [isSuccess]);

    const handleSubmit = (e) => {
        e.preventDefault();
        mutation.mutate(stateProduct);
    };

    return (
        <form
            onSubmit={handleSubmit}
            // className="container bg-white w-full h-[80%] max-w-lg mx-auto rounded-lg shadow py-6 px-8 relative overflow-auto"
        >
            <h3 className="uppercase text-2xl font-semibold py-4">
                Add Product
            </h3>
            <div className="flex flex-wrap -mx-3 mb-6">
                <div className="relative w-full px-3">
                    <label
                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                    >
                        product name
                    </label>
                    <InputComponent
                        value={stateProduct.name}
                        onChange={handleOnChange}
                        name="name"
                    />
                    {/* <p className="italic text-red-500 text-xs absolute -bottom-5">
                            {message.address}
                        </p> */}
                </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
                <div className="relative w-full px-3">
                    <label
                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                    >
                        type
                    </label>
                    <InputComponent
                        value={stateProduct.type}
                        onChange={handleOnChange}
                        name="type"
                    />
                    {/* <p className="italic text-red-500 text-xs absolute -bottom-5">
                            {message.address}
                        </p> */}
                </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
                <div className="relative w-full px-3">
                    <label
                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                    >
                        price
                    </label>
                    <InputComponent
                        value={stateProduct.price}
                        onChange={handleOnChange}
                        name="price"
                    />
                    {/* <p className="italic text-red-500 text-xs absolute -bottom-5">
                            {message.address}
                        </p> */}
                </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
                <div className="relative w-full px-3">
                    <label
                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                    >
                        rating
                    </label>
                    <InputComponent
                        value={stateProduct.rating}
                        onChange={handleOnChange}
                        name="rating"
                    />
                    {/* <p className="italic text-red-500 text-xs absolute -bottom-5">
                            {message.address}
                        </p> */}
                </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
                <div className="relative w-full px-3">
                    <label
                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                    >
                        description
                    </label>
                    <InputComponent
                        value={stateProduct.description}
                        onChange={handleOnChange}
                        name="description"
                    />
                    {/* <p className="italic text-red-500 text-xs absolute -bottom-5">
                            {message.address}
                        </p> */}
                </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
                <div className="relative w-full px-3">
                    <label
                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                    >
                        discount
                    </label>
                    <InputComponent
                        value={stateProduct.discount}
                        onChange={handleOnChange}
                        name="discount"
                    />
                    {/* <p className="italic text-red-500 text-xs absolute -bottom-5">
                            {message.address}
                        </p> */}
                </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
                <div className="relative w-full px-3">
                    <label
                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                    >
                        base Price
                    </label>
                    <InputComponent
                        value={stateProduct.basePrice}
                        onChange={handleOnChange}
                        name="basePrice"
                    />
                    {/* <p className="italic text-red-500 text-xs absolute -bottom-5">
                            {message.address}
                        </p> */}
                </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
                <div className="relative w-full px-3">
                    <label
                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                    >
                        count in stock
                    </label>
                    <InputComponent
                        value={stateProduct.countInStock}
                        onChange={handleOnChange}
                        name="countInStock"
                    />
                    {/* <p className="italic text-red-500 text-xs absolute -bottom-5">
                            {message.address}
                        </p> */}
                </div>
            </div>

            <div>
                <div>
                    <label
                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        htmlFor="user_avatar"
                    >
                        product image
                    </label>
                    <input
                        className="block w-full text-sm text-slate-500 file:mr-4 file:py-3 file:px-4 rounded border border-gray-300 file:border-0 file:text-sm file:font-semibold file:bg-gray-700 file:text-white hover:file:bg-gray-100 hover:file:text-gray-700"
                        aria-describedby="user_avatar_help"
                        id="user_avatar"
                        type="file"
                        onChange={(event) => {
                            handleChangeAvatar(event);
                        }}
                    />
                </div>
            </div>
            <div>
                {stateProduct?.image && (
                    <img
                        className="mt-4 w-20 h-20 object-cover"
                        src={stateProduct?.image}
                        alt=""
                    />
                )}
            </div>

            <div className="flex justify-center gap-3">
                <button
                    onClick={onCloseModal}
                    className="block text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 my-4 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    type="button"
                >
                    Cancel
                </button>
                <button
                    className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 my-4 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    type="submit"
                >
                    Create
                </button>
            </div>
        </form>
    );
}
