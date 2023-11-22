import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import JobDataService from "../services/JobService";

const initialState = [];

export const createJob = createAsyncThunk(
  "jobs/create",
  async ({ title, description, role, company, salary }) => {
    const res = await JobDataService.create({ title, description, role, company, salary });
    return res.data;
  }
);

export const retrieveJobs = createAsyncThunk(
  "jobs/retrieve",
  async () => {
    const res = await JobDataService.getAll();
    return res.data;
  }
);

export const updateJob = createAsyncThunk(
  "jobs/update",
  async ({ id, data }) => {
    const res = await JobDataService.update(id, data);
    return res.data;
  }
);

export const deleteJob = createAsyncThunk(
  "jobs/delete",
  async ({ id }) => {
    await JobDataService.remove(id);
    return { id };
  }
);

export const deleteAllJobs = createAsyncThunk(
  "jobs/deleteAll",
  async () => {
    const res = await JobDataService.removeAll();
    return res.data;
  }
);

export const findJobsByTitle = createAsyncThunk(
  "jobs/findByTitle",
  async ({ title }) => {
    const res = await JobDataService.findByTitle(title);
    return res.data;
  }
);

const jobSlice = createSlice({
  name: "job",
  initialState,
  extraReducers(builder) {
    builder.addCase(createJob.fulfilled, (state, action) => {
      state.push(action.payload);
    })
    .addCase(retrieveJobs.fulfilled, (state, action) => {
      return [...action.payload];
    })
    .addCase(updateJob.fulfilled, (state, action) => {
      const index = state.findIndex(job => job.id === action.payload.id);
        state[index] = {
          ...state[index],
          ...action.payload,
        };
    })
    .addCase(deleteJob.fulfilled, (state, action) => {
      return [];
    })
    .addCase(deleteAllJobs.fulfilled, (state, action) => {
      return [];
    })
    .addCase(findJobsByTitle.fulfilled, (state, action) => {
      return [...action.payload];
    })
  }
})

const { reducer } = jobSlice;
export default reducer;