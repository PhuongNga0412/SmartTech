const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const { generalAccessToken, generalRefreshToken } = require("./JwtService");

const createUser = (newUser) => {
    return new Promise(async (resolve, reject) => {
        const { name, email, password } = newUser;
        try {
            const checkUser = await User.findOne({
                email: email,
            });
            if (checkUser !== null) {
                return reject({
                    status: "ERR",
                    message: "Tài khoản email đã tồn tại",
                });
            }
            const hash = bcrypt.hashSync(password, 10);
            console.log(hash);
            const createdUser = await User.create({
                name,
                email,
                password: hash,
            });
            if (createdUser) {
                resolve({
                    status: "OK",
                    message: "SUCCESS",
                    data: createdUser,
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};

const loginUser = (newUser) => {
    return new Promise(async (resolve, reject) => {
        const { email, password } = newUser;
        try {
            const checkUser = await User.findOne({
                email: email,
            });
            if (checkUser === null) {
                return reject({
                    status: "ERR",
                    message: "Email không tồn tại",
                });
            }
            const comparePassword = bcrypt.compareSync(
                password,
                checkUser.password
            );

            if (!comparePassword) {
                return reject({
                    status: "ERR",
                    message: "Mật khẩu không chính xác",
                });
            }

            const access_token = await generalAccessToken({
                id: checkUser.id,
                isAdmin: checkUser.isAdmin,
            });

            const refresh_token = await generalRefreshToken({
                id: checkUser.id,
                isAdmin: checkUser.isAdmin,
            });

            resolve({
                status: "OK",
                message: "SUCCESS",
                access_token,
                refresh_token,
            });
        } catch (e) {
            reject(e);
        }
    });
};

const updateUser = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkUser = await User.findOne({
                _id: id,
            });
            if (checkUser === null) {
                resolve({
                    status: "OkK",
                    message: "the user is not defined",
                });
            }

            const updatedUser = await User.findByIdAndUpdate(id, data, {
                new: true,
            });

            resolve({
                status: "OK",
                message: "SUCCESS",
                data: updatedUser,
            });
        } catch (e) {
            reject(e);
        }
    });
};

const deleteUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkUser = await User.findOne({
                _id: id,
            });
            console.log("id: ", id);
            console.log("checkUser: ", checkUser);
            if (checkUser === null) {
                resolve({
                    status: "OkK",
                    message: "the user is not defined",
                });
            }

            await User.findByIdAndDelete(id);

            resolve({
                status: "OK",
                message: "DELETE USER SUCCESS",
            });
        } catch (e) {
            reject(e);
        }
    });
};

const getAllUser = (limit, page) => {
    return new Promise(async (resolve, reject) => {
        try {
            const totalUser = await User.countDocuments();
            let allUser = [];

            if (!limit) {
                allUser = await User.find();
            } else {
                allUser = await User.find()
                    .limit(limit)
                    .skip(page * limit);
            }

            resolve({
                status: "OK",
                message: "GET ALL USER SUCCESS",
                data: allUser,
                total: totalUser,
                pageCurrentUser: Number(page + 1),
                totalPageUser: Math.ceil(totalUser / limit),
            });
        } catch (e) {
            reject(e);
        }
    });
};

const getDetailsUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await User.findOne({
                _id: id,
            });

            if (user === null) {
                resolve({
                    status: "OkK",
                    message: "the user is not defined",
                });
            }

            resolve({
                status: "OK",
                message: "SUCCESS",
                data: user,
            });
        } catch (e) {
            reject(e);
        }
    });
};

module.exports = {
    createUser,
    loginUser,
    updateUser,
    deleteUser,
    getAllUser,
    getDetailsUser,
};
