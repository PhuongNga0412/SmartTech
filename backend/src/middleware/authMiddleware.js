const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const authMiddleWare = (req, res, next) => {
    const token = req.headers.token.split(" ")[1];
    jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
        if (err) {
            return res.status(404).json({
                status: "ERROR",
                message: "the authentication",
            });
        }

        const { payload } = user;
        if (user?.isAdmin) {
            next();
        } else {
            return res.status(404).json({
                status: "ERROR",
                message: "the authentication",
            });
        }
    });
};

const authUserMiddleWare = (req, res, next) => {
    const token = req.headers.token.split(" ")[1];
    const userId = req.body.user;
    console.log("day la gi", req.body, token);
    jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
        if (err) {
            return res.status(404).json({
                status: "ERROR",
                message: "the authentication",
            });
        }

        const { payload } = user;
        if (user?.isAdmin || user?.id === userId) {
            next();
        } else {
            return res.status(404).json({
                status: "ERROR",
                message: "the authentication",
            });
        }
    });
};

module.exports = {
    authMiddleWare,
    authUserMiddleWare,
};
