import { createSlice } from '@reduxjs/toolkit';

export const dataSlice = createSlice({
  name: 'data',
  initialState: {
    id: 1,
    title: "Title",
    description: "Description"
  },
  reducers: {
    updateId: (state, action) => {
        state.id = action.payload;
    },
    updateTitle: (state, action) => {
        state.title = action.payload;
    },
    updateDescription: (state, action) => {
        state.description = action.payload;
    },
  }
})

export const { updateId, updateTitle, updateDescription } = dataSlice.actions;

export default dataSlice.reducer;