/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                "black-40": "rgba(0, 0, 0, 0.4)", // Thêm màu rgba tùy chỉnh
            },
        },
    },
    plugins: [require("flowbite/plugin")],
};
