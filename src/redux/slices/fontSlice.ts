import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the type for the state
type FontState = {
  fontFamily: string;
  fontSize: 'small' | 'medium' | 'large';
  margin: number;
  padding: number;
  color: string;
  sections: Array<{ id: number; component: string }>; // Sections will contain objects with id and component
}

// Initial state of the font with typed values
const initialState: FontState = {
  fontFamily: 'Arial',
  fontSize: 'medium', // NEW
  margin: 10,
  padding: 10,
  color: "#313342",
  sections: [], // This stores the sections of the font
};

const fontSlice = createSlice({
  name: 'font',
  initialState,
  reducers: {
    setFontFamily: (state, action: PayloadAction<string>) => {
      state.fontFamily = action.payload;
    },
    setFontSize: (state, action: PayloadAction<'small' | 'medium' | 'large'>) => {
      state.fontSize = action.payload;
    },
    setMargin: (state, action: PayloadAction<number>) => {
      state.margin = action.payload;
    },
    setPadding: (state, action: PayloadAction<number>) => {
      state.padding = action.payload;
    },
    setColor: (state, action: PayloadAction<string>) => {
      state.color = action.payload;
    },
    addSection: (state) => {
      state.sections.push({
        id: Date.now(), // Unique ID for each section
        component: 'NewSection',
      });
    },
  },
});

export const {
  setFontFamily,
  setFontSize,
  setMargin,
  setPadding,
  setColor,
  addSection,
} = fontSlice.actions;

export default fontSlice.reducer;
