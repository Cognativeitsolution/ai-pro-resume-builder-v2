import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ImproveTextState {
    grammarCheck: boolean;
    spellCheck: boolean;
}

const initialState: ImproveTextState = {
    grammarCheck: false,
    spellCheck: false,
};

const improveTextSlice = createSlice({
    name: 'improveText',
    initialState,
    reducers: {
        setGrammarCheck(state, action: PayloadAction<boolean>) {
            state.grammarCheck = action.payload;
        },
        setSpellCheck(state, action: PayloadAction<boolean>) {
            state.spellCheck = action.payload;
        },
    },
});

export const { setGrammarCheck, setSpellCheck } = improveTextSlice.actions;
export default improveTextSlice.reducer;
