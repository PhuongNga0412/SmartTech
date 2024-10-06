const UserService = require("../services/UserService");
const JwtService = require("../services/JwtService");

const createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const reg =
            /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        const isCheckEmail = reg.test(email);
        if (!name || !email || !password) {
            return res.status(400).json({
                status: "ERR",
                message: "The input is required",
            });
        } else if (!isCheckEmail) {
            return res.status(400).json({
                status: "ERR",
                message: "The input is email",
            });
        }

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
        const { email, password } = req.body;
        const reg =
            /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        const isCheckEmail = reg.test(email);
        if (!email || !password) {
            return res.status(200).json({
                status: "ERR",
                message: "The input is required",
            });
        } else if (!isCheckEmail) {
            return res.status(200).json({
                status: "ERR",
                message: "Email không hợp lệ",
            });
        }

        const response = await UserService.loginUser(req.body);
        const { refresh_token, ...newResponse } = response;
        res.cookie("refresh_token", refresh_token, {
            httpOnly: true,
            Secure: false,
            sameSite: "strict",
        });
        return res.status(200).json(newResponse);
    } catch (e) {
        return res.status(404).json({
            message: e,
        });
    }
};

const updateUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const data = req.body;
        console.log("dataUpdate - ", data);
        if (!userId) {
            return res.status(400).json({
                status: "ERR",
                message: "The userId is required",
            });
        }

        const response = await UserService.updateUser(userId, data);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e,
        });
    }
};

const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;
        // const token = req.headers;
        if (!userId) {
            return res.status(200).json({
                status: "ERR",
                message: "The userId is required",
            });
        }

        const response = await UserService.deleteUser(userId);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e,
        });
    }
};

const getAllUser = async (req, res) => {
    try {
        const { limit, page } = req.query;
        const response = await UserService.getAllUser(
            Number(limit) || 8,
            Number(page) || 0
        );
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e,
        });
    }
};

const getDetailsUser = async (req, res) => {
    try {
        const userId = req.params.id;
        // const token = req.headers;
        if (!userId) {
            return res.status(200).json({
                status: "ERR",
                message: "The userId is required",
            });
        }

        const response = await UserService.getDetailsUser(userId);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e,
        });
    }
};

const refreshToken = async (req, res) => {
    console.log("req.cookies.refresh_token", req.cookies.refresh_token);
    try {
        const token = req.cookies.refresh_token;
        if (!token) {
            return res.status(200).json({
                status: "ERR",
                message: "The token is required",
            });
        }

        const response = await JwtService.refreshTokenJwtService(token);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e,
        });
    }
};

const logoutUser = async (req, res) => {
    console.log("req.cookies.refresh_token", req.cookies.refresh_token);
    try {
        res.clearCookie("refresh_token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
        });
        return res.status(200).json({
            status: "OK",
            message: "LOGOUT SUCCESSFULLY",
        });
    } catch (e) {
        return res.status(500).json({
            message: "Logout failed",
            error: e.message,
        });
    }
};

module.exports = {
    createUser,
    loginUser,
    updateUser,
    deleteUser,
    getAllUser,
    getDetailsUser,
    refreshToken,
    logoutUser,
};
