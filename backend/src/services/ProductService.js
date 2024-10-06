const Product = require("../models/ProductModel");
const bcrypt = require("bcrypt");
const Fuse = require("fuse.js");

// const createProduct = (newProduct) => {
//     return new Promise(async (resolve, reject) => {
//         const {
//             name,
//             image,
//             type,
//             price,
//             countInStock,
//             rating,
//             description,
//             discount,
//             basePrice,
//         } = newProduct;
//         try {
//             const checkProduct = await Product.findOne({
//                 name: name,
//             });
//             if (checkProduct !== null) {
//                 resolve({
//                     status: "Okk",
//                     message: "The name of product already",
//                 });
//             }

//             const newProduct = await Product.create({
//                 name,
//                 image,
//                 type,
//                 price,
//                 countInStock: Number(countInStock),
//                 rating,
//                 description,
//                 discount: Number(discount),
//                 basePrice,
//             });
//             if (newProduct) {
//                 resolve({
//                     status: "OK",
//                     message: "SUCCESS",
//                     data: newProduct,
//                 });
//             }
//         } catch (e) {
//             reject(e);
//         }
//     });
// };
const createProduct = (newProduct) => {
    return new Promise(async (resolve, reject) => {
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
        } = newProduct;

        try {
            const checkProduct = await Product.findOne({ name });
            if (checkProduct !== null) {
                return resolve({
                    status: "ERR",
                    message: "The name of product already exists",
                });
            }

            const product = await Product.create({
                name,
                image,
                type,
                price,
                countInStock: Number(countInStock),
                rating,
                description,
                discount: Number(discount),
                basePrice,
            });

            resolve({
                status: "OK",
                message: "SUCCESS",
                data: product,
            });
        } catch (e) {
            reject(e);
        }
    });
};

// const updateProduct = (id, data) => {
//     return new Promise(async (resolve, reject) => {
//         try {
//             const checkProduct = await Product.findOne({
//                 _id: id,
//             });

//             if (checkProduct === null) {
//                 resolve({
//                     status: "OkK",
//                     message: "The product is not defined",
//                 });
//             }

//             const updatedProduct = await Product.findByIdAndUpdate(id, data, {
//                 new: true,
//             });

//             resolve({
//                 status: "OK",
//                 message: "SUCCESS",
//                 data: updatedProduct,
//             });
//         } catch (e) {
//             reject(e);
//         }
//     });
// };
// const updateProduct = async (req, res) => {
//     try {
//         const productId = req.params.id;
//         let data = req.body;

//         if (!productId) {
//             return res.status(400).json({
//                 status: "ERR",
//                 message: "The productId is required",
//             });
//         }

//         if (data.basePrice && data.discount !== undefined) {
//             data.price =
//                 data.basePrice - (data.basePrice * data.discount) / 100;
//         } else if (data.basePrice) {
//             data.price = data.basePrice;
//         }

//         const response = await ProductService.updateProduct(productId, data);

//         if (!response) {
//             return res.status(404).json({
//                 status: "ERR",
//                 message: "Product not found",
//             });
//         }

//         return res.status(200).json(response);
//     } catch (e) {
//         console.error(e);
//         return res.status(500).json({
//             message: e.message || "Internal Server Error",
//         });
//     }
// };
const updateProduct = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkProduct = await Product.findOne({ _id: id });

            if (checkProduct === null) {
                resolve({
                    status: "ERR",
                    message: "The product is not defined",
                });
            }

            const updatedProduct = await Product.findByIdAndUpdate(id, data, {
                new: true,
            });

            resolve({
                status: "OK",
                message: "SUCCESS",
                data: updatedProduct,
            });
        } catch (e) {
            reject(e);
        }
    });
};

const deleteProduct = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkProduct = await Product.findOne({
                _id: id,
            });
            if (checkProduct === null) {
                resolve({
                    status: "OkK",
                    message: "the product is not defined",
                });
            }

            await Product.findByIdAndDelete(id);

            resolve({
                status: "OK",
                message: "DELETE PRODUCT SUCCESS",
            });
        } catch (e) {
            reject(e);
        }
    });
};

// const getAllProduct = (limit, page, sort, filters) => {
//     return new Promise(async (resolve, reject) => {
//         try {
//             let query = {};
//             let sortOption = {};

//             // Xử lý bộ lọc từ query string
//             if (filters) {
//                 filters.forEach((filter) => {
//                     const [key, ...values] = filter.split(",");
//                     // if (key === "name") {
//                     //     query[key] = {
//                     //         $regex: values.join(" "),
//                     //         $options: "i",
//                     //     };
//                     // }
//                     if (key === "type") {
//                         query[key] = { $in: values }; // Lọc theo loại
//                     } else if (key === "price") {
//                         const minPrice = Number(values[0]);
//                         const maxPrice = Number(values[1]);
//                         // query.price = { $gte: minPrice, $lte: maxPrice }; // Lọc theo giá
//                         if (minPrice && !maxPrice) {
//                             query.price = { $gte: minPrice }; // Chỉ lọc theo giá >= minPrice
//                         } else if (!minPrice && maxPrice) {
//                             query.price = { $lte: maxPrice };
//                         } else if (minPrice && maxPrice) {
//                             query.price = { $gte: minPrice, $lte: maxPrice }; // Lọc theo cả khoảng giá
//                         }
//                     }
//                 });
//             }

