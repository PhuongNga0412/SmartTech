const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const { generalAccessToken } = require("./JwtService");

const createUser = (newUser) => {
    return new Promise(async (resolve, reject) => {
        const { name, email, password } = newUser;
        try {
            const checkUser = await User.findOne({
                email: email,
            });
            if (checkUser !== null) {
                resolve({
                    status: "Okk",
                    message: "the email already",
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
        const { name, email, password } = newUser;
        try {
            const checkUser = await User.findOne({
                email: email,
            });
            if (checkUser === null) {
                resolve({
                    status: "Okk",
                    message: "the user is not defined",
                });
            }
            const comparePassword = bcrypt.compareSync(
                password,
                checkUser.password
            );

            console.log("access_token =>>>>", access_token);

            if (!comparePassword) {
                resolve({
                    status: "OK",
                    message: "the password or user incorrect",
                });
            }

            const access_token = generalAccessToken({
                id: checkUser.id,
                isAdmin: checkUser.isAdmin,
            });
            resolve({
                status: "OK",
                message: "SUCCESS",
                access_token,
            });
        } catch (e) {
            reject(e);
        }
    });
};

module.exports = { createUser, loginUser };
