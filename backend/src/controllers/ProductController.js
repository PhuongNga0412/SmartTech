const ProductService = require("../services/ProductService");

// const createProduct = async (req, res) => {
//     try {
//         const { name, image, type, price, countInStock, rating } = req.body;

//         if (!name || !image || !type || !price || !countInStock || !rating) {
//             return res.status(200).json({
//                 status: "ERR",
//                 message: "The input is required",
//             });
//         }

//         const response = await ProductService.createProduct(req.body);
//         return res.status(200).json(response);
//     } catch (e) {
//         return res.status(404).json({
//             message: e,
//         });
//     }
// };
const createProduct = async (req, res) => {
    try {
        const {
            name,
            image,
            type,
            basePrice,
            discount,
            countInStock,
            rating,
            description,
        } = req.body;

        if (!name || !image || !type || !basePrice || !countInStock) {
            return res.status(400).json({
                status: "ERR",
                message: "The input is required",
            });
        }

        const price = basePrice - (basePrice * (discount || 0)) / 100;

        const response = await ProductService.createProduct({
            ...req.body,
            price,
        });

        return res.status(200).json(response);
    } catch (e) {
        return res.status(500).json({
            message: e.message,
        });
    }
};

// const updateProduct = async (req, res) => {
//     try {
//         const productId = req.params.id;
//         const data = req.body;
//         if (!productId) {
//             return res.status(200).json({
//                 status: "ERR",
//                 message: "The productId is required",
//             });
//         }

//         const response = await ProductService.updateProduct(productId, data);
//         return res.status(200).json(response);
//     } catch (e) {
//         return res.status(404).json({
//             message: e,
//         });
//     }
// };

// const updateProduct = async (req, res) => {
//     try {
//         const productId = req.params.id;
//         const data = req.body;

//         if (!productId) {
//             return res.status(400).json({
//                 status: "ERR",
//                 message: "The productId is required",
//             });
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
const updateProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        let data = req.body;

        if (!productId) {
            return res.status(400).json({
                status: "ERR",
                message: "The productId is required",
            });
        }

        if (data.basePrice && data.discount !== undefined) {
            data.price =
                data.basePrice - (data.basePrice * data.discount) / 100;
        } else if (data.basePrice) {
            data.price = data.basePrice;
        }

        const response = await ProductService.updateProduct(productId, data);

        if (!response) {
            return res.status(404).json({
                status: "ERR",
                message: "Product not found",
            });
        }

        return res.status(200).json(response);
    } catch (e) {
        console.error(e);
        return res.status(500).json({
            message: e.message || "Internal Server Error",
        });
    }
};

const getDetailProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        if (!productId) {
            return res.status(200).json({
                status: "ERR",
                message: "The productId is required",
            });
        }

        const response = await ProductService.getDetailProduct(productId);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e,
        });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id;

        if (!productId) {
            return res.status(200).json({
                status: "ERR",
                message: "The productId is required",
            });
        }

        const response = await ProductService.deleteProduct(productId);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e,
        });
    }
};

const getAllProduct = async (req, res) => {
    try {
        const { limit, page, sort, filter } = req.query;

        const filterArray = filter
            ? Array.isArray(filter)
                ? filter
                : [filter]
            : [];
        const response = await ProductService.getAllProduct(
            Number(limit) || 8,
            Number(page) || 0,
            sort,
            filterArray
        );
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e,
        });
    }
};
// const getAllProduct = async (req, res) => {
//     try {
//         const { limit, page, sort, filter, minPrice, maxPrice } = req.query;

//         // Construct price range object
//         const priceRange = {
//             min: minPrice || null,
//             max: maxPrice || null,
//         };

//         const response = await ProductService.getAllProduct(
//             Number(limit) || 8,
//             Number(page) || 0,
//             sort,
//             filter,
//             priceRange
//         );
//         return res.status(200).json(response);
//     } catch (e) {
//         return res.status(404).json({
//             message: e,
//         });
//     }
// };

const getAllType = async (req, res) => {
    try {
        const response = await ProductService.getAllType();
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e,
        });
    }
};

module.exports = {
    createProduct,
    updateProduct,
    getDetailProduct,
    deleteProduct,
    getAllProduct,
    getAllType,
};
