import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define section types
interface EducationDetail {
  degree: string;
  schoolName: string;
  location: string;
}

interface ExperienceDetail {
  title: string;
  description: string;
  companyName: string;
  location: string;
}

type LeftSection =
  | { id: 2; name: "Summary"; detail: any[] }
  | { id: 3; name: "Education"; detail: EducationDetail[] }
  | { id: 4; name: "Experience"; detail: ExperienceDetail[] };

type RightSection =
  | { id: 6; name: "Soft Skills"; detail: any[] }
  | { id: 7; name: "Technical Skills"; detail: any[] };

  type Section = {id:number; name:string; detail? : any[]}

interface Page {
  left: Section[];
  right: Section[];
}

interface PagesState {
  pages: Page[];
}

interface AddSectionPayload {
  section:  Section;
  pageIndex: number;
  side: "left" | "right";
}

interface AddVariantPayload {
  sectionName: string;
  pageIndex: number;
  side: "left" | "right";
  newVariant: any; 
}

const initialState: PagesState = {
  pages: [
    {
      left: [],
      right: [],
    },
  ],
};

export const pagesSlice = createSlice({
  name: 'pages',
  initialState,
  reducers: {
    setPages: (state, action: PayloadAction<Page[]>) => {
      state.pages = action.payload;
    },
    addSectionToPage: (state, action: PayloadAction<AddSectionPayload>) => {
      const { section, pageIndex, side } = action.payload;
      const page = state.pages[pageIndex];
      if (side === 'left') {
        page.left.push(section as LeftSection);
      } else {
        page.right.push(section as RightSection);
      }
    },

    addVariantToSection: (state, action: PayloadAction<AddVariantPayload>) => {
      const { sectionName, pageIndex, side, newVariant } = action.payload;
      const page = state.pages[pageIndex];

      if (side === 'left') {
        const section = page.left.find((sec) => sec.name === sectionName);
        if (section) {
          section.detail?.push(newVariant);
        }
      } else {
        const section = page.right.find((sec) => sec.name === sectionName);
        if (section) {
          section.detail?.push(newVariant);
        }
      }
    },

    removeSectionFromPage: (state, action: PayloadAction<{ sectionName: string; pageIndex: number; side: "left" | "right" }>) => {
      const { sectionName, pageIndex, side } = action.payload;
      const page = state.pages[pageIndex];
      if (side === 'left') {
        page.left = page.left.filter((section) => section.name !== sectionName);
      } else {
        page.right = page.right.filter((section) => section.name !== sectionName);
      }
    },

    removeVariantFromSection: (state, action: PayloadAction<{ sectionName: string; pageIndex: number; side: "left" | "right"; variantIndex: number }>) => {
      const { sectionName, pageIndex, side, variantIndex } = action.payload;
      const page = state.pages[pageIndex];

      if (side === 'left') {
        const section = page.left.find((sec) => sec.name === sectionName);
        if (section && section?.detail?.length! > variantIndex) {
          section.detail?.splice(variantIndex, 1);
        }
      } else {
        const section = page.right.find((sec) => sec.name === sectionName);
        if (section && section.detail?.length! > variantIndex) {
          section.detail?.splice(variantIndex, 1);
        }
      }
    },
  },
});

export const { setPages, addSectionToPage, addVariantToSection, removeSectionFromPage, removeVariantFromSection } = pagesSlice.actions;

export default pagesSlice.reducer;
