import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@/redux/slides/userSlide";
import productReducer from "@/redux/slides/productSlide";

export const store = configureStore({
    reducer: {
        user: userReducer,
        product: productReducer,
    },
});
