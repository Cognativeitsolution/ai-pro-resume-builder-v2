import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { improveText } from "@/utils/improveText";


type SectionType = {
  id?: number;
  name?: string;
  locked?: boolean;
  description?: string;
  newSecName?: any;
};

type AddSectionState = {
  availableSections: SectionType[];
  addedSections: SectionType[];
  userSoft_Skills: any;
  userTechnical_Skills: any;
  userProjects: any;
  userExperiences: any;
  userEducation: any;
  userCertificates: any;
  userHeader: any;
  userSummary: any;
  userAwards: any;
  userReferences: any;
  userCustomSections: any;
  userLanguages: any;
  sectionBgColor?: any;
  editMode?: any;
};

const initialState: AddSectionState = {
  availableSections: [
    {
      id: 3,
      name: "Education",
    },
    {
      id: 4,
      name: "Experience",
      locked: true,
    },
    {
      id: 5,
      name: "Projects",
      locked: true,
    },
    {
      id: 6,
      name: "Soft Skills",
      locked: true,
    },
    {
      id: 7,
      name: "Technical Skills",
      locked: true,
    },
    {
      id: 8,
      name: "Certificate"
    },
    {
      id: 9,
      name: "Awards",
      locked: true,
    },
    {
      id: 10,
      name: "Languages",
      locked: true,
    },
    {
      id: 11,
      name: "References",
      locked: true,
    },
    {
      id: 12,
      name: "Custom Section",
      newSecName: "",
    },
  ],
  addedSections: [
    // {
    //   id: 1,
    //   name: "Header",
    //   description: "Engr. Rimsha Naeem",
    //   locked: true,
    // },
    {
      id: 2,
      name: "Summary",
      description: "Briefly expln why yu're a great fit for the role - use the AI assistant to tailor this summary for each job posting.",
      locked: true,
    },

  ],
  userSoft_Skills: [],
  userTechnical_Skills: [],
  userProjects: [],
  userExperiences: [],
  userEducation: [],
  userCertificates: [],
  userHeader: "",
  userSummary: "",
  userAwards: [],
  userReferences: [],
  userLanguages: [],
  userCustomSections: [],
  sectionBgColor: '#E7E9EB',
  editMode: false,
};

export const addSectionSlice = createSlice({
  name: "addSection",
  initialState,
  reducers: {

    sectionEditMode: (state, action) => {
      const section = action.payload;
      state.editMode = section;
    },

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
    addUserHeader: (state, action: PayloadAction<{ sectionId: number; detail: any }>) => {
      const { sectionId, detail } = action.payload;
      state.userHeader = detail
    },
    // addUserSummary: (state, action: PayloadAction<{ sectionId: number; detail: any }>) => {
    //   const { sectionId, detail } = action.payload;
    //   const section = state.addedSections.find(sec => sec.id === sectionId);
    //   if (section) {
    //     section.description = detail;
    //   }
    // },
    addUserSummary: (state, action: PayloadAction<{ sectionId: number; detail: any }>) => {
      const { sectionId, detail } = action.payload;
      const improved = typeof detail === 'string' ? improveText(detail) : detail;

      const section = state.addedSections.find(sec => sec.id === sectionId);
      if (section) {
        section.description = improved;
      }

      state.userSummary = improved;
      console.log(improved, "improvedSummary")
    },
    addUserSoft_Skills: (state, action: PayloadAction<{ sectionId: number; detail: any }>) => {
      const { sectionId, detail } = action.payload;
      state.userSoft_Skills = detail;
    },
    addUserTechnical_Skills: (state, action: PayloadAction<{ sectionId: number; detail: any }>) => {
      const { sectionId, detail } = action.payload;
      state.userTechnical_Skills = detail;
    },
    addUserProjects: (state, action: PayloadAction<{ sectionId: number; detail: any }>) => {
      const { sectionId, detail } = action.payload;
      state.userProjects = detail;
    },
    // addUserEducation: (state, action: PayloadAction<{ sectionId: number; detail: any }>) => {
    //   const { sectionId, detail } = action.payload;
    //   state.userEducation = detail;

    //   const section = state.addedSections.find(sec => sec.id === sectionId);
    //   if (section) {
    //     (section as any).detail = detail;
    //   }
    // },
    addUserEducation: (state, action: PayloadAction<{ sectionId: number; detail: any }>) => {
      const { sectionId, detail } = action.payload;

      // Optional: Map over each item and improve the text fields
      const improved = detail.map((edu: any) => ({
        ...edu,
        degree: improveText(edu.degree || ""),
        schoolName: improveText(edu.schoolName || ""),
        location: improveText(edu.location || ""),
      }));

      const section = state.addedSections.find(sec => sec.id === sectionId);
      if (section) {
        (section as any).detail = improved;
        console.log(improved, "improvedEducation + 1111")
      }

      state.userEducation = improved;
      console.log(improved, "improvedEducation")
    },
    addUserExperience: (state, action: PayloadAction<{ sectionId: number; detail: any }>) => {
      const { sectionId, detail } = action.payload;
      state.userExperiences = detail;
    },
    addUserCertificates: (state, action: PayloadAction<{ sectionId: number; detail: any }>) => {
      const { sectionId, detail } = action.payload;
      state.userCertificates = detail;
    },
    AddUserReferences: (state, action: PayloadAction<{ sectionId: number; detail: any }>) => {
      const { sectionId, detail } = action.payload;
      state.userReferences = detail;
    },
    addUserLanguages: (state, action: PayloadAction<{ sectionId: number; detail: any }>) => {
      const { sectionId, detail } = action.payload;
      state.userLanguages = detail
    },
    addUserCustomSection: (state, action: PayloadAction<{ sectionId: number; detail: any, newSecName?: any }>) => {
      const { sectionId, detail, newSecName } = action.payload;
      state.userCustomSections = detail
      const section = state.addedSections.find(sec => sec.id === sectionId);
      if (section) {
        section.newSecName = newSecName;
      }
    },

    addUserAwards: (state, action: PayloadAction<{ sectionId: number; detail: any }>) => {
      const { sectionId, detail } = action.payload;
      // console.log(sectionId, detail, "1111=userAwards");
      state.userAwards = detail;
    },

    reorderSections: (state, action: any) => {
      // Reorder the addedSections array based on drag-and-drop actions
      state.addedSections = action.payload;
    }

  },
});

export const { sectionEditMode, addUserAwards, addUserCustomSection, addUserLanguages, AddUserReferences, addNewSection, removeSection, reorderSections,
  addUserSoft_Skills, addUserTechnical_Skills, addUserProjects, addUserEducation, addUserExperience, addUserCertificates,
  addUserHeader, addUserSummary
} =
  addSectionSlice.actions;
export default addSectionSlice.reducer;
