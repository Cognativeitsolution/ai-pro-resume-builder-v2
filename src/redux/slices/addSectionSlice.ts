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
type userSectionDetailData = Skill | Education | Experience | Certificate | Projects;

type SectionType = {
  id: number;
  name: string;
  description: string;
  locked?: boolean;
  height?: string;
  userData?: Skill[] | Education[] | Experience[] | Certificate[] | Projects[];
};

type AddSectionState = {
  availableSections: SectionType[];
  addedSections: SectionType[]; 
  userSkills : any;
  userProjects: any;
  userExperiences: any;
  userEducation: any;
  userCertificates: any;
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
  ],
  userSkills: [],
  userProjects: [],
  userExperiences: [],
  userEducation: [],
  userCertificates: [],
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
    
    addUserSkills: ( state, action: PayloadAction<{ sectionId: number; detail: any }> ) => {
      const { sectionId, detail } = action.payload;
      console.log(sectionId, detail, "userSkills");
      state.userSkills.push(detail);
    },
    addUserProjects: ( state, action: PayloadAction<{ sectionId: number; detail: any }> ) => {
      const { sectionId, detail } = action.payload;
      console.log(sectionId, detail, "userProjects");
      state.userProjects.push(detail);
    },
    addUserEducation: ( state, action: PayloadAction<{ sectionId: number; detail: any }> ) => {
      const { sectionId, detail } = action.payload;
      console.log(sectionId, detail, "userEducation");
      state.userEducation.push(detail);
    },
    addUserExperience: ( state, action: PayloadAction<{ sectionId: number; detail: any }> ) => {
      const { sectionId, detail } = action.payload;
      console.log(sectionId, detail, "userExperiences");
      state.userExperiences.push(detail);
    },
    addUserCertificates: ( state, action: PayloadAction<{ sectionId: number; detail: any }> ) => {
      const { sectionId, detail } = action.payload;
      console.log(sectionId, detail, "userCertificates");
      state.userCertificates.push(detail);
    },
    
    reorderSections: (state, action: any) => {
      // Reorder the addedSections array based on drag-and-drop actions
      state.addedSections = action.payload;
    }
    

  },
});

export const { addNewSection, removeSection,reorderSections, 
  addUserSkills, addUserProjects, addUserEducation, addUserExperience, addUserCertificates,
} = 
  addSectionSlice.actions;
export default addSectionSlice.reducer;