//             if (sort) {
//                 if (sort === "mostPopular") {
//                     sortOption = { createdAt: -1 };
//                 } else if (sort === "price") {
//                     sortOption = { price: 1 };
//                 } else if (sort === "-price") {
//                     sortOption = { price: -1 };
//                 }
//             }

//             const totalProduct = await Product.countDocuments(query);

//             const allProducts = await Product.find(query)
//                 .sort(sortOption)
//                 .limit(limit)
//                 .skip(page * limit);

//             const fuseOptions = {
//                 includeScore: true,
//                 keys: ["name"], // Chỉ tìm kiếm theo tên sản phẩm
//                 threshold: 0.4, // Mức độ khớp (càng nhỏ thì càng chính xác)
//             };
//             const fuse = new Fuse(allProducts, fuseOptions);

//             // Giả sử 'search' là từ khóa người dùng nhập vào
//             const nameFilter = filters.find((filter) =>
//                 filter.includes("name")
//             );
//             const search = nameFilter ? nameFilter.split(",")[1] : "";

//             const result = fuse.search(search);
//             console.log(result);
//             // resolve({
//             //     status: "OK",
//             //     message: "GET ALL PRODUCT SUCCESS",
//             //     data: allProducts,
//             //     total: totalProduct,
//             //     pageCurrent: Number(page + 1),
//             //     totalPage: Math.ceil(totalProduct / limit),
//             // });
//             resolve({
//                 status: "OK",
//                 message: "GET ALL PRODUCT SUCCESS",
//                 data: result.map((item) => item.item), // Trả về sản phẩm khớp
//                 total: result.length,
//                 pageCurrent: Number(page + 1),
//                 totalPage: Math.ceil(result.length / limit),
//             });
//         } catch (e) {
//             reject(e);
//         }
//     });
// };

const getAllProduct = (limit, page, sort, filters) => {
    return new Promise(async (resolve, reject) => {
        try {
            let query = {};
            let sortOption = {};

            // Xử lý bộ lọc từ query string
            if (filters) {
                filters.forEach((filter) => {
                    const [key, ...values] = filter.split(",");
                    if (key === "type") {
                        query[key] = { $in: values }; // Lọc theo loại
                    } else if (key === "price") {
                        const minPrice = Number(values[0]);
                        const maxPrice = Number(values[1]);
                        if (minPrice && !maxPrice) {
                            query.price = { $gte: minPrice }; // Chỉ lọc theo giá >= minPrice
                        } else if (!minPrice && maxPrice) {
                            query.price = { $lte: maxPrice };
                        } else if (minPrice && maxPrice) {
                            query.price = { $gte: minPrice, $lte: maxPrice }; // Lọc theo cả khoảng giá
                        }
                    }
                });
            }

            if (sort) {
                if (sort === "mostPopular") {
                    sortOption = { createdAt: -1 };
                } else if (sort === "price") {
                    sortOption = { price: 1 };
                } else if (sort === "-price") {
                    sortOption = { price: -1 };
                }
            }

            // Tổng số sản phẩm trước khi tìm kiếm
            const totalProduct = await Product.countDocuments(query);

            // Tìm tất cả sản phẩm để sử dụng Fuse.js
            const allProducts = await Product.find(query).sort(sortOption);

            // Dùng Fuse.js để tìm kiếm gần đúng
            const fuseOptions = {
                includeScore: true,
                keys: ["name"], // Chỉ tìm kiếm theo tên sản phẩm
                threshold: 0.4, // Mức độ khớp (càng nhỏ thì càng chính xác)
            };
            const fuse = new Fuse(allProducts, fuseOptions);

            const nameFilter = filters.find((filter) =>
                filter.includes("name")
            );
            const search = nameFilter ? nameFilter.split(",")[1] : "";

            const result = search ? fuse.search(search) : allProducts;

            // Sau khi tìm kiếm với Fuse.js, thực hiện phân trang
            const paginatedResults = result
                .slice(page * limit, (page + 1) * limit)
                .map((item) => item.item || item); // Lấy sản phẩm khớp từ Fuse.js

            resolve({
                status: "OK",
                message: "GET ALL PRODUCT SUCCESS",
                data: paginatedResults, // Trả về sản phẩm sau phân trang
                total: totalProduct, // Tổng số sản phẩm
                totalPage: Math.ceil(result.length / limit), // Số trang dựa trên kết quả tìm kiếm
                pageCurrent: Number(page + 1),
            });
        } catch (e) {
            reject(e);
        }
    });
};

const getDetailProduct = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const product = await Product.findOne({
                _id: id,
            });

            if (product === null) {
                resolve({
                    status: "OkK",
                    message: "the product is not defined",
                });
            }

            resolve({
                status: "OK",
                message: "SUCCESS",
                data: product,
            });
        } catch (e) {
            reject(e);
        }
    });
};

const getAllType = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const allType = await Product.distinct("type");
            resolve({
                status: "OK",
                message: "GET ALL TYPE SUCCESS",
                data: allType,
            });
        } catch (e) {
            reject(e);
        }
    });
};

module.exports = {
    createProduct,
    updateProduct,
    getDetailProduct,
    deleteProduct,
    getAllProduct,
    getAllType,
};
