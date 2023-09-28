import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  modalIsOpen: false,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    toggleModalStatus: (state) => {
      state.modalIsOpen = !state.modalIsOpen;
    }
  },
});

export const { toggleModalStatus } =
  appSlice.actions;

export default appSlice.reducer;
