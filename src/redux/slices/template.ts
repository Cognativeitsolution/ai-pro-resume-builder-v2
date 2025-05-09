// redux/slices/templateSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TemplateState {
    selectedTemplate: string | null;
}

const initialState: TemplateState = {
    selectedTemplate: "template1",
};

const templateSlice = createSlice({
    name: 'template',
    initialState,
    reducers: {
        setSelectedTemplate: (state, action: PayloadAction<string>) => {
            state.selectedTemplate = action.payload;
        },
        clearSelectedTemplate: (state) => {
            state.selectedTemplate = "template1";
        },
    },
});

export const { setSelectedTemplate, clearSelectedTemplate } = templateSlice.actions;
export default templateSlice.reducer;
