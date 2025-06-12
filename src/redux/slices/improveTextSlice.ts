import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ImproveTextState {
    grammarCheck: boolean;
    spellCheck: boolean;
    incorrectWords: any[];
    grammarErrors: any[];
}

const initialState: ImproveTextState = {
    grammarCheck: false,
    spellCheck: false,
    incorrectWords: [],
    grammarErrors: [],
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
        setAllIncorrectWords: (state, action) => {
            state.incorrectWords = action.payload;
            console.log(action.payload)
        },
        setAllGrammarErrors: (state, action) => {
            state.grammarErrors = action.payload;
        },
    },
});

export const { setGrammarCheck,
    setSpellCheck,
    setAllIncorrectWords,
    setAllGrammarErrors,
} = improveTextSlice.actions;
export default improveTextSlice.reducer;
