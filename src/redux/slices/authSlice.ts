import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "@/services/authService";
import Cookies from "js-cookie";

interface AuthState {
  user: any;
  token: string | null;
  loading: boolean;
  error: string | null;
  errorsList: Record<string, string[]>;
  statusCode: null;
}

// Async thunk for login
export const loginUser = createAsyncThunk("auth/login", async (credentials: { email: string; password: string }, { rejectWithValue }) => {
  try {
    const response = await authService.login(credentials);
    return response;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
}
);

// Async thunk for register
export const registerUser = createAsyncThunk( "auth/register", async (userData: { name: string; email: string; password: string, confirm_password: string, country_id: number, contact: number, referred_by: string }, { rejectWithValue }) => {
    try {
      const response = await authService.register(userData);
      return response;

    } catch (error: any) {
      console.log(error, "respnse in error");
      return rejectWithValue(error.response?.data || "Registration failed");
    }
  }
);

// Async thunk for Forget Password
export const forgetPassword = createAsyncThunk( "auth/forgetPassword",async (email: string, { rejectWithValue }) => {
    try {
      const response = await authService.forgetPassword(email);
      return response;

    } catch (error: any) {
      console.log(error, "respnse in error");
      return rejectWithValue(error.response?.data || "Registration failed");
    }
  }
);

// Async thunk for Update Password
export const UpdatePassword = createAsyncThunk(
  "auth/UpdatePassword",
  async (userData: { verify_code: string; password: string, password_confirmation : string, email: string}, { rejectWithValue }) => {
    try {
      const response = await authService.updatePassword(userData);
      return response;

    } catch (error: any) {
      console.log(error, "respnse in error");
      return rejectWithValue(error.response?.data || "Registration failed");
    }
  }
);

// Async thunk for logout
export const logoutUser = createAsyncThunk("auth/logout", async (_, { dispatch }) => {
  dispatch(authSlice.actions.handleLogout());
});

const authSlice = createSlice({
  name: "auth",
  initialState : {
  user: Cookies.get("userData") ? JSON.parse(Cookies.get("userData")!) : null,
  token: Cookies.get("userToken") || null,
  loading: false,
  errorsList: {},
  statusCode: null,
    } as AuthState,
  reducers: {
    handleSetUser: (state, action) => {
      state.user = action.payload;
      Cookies.set("userData", JSON.stringify(action.payload));
    },
    handleSetToken: (state, action) => {      
      state.token = action.payload;
      Cookies.set("userToken", action.payload);
    },
    handleLogout: (state) => {
      state.user = null;
      state.token = null;
      Cookies.remove("userToken");
      },
    clearSessionAndStorages: (state) => {
        console.log("Clearing all storage data...");
        // Clear all storage
        localStorage.clear();
        sessionStorage.clear();
  
        // Clear all cookies
        const allCookies = Cookies.get();
        Object.keys(allCookies).forEach((cookieName) => {
          Cookies.remove(cookieName);
        });
         state.user = null;
        state.token = null;
        state.loading = false;
        state.errorsList = {};
        state.statusCode = null;
      },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action?.payload?.response?.data?.user; 
        state.token = action.payload.response.data.token; 
         Cookies.set("userToken", action.payload.response.data.token);
         Cookies.set("userData", JSON.stringify(action.payload.response.data.user));
      })   
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message ? "Invalid Credentials" : "";
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.errorsList = {};
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        const payload = action.payload as any;
        if (payload?.statusCode === 400) {
          state.errorsList = payload.errors || {};
          state.error = "Validation failed";
        } else {
          state.error = payload?.message || "Registration failed";
        }
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        Cookies.remove("userToken");
        Cookies.remove("userData");
      });
  },
});

export const { handleSetUser, handleSetToken, handleLogout, clearSessionAndStorages } = authSlice.actions;
export default authSlice.reducer;
