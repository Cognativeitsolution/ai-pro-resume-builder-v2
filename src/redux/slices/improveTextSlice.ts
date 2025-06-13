import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ImproveTextState {
    grammarCheck: boolean;
    spellCheck: boolean;
    incorrectWords: string[];  // Typing as string[]
    grammarErrors: string[];    // Typing as string[]
    summary: {
        correctedText: string;
        correctedWords: string[]; // Typing as string[]
    };
    experience: {
        correctedText: string;
        correctedWords: string[]; // Typing as string[]
    };
}

const initialState: ImproveTextState = {
    grammarCheck: false,
    spellCheck: false,
    incorrectWords: [],
    grammarErrors: [],
    summary: {
        correctedText: '',
        correctedWords: [],
    },
    experience: {
        correctedText: '',
        correctedWords: [],
    },
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
        setCorrectedSection: (state, action: PayloadAction<{ section: string, correctedText: string, correctedWords: string[] }>) => {
            const { section, correctedText, correctedWords } = action.payload;
            if (section === "summary") {
                state.summary.correctedText = correctedText;
                state.summary.correctedWords = correctedWords;
            } else if (section === "experience") {
                state.experience.correctedText = correctedText;
                state.experience.correctedWords = correctedWords;
            }
        },
    },
});

export const { setGrammarCheck,
    setSpellCheck,
    setAllIncorrectWords,
    setAllGrammarErrors,
    setCorrectedSection
} = improveTextSlice.actions;
export default improveTextSlice.reducer;
