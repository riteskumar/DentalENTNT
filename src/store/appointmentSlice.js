import { createSlice } from '@reduxjs/toolkit';

const appointmentSlice = createSlice({
  name: 'appointments',
  initialState: {
    list: [],
  },
  reducers: {
    addAppointment: (state, action) => {
      state.list.push(action.payload);
    },
  },
});

export const { addAppointment } = appointmentSlice.actions;
export default appointmentSlice.reducer;