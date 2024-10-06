const cloudinary = require("../config/cloudinary");

exports.uploadImage = async (req, res) => {
    try {
        const { image } = req.body; // 'image' should be a base64 string
        const result = await cloudinary.uploader.upload(image);
        res.json({ url: result.secure_url });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
