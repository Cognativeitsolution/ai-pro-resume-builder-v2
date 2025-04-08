import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { OldAPI } from '@/services/oldService';

type countriesState = {
    countries: any;
    countriesLoading: boolean;
}
// Async thunk for login
export const useCountries = createAsyncThunk("countries/useCountries", async (_, { rejectWithValue }) => {
    try {
        const response = await OldAPI.get("/show-countries");
        return response.data;
    } catch (error: any) {
        return rejectWithValue(error.message);
    }
}
);

const reuseableSlice = createSlice({
    name: "countries",
    initialState: {
        countries: null,
        countriesLoading: false
    } as countriesState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(useCountries.pending, (state) => {
                state.countriesLoading = true;
            })
            .addCase(useCountries.fulfilled, (state, action) => {
                 state.countriesLoading = false;
                 state.countries = action?.payload;
            })
            .addCase(useCountries.rejected, (state, action) => {
                state.countriesLoading = false;
            })
    },
});

export default reuseableSlice.reducer;
