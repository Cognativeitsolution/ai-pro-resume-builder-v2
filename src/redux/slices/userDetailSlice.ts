import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type UserDetailType = {
    sectionId: number;
    sectionName: string;
    data: any;
};

type UserDetailState = {
    details: UserDetailType[];
};

const initialState: UserDetailState = {
    details: [],
};

export const userDetailSlice = createSlice({
    name: "userDetail",
    initialState,
    reducers: {
        addOrUpdateUserDetail: (state, action: PayloadAction<UserDetailType>) => {
            const { sectionId, sectionName, data } = action.payload;

            const existingIndex = state.details.findIndex(
                (detail) => detail.sectionId === sectionId
            );

            if (existingIndex !== -1) {
                // Update existing
                state.details[existingIndex].data = data;
            } else {
                // Add new
                state.details.push({ sectionId, sectionName, data });
            }
        },

        removeUserDetail: (state, action: PayloadAction<number>) => {
            const sectionId = action.payload;
            state.details = state.details.filter((detail) => detail.sectionId !== sectionId);
        },

        clearAllUserDetails: (state) => {
            state.details = [];
        },
    },
});

export const {
    addOrUpdateUserDetail,
    removeUserDetail,
    clearAllUserDetails,
} = userDetailSlice.actions;

export default userDetailSlice.reducer;
