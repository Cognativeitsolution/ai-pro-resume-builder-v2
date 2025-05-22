import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/redux/slices/authSlice";
import profileReducer from "@/redux/slices/profileSlice";
import reuseableReducer from "@/redux/slices/reuseableSlice";
import fontReducer from "@/redux/slices/fontSlice";
import ImproveTextReducer from "@/redux/slices/improveTextSlice";
import addSectionReducer from "@/redux/slices/addSectionSlice";
import templateReducer from "@/redux/slices/template";
import profileImageReducer from './slices/profileImageSlice';
import rearrangeReducer from "./slices/rearrangeSlice";


export const store = configureStore({
    reducer: {
        auth: authReducer,
        profile: profileReducer,
        reuseable: reuseableReducer,
        font: fontReducer,
        ImproveText: ImproveTextReducer,
        addSection: addSectionReducer,
        template: templateReducer,
        profileImage: profileImageReducer,
        rearrange: rearrangeReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
