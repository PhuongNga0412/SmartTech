const UserService = require("../services/UserService");

const createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const reg =
            /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        const isCheckEmail = reg.test(email);
        if (!name || !email || !password) {
            return res.status(200).json({
                status: "ERR",
                message: "The input is required",
            });
        } else if (!isCheckEmail) {
            return res.status(200).json({
                status: "ERR",
                message: "The input is email",
            });
        }
        console.log("isCheckEmail: ", isCheckEmail);
        // console.log(req.body);
        const response = await UserService.createUser(req.body);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e,
        });
    }
};

const loginUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const reg =
            /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        const isCheckEmail = reg.test(email);
        if (!name || !email || !password) {
            return res.status(200).json({
                status: "ERR",
                message: "The input is required",
            });
        } else if (!isCheckEmail) {
            return res.status(200).json({
                status: "ERR",
                message: "The input is email",
            });
        }
        console.log("isCheckEmail: ", isCheckEmail);
        // console.log(req.body);
        const response = await UserService.loginUser(req.body);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e,
        });
    }
};

module.exports = { createUser, loginUser };
