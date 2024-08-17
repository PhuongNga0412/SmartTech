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

export default function UserManagement() {
    const [openModal, setOpenModal] = useState(false);
    const [openModalEdit, setOpenModalEdit] = useState(false);
    const [rowSelected, setRowSelected] = useState("");
    const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
    const [displayProduct, setDisplayProduct] = useState([]);
    const [typeSelect, setTypeSelect] = useState("");
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 8;
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
    const [stateProductDetails, setStateProductDetails] = useState({
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
    const handleOnChangeDetails = (e) => {
        setStateProductDetails({
            ...stateProductDetails,
            [e.target.name]: e.target.value,
        });
    };

    const handleChangeAvatar = async (event) => {
        const files = event.target.files;
        const imageUrls = [];

        for (const file of files) {
            const base64 = await convertBase64(file);
            imageUrls.push(base64);
        }

        setStateProduct({
            ...stateProduct,
            image: imageUrls,
        });
    };
    const handleChangeProductDetails = async (event) => {
        const file = event.target.files[0];
        const base64 = await convertBase64(file);
        setStateProductDetails({
            ...stateProductDetails,
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

    const mutationUpdate = useMutationHooks((data) => {
        console.log("data --- ", data);
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
            toast.success("create ook");
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
            onCloseModal();
        } else if (isError) {
            toast.error("create fail");
        }
    }, [isSuccess]);

    useEffect(() => {
        if (isSuccessUpdate && dataUpdated?.status === "OK") {
            toast.success("Update ook");
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
            toast.success("delete ook");
            handleCancelDelete();
        } else if (isErrorDeleted) {
            toast.error("delete fail");
        }
    }, [isSuccessDeleted, isErrorDeleted]);

    const handleSubmit = (e) => {
        e.preventDefault();
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

        if (res?.status == "OK") {
            setPaginate({ ...paginate, total: res?.totalPage });
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
        // if (res?.status === "OK") {
        //     setTypeProduct(res?.data);
        // }
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
    console.log("user --- ", user);

    const handleUpdateProduct = (e) => {
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
        console.log("state.pro - ", stateProductDetails);
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
        setPaginate({ ...paginate, page: data.selected });
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    console.log(paginate);

    return (
        <div className="sm:px-6 lg:pr-[70px]">
            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                    <h1 className="text-base font-semibold leading-6 text-gray-900">
                        Products
                    </h1>
                </div>
                <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                    <button
                        onClick={() => setOpenModal(true)}
                        type="button"
                        className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Add products
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
                                            Product Name
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                        >
                                            Type
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                        >
                                            Price
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                        >
                                            Count In Stock
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
                                            <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
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
                                                    {item.price}
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
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        setIsModalOpenDelete(
                                                            true
                                                        )
                                                    }
                                                    className="text-red-600 hover:text-red-900"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div className="flex justify-center">
                                <ReactPaginate
                                    previousLabel={"< previous"}
                                    nextLabel={"next >"}
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

            {/* -------------------------------create------------------------------- */}
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
                                            {/* <InputComponent
                                                value={stateProduct.description}
                                                onChange={handleOnChange}
                                                name="description"
                                            /> */}
                                            <textarea
                                                value={stateProduct.description}
                                                onChange={handleOnChange}
                                                name="description"
                                                cols={50}
                                                rows={7}
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
                                                value={
                                                    stateProduct.countInStock
                                                }
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
                                                multiple
                                                onChange={(event) => {
                                                    handleChangeAvatar(event);
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        {stateProduct?.image?.map(
                                            (image, index) => (
                                                <img
                                                    key={index}
                                                    className="mt-4 w-20 h-20 object-cover"
                                                    src={image}
                                                    alt=""
                                                />
                                            )
                                        )}
                                    </div>

                                    <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                                        <button
                                            type="submit"
                                            className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2"
                                        >
                                            Create
                                        </button>
                                        <button
                                            type="button"
                                            data-autofocus
                                            onClick={() => setOpenModal(false)}
                                            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>

            {/* -------------------------------update------------------------------- */}
            <FormEdit
                title="CHI TIET SAN PHAM"
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
                                product name
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
                                type
                            </label>
                            <InputComponent
                                value={stateProductDetails.type}
                                onChange={handleOnChangeDetails}
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
                                value={stateProductDetails.price}
                                onChange={handleOnChangeDetails}
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
                                value={stateProductDetails.rating}
                                onChange={handleOnChangeDetails}
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
                                value={stateProductDetails.description}
                                onChange={handleOnChangeDetails}
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
                                base Price
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
                                count in stock
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
                                    handleChangeProductDetails(event);
                                }}
                            />
                        </div>
                    </div>
                    <div>
                        {stateProductDetails?.image && (
                            <img
                                className="mt-4 w-20 h-20 object-cover"
                                src={stateProductDetails?.image}
                                alt=""
                            />
                        )}
                    </div>

                    <div className="flex justify-center gap-3">
                        <button
                            onClick={() => setOpenModalEdit(false)}
                            className="block text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 my-4 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                            type="button"
                        >
                            Cancel
                        </button>
                        <button
                            className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 my-4 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                            type="submit"
                        >
                            Update
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
                <div>Xoa khong?</div>
            </ModalConfirmDelete>
        </div>
    );
}
