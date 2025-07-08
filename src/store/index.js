import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import appointmentReducer from './appointmentSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    appointments: appointmentReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // This helps with potential serialization issues
    }),
});

export default store;