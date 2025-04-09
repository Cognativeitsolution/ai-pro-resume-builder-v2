import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Skill = {
  type: "skill";
  name: string;
  level?: string;
};

type Education = {
  type: "education";
  school: string;
  degree: string;
  field: string;
  startYear: string;
  endYear?: string;
};

type Experience = {
  type: "experience";
  company: string;
  title: string;
  startDate: string;
  endDate?: string;
  description?: string;
};

type Certificate = {
  type: "certificate";
  title: string;
  issuer: string;
  date: string;
};
type Projects = {
  type: "projects";
  title: string;
  issuer: string;
  date: string;
};
type userSectionDetailData = Skill | Education | Experience | Certificate;


type SectionType = {
  id: number;
  name: string;
  description: string;
  locked?: boolean;
  height?: string;
  userData?: Skill[] | Education[] | Experience[] | Certificate[];
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
      locked: true,
      userData: [],
    },
    {
      id: 4,
      name: "Education",
      description: "",
      userData: [],
    },
    {
      id: 5,
      name: "Projects",
      description: "",
      locked: true,
      userData: [],
    },
  ],
  addedSections: [
    {
      id: 1,
      name: "Skills",
      description: "",
      locked: true,
      userData: [],
    },
    {
      id: 2,
      name: "Certificate",
      description: "",
      userData: [],
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
    },

    addUserSectionDetail: ( state, action: PayloadAction<{ sectionId: number; detail: userSectionDetailData }> ) => {
      const { sectionId, detail } = action.payload;
      const section = state.addedSections.find((s) => s.id === sectionId);
      if (section) {
        if (!section.userData) {
          section.userData = [];
        }
        // section.userData.push(detail);
      }
    },


    reorderSections: (state, action: any) => {
      // Reorder the addedSections array based on drag-and-drop actions
      state.addedSections = action.payload;
    }
    

  },
});

export const { addNewSection, removeSection, addUserSectionDetail , reorderSections} = addSectionSlice.actions;
export default addSectionSlice.reducer;
