import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SectionCorrection {
    originalText: string;
    correctedText: string;
    correctedWords: string[];
    incorrectWords: string[];
    totalLength: number;
}

interface ImproveTextState {
    grammarCheck: boolean;
    spellCheck: boolean;
    incorrectWords: string[];
    grammarErrors: string[];
    sections: Record<string, SectionCorrection>;
}

const initialState: ImproveTextState = {
    grammarCheck: false,
    spellCheck: false,
    incorrectWords: [],
    grammarErrors: [],
    sections: {}
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
        setAllIncorrectWords(state, action: PayloadAction<string[]>) {
            state.incorrectWords = action.payload;
        },
        setAllGrammarErrors(state, action: PayloadAction<string[]>) {
            state.grammarErrors = action.payload;
        },

        // ✅ Dynamic section correction handler
        setCorrectedSection: (
            state,
            action: PayloadAction<{
                section: string;
                originalText: string;
                correctedText: string;
                correctedWords: string[];
                incorrectWords: string[];
                totalLength: number;
            }>
        ) => {
            const { section, originalText, correctedText, correctedWords, incorrectWords, totalLength } = action.payload;
            state.sections[section] = {
                originalText,
                correctedText,
                correctedWords,
                incorrectWords,
                totalLength
            };
        }
    }
});

export const {
    setGrammarCheck,
    setSpellCheck,
    setAllIncorrectWords,
    setAllGrammarErrors,
    setCorrectedSection
} = improveTextSlice.actions;

export default improveTextSlice.reducer;
