import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ProfileImageState {
    image: string;
    scale: number;
    position: { x: number; y: number };
    rotation: number;
}

const initialState: ProfileImageState = {
    image: '',
    scale: 1,
    position: { x: 0, y: 0 },
    rotation: 0,
};

const profileImageSlice = createSlice({
    name: 'profileImage',
    initialState,
    reducers: {
        setProfileImage(state, action: PayloadAction<ProfileImageState>) {
            state.image = action.payload.image;
            state.scale = action.payload.scale;
            state.position = action.payload.position;
            state.rotation = action.payload.rotation;
        },

        removeProfileImage(state) {
            state.image = '';
            state.scale = 1;
            state.position = { x: 0, y: 0 };
            state.rotation = 0;
        }
    },
});

export const { setProfileImage, removeProfileImage } = profileImageSlice.actions;
export default profileImageSlice.reducer;
