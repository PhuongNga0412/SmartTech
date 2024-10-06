// import { ProductForm } from "@/components/AdminForm/ProductForm";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";

import * as ProductService from "@/services//ProductService";
import { useMutationHooks } from "@/hook/useMutationHooks";
import FormEdit from "@/components/AdminForm/FormEdit/FormEdit";
import InputComponent from "@/components/InputComponent/InputComponent";

import { toast } from "react-toastify";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import ModalConfirmDelete from "@/components/ModalConfirmDelete/ModalConfirmDelete";
import { renderOptions } from "@/utils";
import { Loading } from "@/components/LoadingComponent/Loading";
import ReactPaginate from "react-paginate";
import {
    CLOUDINARY_UPLOAD_PRESET,
    CLOUDINARY_UPLOAD_URL,
} from "@/services/ImageService";
import axios from "axios";

export default function ProductManagement() {
    const [openModal, setOpenModal] = useState(false);
    const [openModalEdit, setOpenModalEdit] = useState(false);
    const [rowSelected, setRowSelected] = useState("");
    const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);

    const search = "";
    const [paginate, setPaginate] = useState({
        limit: 8,
        page: 0,
        total: 1,
    });

    const onCloseModal = () => {
        setOpenModal(false);
        setOpenModalEdit(false);
    };

    const [stateProduct, setStateProduct] = useState({
        name: "",
        image: [],
        type: "",
        price: "",
        countInStock: "",
        rating: "",
        description: "",
        discount: "",
        basePrice: "",
        newType: "",
    });
    const [errorMessage, setErrorMessage] = useState({
        name: "",
        image: [],
        type: "",
        countInStock: "",
        basePrice: "",
        rating: "",
        newType: "",
    });
    const msgErr = {
        name: "",
        image: [],
        type: "",
        countInStock: "",
        basePrice: "",
        rating: "",
        newType: "",
    };
    const [stateProductDetails, setStateProductDetails] = useState({
        name: "",
        image: [],
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
        setErrorMessage({ ...errorMessage, [e.target.name]: "" });
    };
    const handleOnChangeDetails = (e) => {
        setStateProductDetails({
            ...stateProductDetails,
            [e.target.name]: e.target.value,
        });
    };

    const [imageUrls, setImageUrls] = useState([]);

    const handleChangeAvatar = async (event) => {
        const files = event.target.files;
        const newImageUrls = [];

        for (const file of files) {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

            try {
                const response = await axios.post(
                    CLOUDINARY_UPLOAD_URL,
                    formData
                );
                newImageUrls.push(response.data.secure_url); // Lưu URL trả về từ Cloudinary
            } catch (error) {
                console.error("Error uploading file:", error);
            }
        }

        setImageUrls(newImageUrls);

        setStateProduct({
            ...stateProduct,
            image: newImageUrls,
        });
    };

    const handleChangeProductDetails = async (event) => {
        const files = event.target.files;
        const newImageUrls = [];

        for (const file of files) {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

            try {
                const response = await axios.post(
                    CLOUDINARY_UPLOAD_URL,
                    formData
                );
                newImageUrls.push(response.data.secure_url); // Lưu URL trả về từ Cloudinary
            } catch (error) {
                console.error("Error uploading file:", error);
            }
        }

        setImageUrls(newImageUrls);

        setStateProductDetails({
            ...stateProductDetails,
            image: newImageUrls,
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

    const mutationUpdate = useMutationHooks((data) => {
        const { id, token, ...rests } = data;
        const res = ProductService.updateProduct(id, token, { ...rests });
        return res;
    });
    const {
        data: dataUpdated,
        isSuccess: isSuccessUpdate,
        isError: isErrorUpdate,
    } = mutationUpdate;

    const mutationDelete = useMutationHooks((data) => {
        const { id, token } = data;
        const res = ProductService.deleteProduct(id, token);
        return res;
    });
    const {
        data: dataDeleted,
        isSuccess: isSuccessDeleted,
        isError: isErrorDeleted,
    } = mutationDelete;

    useEffect(() => {
        if (isSuccess && data?.status === "OK") {
            toast.success("Thêm mới sản phẩm thành công");
            setStateProduct({
                name: "",
                image: [],
                type: "",
                price: "",
                countInStock: "",
                rating: "",
                description: "",
                discount: "",
                basePrice: "",
            });
            setImageUrls([]);
            onCloseModal();
        } else if (isError) {
            toast.error("Thêm mới sản phẩm thất bại");
        }
    }, [isSuccess]);

    useEffect(() => {
        if (isSuccessUpdate && dataUpdated?.status === "OK") {
            toast.success("Cập nhật sản phẩm thành công");
            setStateProductDetails({
                name: "",
                image: [],
                type: "",
                price: "",
                countInStock: "",
                rating: "",
                description: "",
                discount: "",
                basePrice: "",
            });
            setImageUrls([]);
            onCloseModal();
        } else if (isErrorUpdate) {
            setStateProductDetails({
                name: "",
                image: [],
                type: "",
                price: "",
                countInStock: "",
                rating: "",
                description: "",
                discount: "",
                basePrice: "",
            });
            onCloseModal();
        }
    }, [isSuccessUpdate, isErrorUpdate]);

    useEffect(() => {
        if (isSuccessDeleted && dataDeleted?.status === "OK") {
            toast.success("Xóa sản phẩm thành công");
            handleCancelDelete();
        } else if (isErrorDeleted) {
            toast.error("Xóa sản phẩm thành công");
        }
    }, [isSuccessDeleted, isErrorDeleted]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        let hasError = false;

        if (!stateProduct.name) {
            msgErr.name = "Tên sản phẩm là bắt buộc!";
            hasError = true;
        }
        if (!stateProduct.type) {
            msgErr.type = "Danh mục là bắt buộc!";
            hasError = true;
        }
        if (!stateProduct.basePrice) {
            msgErr.basePrice = "Giá là bắt buộc!";
            hasError = true;
        }
        if (!stateProduct.countInStock) {
            msgErr.countInStock = "Số lượng hàng trong kho là bắt buộc!";
            hasError = true;
        }
        if (stateProduct.image.length === 0) {
            msgErr.image = "Hình ảnh sản phẩm là bắt buộc!";
            hasError = true;
        }

        if (hasError) {
            setErrorMessage({
                ...errorMessage,
                name: msgErr.name,
                type: msgErr.type,
                basePrice: msgErr.basePrice,
                countInStock: msgErr.countInStock,
                image: msgErr.image,
            });
            return;
        }

        const params = {
            name: stateProduct.name,
            image: stateProduct.image,
            type:
                stateProduct.type === "add_type"
                    ? stateProduct.newType
                    : stateProduct.type,
            price: stateProduct.price,
            countInStock: stateProduct.countInStock,
            rating: stateProduct.rating,
            description: stateProduct.description,
            discount: stateProduct.discount,
            basePrice: stateProduct.basePrice,
        };
        mutation.mutate(params, {
            onSettled: () => {
                queryProduct.refetch();
            },
        });
    };

    const getAllProduct = async (context) => {
        const search = context?.queryKey && context?.queryKey[1];
        const limit = context?.queryKey && context?.queryKey[2];
        const page = context?.queryKey && context?.queryKey[3];
        const res = await ProductService.getAllProduct(search, limit, page);

        if (res?.status === "OK") {
            setPaginate((prev) => ({ ...prev, total: res?.totalPage }));
        }

        return res;
    };

    const queryProduct = useQuery({
        queryKey: ["products", search, paginate.limit, paginate.page],
        queryFn: getAllProduct,
    });
    const { data: products, isLoading } = queryProduct;

    const fetchAllTypeProduct = async () => {
        const res = await ProductService.getAllTypeProduct();
        return res;
    };
    const typeProduct = useQuery({
        queryKey: ["type-product"],
        queryFn: fetchAllTypeProduct,
    });

    const fetchGetDetailsProduct = async (rowSelected) => {
        const res = await ProductService.getDetailsProduct(rowSelected);
        if (res?.data) {
            setStateProductDetails({
                name: res?.data?.name,
                image: res?.data?.image,
                type: res?.data?.type,
                price: res?.data?.price,
                countInStock: res?.data?.countInStock,
                rating: res?.data?.rating,
                description: res?.data?.description,
                discount: res?.data?.discount,
                basePrice: res?.data?.basePrice,
            });
        }
    };

    const handleDetailProduct = () => {
        setOpenModalEdit(true);
    };

    useEffect(() => {
        if (rowSelected) {
            fetchGetDetailsProduct(rowSelected);
        }
    }, [rowSelected]);

    const user = useSelector((state) => state?.user);

    const handleUpdateProduct = async (e) => {
        e.preventDefault();

        mutationUpdate.mutate(
            {
                id: rowSelected,
                token: user?.access_token,
                ...stateProductDetails,
            },
            {
                onSettled: () => {
                    queryProduct.refetch();
                },
            }
        );
    };

    const handleCancelDelete = () => {
        setIsModalOpenDelete(false);
    };

    const handleDeleteProduct = () => {
        mutationDelete.mutate(
            { id: rowSelected, token: user?.access_token },
            {
                onSettled: () => {
                    queryProduct.refetch();
                },
            }
        );
    };

    const handleChangeSelect = (e) => {
        const value = e.target.value;

        setStateProduct({
            ...stateProduct,
            type: value,
        });
    };

    const handlePageClick = (data) => {
        setPaginate((prev) => ({ ...prev, page: data.selected }));
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <div className="sm:px-6 lg:pr-[70px]">
            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                    <h1 className="text-base font-semibold leading-6 text-gray-900">
                        SẢN PHẨM
                    </h1>
                </div>
                <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                    <button
                        onClick={() => setOpenModal(true)}
                        type="button"
                        className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Thêm mới
                    </button>
                </div>
            </div>
            <Loading isLoading={isLoading}>
                <div className="mt-8 flow-root">
                    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                            <table className="min-w-full divide-y divide-gray-300">
                                <thead>
                                    <tr>
                                        <th
                                            scope="col"
                                            className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                                        >
                                            Tên sản phẩm
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                        >
                                            Danh mục
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                        >
                                            Giá
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                        >
                                            Hàng tồn
                                        </th>
                                        <th
                                            scope="col"
                                            className="relative py-3.5 pl-3 pr-4 sm:pr-0"
                                        >
                                            <span className="sr-only">
                                                Edit
                                            </span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                    {products?.data?.map((item) => (
                                        <tr
                                            key={item.name}
                                            onClick={() =>
                                                setRowSelected(item._id)
                                            }
                                        >
                                            <td className="py-5 pl-4 pr-3 text-sm sm:pl-0">
                                                <div className="flex items-center">
                                                    <div className="h-11 w-11 flex-shrink-0">
                                                        <img
                                                            alt=""
                                                            src={
                                                                item.image?.[0]
                                                            }
                                                            className="h-11 w-11 rounded object-cover"
                                                        />
                                                    </div>
                                                    <div className="ml-4">
                                                        <div className="font-medium text-gray-900">
                                                            {item.name}
                                                        </div>
                                                        {/* <div className="mt-1 text-gray-500">
                                                        {item.type}
                                                    </div> */}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                                                <div className="text-gray-900">
                                                    {item.type}
                                                </div>
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                                                <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                                                    {item.price.toLocaleString()}
                                                </span>
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                                                {item.countInStock}
                                            </td>
                                            <td className="relative whitespace-nowrap py-5 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                                                <button
                                                    onClick={
                                                        handleDetailProduct
                                                    }
                                                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                                                >
                                                    Sửa
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        setIsModalOpenDelete(
                                                            true
                                                        )
                                                    }
                                                    className="text-red-600 hover:text-red-900"
                                                >
                                                    Xóa
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div className="flex justify-center">
                                <ReactPaginate
                                    previousLabel={"<<"}
                                    nextLabel={">>"}
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
                    </div>
                </div>
            </Loading>

            {/* =========================================CREATE========================================= */}

            <Dialog
                open={openModal}
                onClose={onCloseModal}
                className="relative z-10"
            >
                <DialogBackdrop
                    transition
                    className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
                />

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <DialogPanel
                            transition
                            className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg sm:p-6 data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
                        >
                            <div>
                                <form
                                    onSubmit={handleSubmit}
                                    // className="container bg-white w-full h-[80%] max-w-lg mx-auto rounded-lg shadow py-6 px-8 relative overflow-auto"
                                >
                                    <h3 className="uppercase text-2xl font-semibold py-4">
                                        thêm mới sản phẩm
                                    </h3>
                                    <div className="flex flex-wrap -mx-3 mb-6">
                                        <div className="relative w-full px-3">
                                            <label
                                                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                                htmlFor="grid-password"
                                            >
                                                Tên sản phẩm
                                            </label>
                                            <InputComponent
                                                value={stateProduct.name}
                                                onChange={handleOnChange}
                                                name="name"
                                            />
                                            <div className="text-sm text-red-600">
                                                {errorMessage.name}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap -mx-3 mb-6">
                                        <div className="relative w-full px-3">
                                            <label
                                                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                                htmlFor="grid-password"
                                            >
                                                Danh mục
                                            </label>
                                            <select
                                                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                id="department"
                                                value={stateProduct.type}
                                                onChange={handleChangeSelect}
                                            >
                                                {renderOptions(
                                                    typeProduct?.data?.data
                                                )?.map((item) => (
                                                    <option
                                                        key={item}
                                                        value={item.value}
                                                    >
                                                        {item.label}
                                                    </option>
                                                ))}
                                            </select>
                                            {stateProduct.type ===
                                                "add_type" && (
                                                <div className="mt-6">
                                                    <InputComponent
                                                        value={
                                                            stateProduct.newType
                                                        }
                                                        onChange={
                                                            handleOnChange
                                                        }
                                                        name="newType"
                                                    />
                                                </div>
                                            )}
                                            <div className="text-sm text-red-600">
                                                {errorMessage.type}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap -mx-3 mb-6">
                                        <div className="relative w-full px-3">
                                            <label
                                                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                                htmlFor="grid-password"
                                            >
                                                Giá gốc
                                            </label>
                                            <InputComponent
                                                value={stateProduct.basePrice}
                                                onChange={handleOnChange}
                                                name="basePrice"
                                                type="number"
                                            />
                                            <div className="text-sm text-red-600">
                                                {errorMessage.basePrice}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap -mx-3 mb-6">
                                        <div className="relative w-full px-3">
                                            <label
                                                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                                htmlFor="grid-password"
                                            >
                                                Giảm giá
                                            </label>
                                            <InputComponent
                                                value={stateProduct.discount}
                                                onChange={handleOnChange}
                                                name="discount"
                                                type="number"
                                            />
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap -mx-3 mb-6">
                                        <div className="relative w-full px-3">
                                            <label
                                                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                                htmlFor="grid-password"
                                            >
                                                Mô tả
                                            </label>
                                            <textarea
                                                value={stateProduct.description}
                                                onChange={handleOnChange}
                                                name="description"
                                                rows={7} // Số dòng hiển thị
                                                className="block w-full bg-gray-200 border border-gray-300 text-gray-700 py-3 px-4 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                            />
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap -mx-3 mb-6">
                                        <div className="relative w-full px-3">
                                            <label
                                                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                                htmlFor="grid-password"
                                            >
                                                Số lượng hàng trong kho
                                            </label>
                                            <InputComponent
                                                value={
                                                    stateProduct.countInStock
                                                }
                                                onChange={handleOnChange}
                                                name="countInStock"
                                                type="number"
                                            />
                                            <div className="text-sm text-red-600">
                                                {errorMessage.countInStock}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap -mx-3 mb-6">
                                        <div className="relative w-full px-3">
                                            <label
                                                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                                htmlFor="grid-password"
                                            >
                                                Đánh giá
                                            </label>
                                            <InputComponent
                                                value={stateProduct.rating}
                                                onChange={handleOnChange}
                                                name="rating"
                                                type="number"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <div>
                                            <label
                                                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                                htmlFor="user_avatar"
                                            >
                                                Hình ảnh sản phẩm
                                            </label>
                                            <input
                                                className="block w-full text-sm text-slate-500 file:mr-4 file:py-3 file:px-4 rounded border border-gray-300 file:border-0 file:text-sm file:font-semibold file:bg-gray-700 file:text-white hover:file:bg-gray-100 hover:file:text-gray-700"
                                                aria-describedby="user_avatar_help"
                                                id="user_avatar"
                                                type="file"
                                                multiple
                                                onChange={(event) => {
                                                    handleChangeAvatar(event);
                                                }}
                                            />
                                            <div className="text-sm text-red-600">
                                                {errorMessage.image}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        {imageUrls?.map((image, index) => (
                                            <img
                                                key={index}
                                                className="mt-4 w-20 h-20 object-cover"
                                                src={image}
                                                alt=""
                                            />
                                        ))}
                                    </div>

                                    <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                                        <button
                                            type="submit"
                                            className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2"
                                        >
                                            Thêm
                                        </button>
                                        <button
                                            type="button"
                                            data-autofocus
                                            onClick={() => setOpenModal(false)}
                                            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                                        >
                                            Hủy
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>

            {/* =========================================UPDATE========================================= */}

            <FormEdit
                title="CẬP NHẬT THÔNG TIN SẢN PHẨM"
                isOpen={openModalEdit}
                onClose={() => setOpenModalEdit(false)}
            >
                <form
                    onSubmit={handleUpdateProduct}
                    // className="container bg-white w-full h-[80%] max-w-lg mx-auto rounded-lg shadow py-6 px-8 relative overflow-auto"
                >
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="relative w-full px-3">
                            <label
                                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                htmlFor="grid-password"
                            >
                                Tên sản phẩm
                            </label>
                            <InputComponent
                                value={stateProductDetails.name}
                                onChange={handleOnChangeDetails}
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
                                Danh mục
                            </label>
                            <InputComponent
                                value={stateProductDetails.type}
                                onChange={handleOnChangeDetails}
                                name="type"
                            />
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="relative w-full px-3">
                            <label
                                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                htmlFor="grid-password"
                            >
                                Giá gốc
                            </label>
                            <InputComponent
                                value={stateProductDetails.basePrice}
                                onChange={handleOnChangeDetails}
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
                                Giảm giá
                            </label>
                            <InputComponent
                                value={stateProductDetails.discount}
                                onChange={handleOnChangeDetails}
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
                                Mô tả
                            </label>

                            <textarea
                                value={stateProductDetails.description}
                                onChange={handleOnChangeDetails}
                                name="description"
                                rows={7} // Số dòng hiển thị
                                className="block w-full bg-gray-200 border border-gray-300 text-gray-700 py-3 px-4 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
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
                                Hàng tồn
                            </label>
                            <InputComponent
                                value={stateProductDetails.countInStock}
                                onChange={handleOnChangeDetails}
                                name="countInStock"
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
                                Đánh giá
                            </label>
                            <InputComponent
                                value={stateProductDetails.rating}
                                onChange={handleOnChangeDetails}
                                name="rating"
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
                                Hình ảnh sản phẩm
                            </label>
                            <input
                                className="block w-full text-sm text-slate-500 file:mr-4 file:py-3 file:px-4 rounded border border-gray-300 file:border-0 file:text-sm file:font-semibold file:bg-gray-700 file:text-white hover:file:bg-gray-100 hover:file:text-gray-700"
                                aria-describedby="user_avatar_help"
                                id="user_avatar"
                                type="file"
                                multiple
                                onChange={(event) => {
                                    handleChangeProductDetails(event);
                                }}
                            />
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-4">
                        {stateProductDetails.image?.map((image, index) => (
                            <img
                                key={index}
                                className="mt-4 w-20 h-20 object-cover"
                                src={image}
                                alt=""
                            />
                        ))}
                        {imageUrls?.map((image, index) => (
                            <img
                                key={index}
                                className="mt-4 w-20 h-20 object-cover"
                                src={image}
                                alt=""
                            />
                        ))}
                    </div>

                    <div className="flex justify-center gap-3">
                        <button
                            onClick={() => setOpenModalEdit(false)}
                            className="block text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 my-4 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                            type="button"
                        >
                            Hủy
                        </button>
                        <button
                            className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 my-4 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                            type="submit"
                        >
                            Sửa
                        </button>
                    </div>
                </form>
            </FormEdit>

            {/* -------------------------------delete------------------------------- */}
            <ModalConfirmDelete
                open={isModalOpenDelete}
                onClose={handleCancelDelete}
                onClick={handleDeleteProduct}
            >
                <div>Xác nhận xóa sản phẩm?</div>
            </ModalConfirmDelete>
        </div>
    );
}
