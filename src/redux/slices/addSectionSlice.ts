import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type SectionType = {
  id: number;
  name: string;
  description: string;
  locked?: boolean;
  height?: string;
};

type AddSectionState = {
  availableSections: SectionType[];
  addedSections: SectionType[];
};

const initialState: AddSectionState = {
  availableSections: [
    {
      id: 3,
      name: "Experience",
      description: "",
      height: "h-[80px]",
      locked: true,
    },
    {
      id: 4,
      name: "Education",
      description: "",
    },
    {
      id: 5,
      name: "Projects",
      description: "",
      locked: true,
    },
  ],
  addedSections: [
    {
      id: 1,
      name: "Skills",
      description: "",
      locked: true,
    },
    {
      id: 2,
      name: "Certificate",
      description: "",
      height: "h-[80px]",
    },
  ],
};

export const addSectionSlice = createSlice({
  name: "addSection",
  initialState,
  reducers: {
    addNewSection: (state, action: PayloadAction<SectionType>) => {
      const section = action.payload;
          if (!state.addedSections.find(s => s.id === section.id)) {
        state.addedSections.push(section);
        state.availableSections = state.availableSections.filter(s => s.id !== section.id);
      }
    },
    
    removeSection: (state, action: PayloadAction<SectionType>) => {
      const section = action.payload;
      state.addedSections = state.addedSections.filter(s => s.id !== section.id);
      if (!state.availableSections.find(s => s.id === section.id)) {
        state.availableSections.push(section);
      }
    }

  },
});

export const { addNewSection, removeSection } = addSectionSlice.actions;
export default addSectionSlice.reducer;
