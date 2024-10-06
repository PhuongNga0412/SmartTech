import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    id: "",
    name: "",
    email: "",
    phone: "",
    address: "",
    avatar: "",
    access_token: "",
    isAdmin: false,
    city: "",
};

export const userSlide = createSlice({
    name: "user",
    initialState,
    reducers: {
        updateUser: (state, action) => {
            const {
                name = "",
                email = "",
                phone = "",
                address = "",
                avatar = "",
                access_token = "",
                _id = "",
                isAdmin,
                city = "",
            } = action.payload;
            state.id = _id;
            state.name = name;
            state.email = email;
            state.phone = phone;
            state.address = address;
            state.avatar = avatar;
            state.access_token = access_token;
            state.isAdmin = isAdmin;
            state.city = city;
        },
        resetUser: (state) => {
            state.id = "";
            state.name = "";
            state.email = "";
            state.phone = "";
            state.address = "";
            state.avatar = "";
            state.access_token = "";
            state.isAdmin = false;
            state.city = "";
        },
    },
});

export const { updateUser, resetUser } = userSlide.actions;

export default userSlide.reducer;
