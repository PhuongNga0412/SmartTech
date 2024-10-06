const UserRouter = require("./UserRouter");
const ProductRouter = require("./ProductRouter");
const OrderRouter = require("./OrderRouter");
const UploadRouter = require("./UploadRouter");
const WishlistRouter = require("./WishlistRouter");
const PaypalRouter = require("./PaypalRouter");

const routes = (app) => {
    app.use("/api/user", UserRouter);
    app.use("/api/product", ProductRouter);
    app.use("/api/order", OrderRouter);
    app.use("/api/upload", UploadRouter);
    app.use("/api/wishlist", WishlistRouter);
    app.use("/api/payment", PaypalRouter);
};

module.exports = routes;
