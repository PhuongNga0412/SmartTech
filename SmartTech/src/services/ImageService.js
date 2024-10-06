import axios from "axios";

// Thay đổi URL này bằng URL của API endpoint Cloudinary
export const CLOUDINARY_UPLOAD_URL =
    "https://api.cloudinary.com/v1_1/dsfrtdowg/image/upload";
export const CLOUDINARY_UPLOAD_PRESET = "ml_default"; // Cấu hình từ Cloudinary

export const uploadImageToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

    try {
        const response = await axios.post(CLOUDINARY_UPLOAD_URL, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        return response.data; // Trả về kết quả từ Cloudinary
    } catch (error) {
        console.error("Image upload failed:", error);
        throw error; // Bỏ lỗi lên trên để xử lý ở nơi gọi hàm
    }
};
