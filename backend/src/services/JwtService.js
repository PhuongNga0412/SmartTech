const jwt = require("jsonwebtoken");

const generalAccessToken = (payload) => {
    console.log("payload =>>>", payload);
    const accessToken = jwt.sign(
        {
            payload,
        },
        "access_token",
        { expiresIn: "1h" }
    );
    return access_token;
};

module.exports = { generalAccessToken };
