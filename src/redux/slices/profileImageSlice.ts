import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ProfileImageState {
    image: string | null; // base64 URL
}

const initialState: ProfileImageState = {
    image: null,
};

const profileImageSlice = createSlice({
    name: 'profileImage',
    initialState,
    reducers: {
        setProfileImage: (state, action: PayloadAction<string>) => {
            state.image = action.payload;
        },
        clearProfileImage: (state) => {
            state.image = null;
        },
    },
});

export const { setProfileImage, clearProfileImage } = profileImageSlice.actions;
export default profileImageSlice.reducer;
