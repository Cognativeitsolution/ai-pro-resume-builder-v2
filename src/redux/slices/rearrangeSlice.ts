import { createSlice, PayloadAction } from "@reduxjs/toolkit";


type SectionType = string;

type RerrangeState = {
  column: boolean;       // true = double column, false = single
  list: SectionType[];   // list of section names
};

const initialState: RerrangeState = {
  column: true, // default to double column
  list: [],
};

export const rearrangeSlice = createSlice({
  name: "rearrange",
  initialState,
  reducers: {
  setColumn: (state, action: PayloadAction<boolean>) => {
    state.column = action.payload;
  },
  setList: (state, action: PayloadAction<SectionType[]>) => {
    state.list = action.payload;
  },
},
});

export const { setColumn, setList } = rearrangeSlice.actions;
export default rearrangeSlice.reducer;
