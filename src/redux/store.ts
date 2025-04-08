import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/redux/slices/authSlice";
import profileReducer from "@/redux/slices/profileSlice";
import reuseableReducer from "@/redux/slices/reuseableSlice";
import fontReducer from "@/redux/slices/fontSlice";
import ImproveTextReducer from "@/redux/slices/improveTextSlice";
import addSectionReducer from "@/redux/slices/addSectionSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        profile: profileReducer,
        reuseable: reuseableReducer,
        font: fontReducer,
        ImproveText: ImproveTextReducer,
        addSection: addSectionReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
