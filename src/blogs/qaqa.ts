import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

// Types
interface AllocationItem {
  id: string;
  quantity: number;
}

export interface AllocateUserPayload {
  userId: string;
  giveaway: AllocationItem[];
  sample: AllocationItem[];
}

interface AllocateUserResponse {
  success: boolean;
  message: string;
  data?: any;
}

interface AllocateUserState {
  loading: boolean;
  success: boolean;
  error: string | null;
  response: AllocateUserResponse | null;
}

// Initial State
const initialState: AllocateUserState = {
  loading: false,
  success: false,
  error: null,
  response: null,
};

// Async Thunk: Allocate User (POST /api/v1/users/allocate)
export const allocateUser = createAsyncThunk<
  AllocateUserResponse,
  AllocateUserPayload,
  { rejectValue: string }
>("allocation/allocateUser", async (payload, { rejectWithValue }) => {
  try {
    // Get token from localStorage
    const sessionStr = localStorage.getItem("userSession");
    if (!sessionStr) {
      return rejectWithValue("No session found. Please login again.");
    }

    const response = await axios.post<AllocateUserResponse>(
      `${baseUrl}api/v1/users/allocate`,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStr}`,
        },
      }
    );

    return response.data;
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.message ||
      "Failed to allocate items to user. Please try again.";

    return rejectWithValue(errorMessage);
  }
});

// Async Thunk: Update User Allocation (PUT /api/v1/users/allocate/:userId)
export const updateAllocateUser = createAsyncThunk<
  AllocateUserResponse,
  { userId: string; payload: Omit<AllocateUserPayload, "userId"> },
  { rejectValue: string }
>("allocation/updateAllocateUser", async ({ userId, payload }, { rejectWithValue }) => {
  try {
    const sessionStr = localStorage.getItem("userSession");
    if (!sessionStr) {
      return rejectWithValue("No session found. Please login again.");
    }

    const response = await axios.put<AllocateUserResponse>(
      `${baseUrl}api/v1/users/allocate/${userId}`,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStr}`,
        },
      }
    );

    return response.data;
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.message ||
      "Failed to update allocation. Please try again.";

    return rejectWithValue(errorMessage);
  }
});

// Slice
const allocateUserSlice = createSlice({
  name: "allocateUser",
  initialState,
  reducers: {
    resetAllocateUserState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.response = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(allocateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(allocateUser.fulfilled, (state, action: PayloadAction<AllocateUserResponse>) => {
        state.loading = false;
        state.success = true;
        state.response = action.payload;
        state.error = null;
      })
      .addCase(allocateUser.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload || "Failed to allocate items";
        state.response = null;
      })
      .addCase(updateAllocateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(
        updateAllocateUser.fulfilled,
        (state, action: PayloadAction<AllocateUserResponse>) => {
          state.loading = false;
          state.success = true;
          state.response = action.payload;
          state.error = null;
        }
      )
      .addCase(updateAllocateUser.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload || "Failed to update allocation";
        state.response = null;
      });
  },
});

// Export actions
export const { resetAllocateUserState } = allocateUserSlice.actions;

// Export reducer
export default allocateUserSlice.reducer;

// Selectors
export const selectAllocateUserLoading = (state: { allocateUser: AllocateUserState }) =>
  state.allocateUser.loading;
export const selectAllocateUserSuccess = (state: { allocateUser: AllocateUserState }) =>
  state.allocateUser.success;
export const selectAllocateUserError = (state: { allocateUser: AllocateUserState }) =>
  state.allocateUser.error;
export const selectAllocateUserResponse = (state: { allocateUser: AllocateUserState }) =>
  state.allocateUser.response;