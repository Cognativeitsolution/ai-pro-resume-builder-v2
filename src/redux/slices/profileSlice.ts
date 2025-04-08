import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API } from '@/services/backendService';

type profileState = {
    profile: any;
    loading: boolean;
    technicalSkills: any[];
    softSkills: any[];
    education: any[];
    experiences: any[];
    certificates: any[];
    awards: any[];
    languages: any[];
    references: any[];
}
// Async thunk for login
export const userProfile = createAsyncThunk("profile/userProfile", async (_, { rejectWithValue }) => {
    try {
        const response = await API.get("user/profile");
        return response;
    } catch (error: any) {
        return rejectWithValue(error.message);
    }
});

// Async thunk for Technical Skills
export const userTechnicalSkills = createAsyncThunk("profile/userTechnicalSkills", async (_, { rejectWithValue }) => {
    try {
        const response = await API.get("user/profile/technical-skills");
        return response;
    } catch (error: any) {
        return rejectWithValue(error.message);
    }
});

// Async thunk for Soft Skills
export const userSoftSkills = createAsyncThunk("profile/userSoftSkills", async (_, { rejectWithValue }) => {
    try {
        const response = await API.get("user/profile/soft-skills");
        return response;
    } catch (error: any) {
        return rejectWithValue(error.message);
    }
});

// Async thunk for userEducation
export const userEducation = createAsyncThunk("profile/userEducation", async (_, { rejectWithValue }) => {
    try {
        const response = await API.get("user/profile/education");
        return response;
    } catch (error: any) {
        return rejectWithValue(error.message);
    }
});

// Async thunk for userExperiences
export const userExperiences = createAsyncThunk("profile/userExperiences", async (_, { rejectWithValue }) => {
    try {
        const response = await API.get("user/profile/experiences");
        return response;
    } catch (error: any) {
        return rejectWithValue(error.message);
    }
});

// Async thunk for userCertificates
export const userCertificates = createAsyncThunk("profile/userCertificates", async (_, { rejectWithValue }) => {
    try {
        const response = await API.get("user/profile/certificates");
        return response;
    } catch (error: any) {
        return rejectWithValue(error.message);
    }
});

// Async thunk for userAwards
export const userAwards = createAsyncThunk("profile/userAwards", async (_, { rejectWithValue }) => {
    try {
        const response = await API.get("user/profile/awards");
        return response;
    } catch (error: any) {
        return rejectWithValue(error.message);
    }
});
// Async thunk for userLanguages
export const userLanguages = createAsyncThunk("profile/userLanguages", async (_, { rejectWithValue }) => {
    try {
        const response = await API.get("user/profile/languages");
        return response;
    } catch (error: any) {
        return rejectWithValue(error.message);
    }
});

// Async thunk for userReferences
export const userReferences = createAsyncThunk("profile/userReferences", async (_, { rejectWithValue }) => {
    try {
        const response = await API.get("user/profile/references");
        return response;
    } catch (error: any) {
        return rejectWithValue(error.message);
    }
});
const profileSlice = createSlice({
    name: "profile",
    initialState: {
        profile: null,
        loading: false,
        technicalSkills: [],
        softSkills: [],
        education: [],
        experiences:[],
        certificates: [],
        awards: [],
        languages: [],
        references: []
    } as profileState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(userProfile.pending, (state) => {
                state.loading = true;
            })
            .addCase(userProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.profile = action?.payload?.response?.data;
            })
            .addCase(userProfile.rejected, (state, action) => {
                state.loading = false;
            })
            .addCase(userTechnicalSkills.fulfilled, (state, action) => {
                state.technicalSkills = action?.payload?.response?.data;
            })
            .addCase(userSoftSkills.fulfilled, (state, action) => {
                state.softSkills = action?.payload?.response?.data;
            })
            .addCase(userEducation.fulfilled, (state, action) => {
                state.education = action?.payload?.response?.data;
            })
            .addCase(userExperiences.fulfilled, (state, action) => {
                state.experiences = action?.payload?.response?.data;
            })
            .addCase(userCertificates.fulfilled, (state, action) => {
                state.certificates = action?.payload?.response?.data;
            })
            .addCase(userAwards.fulfilled, (state, action) => {
                state.awards = action?.payload?.response?.data;
            })
            .addCase(userLanguages.fulfilled, (state, action) => {
                state.languages = action?.payload?.response?.data;
            })
            .addCase(userReferences.fulfilled, (state, action) => {
                state.references = action?.payload?.response?.data;
            });
    },
});

// export const { handleSetUser, handleSetToken, handleLogout, clearSessionAndStorages } = profileSlice.actions;
export default profileSlice.reducer;
