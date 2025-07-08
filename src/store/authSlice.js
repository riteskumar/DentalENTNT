// File: src/store/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { startLogoutTimer } from '../utils/autoLogout';

// Real API login using DummyJSON
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      // Mock users instead of API call
      const users = [
        { id: "1", role: "admin",username:"ENTNT Executive",email: "admin@entnt.in", password: "admin123" },
        { id: "2", role: "patient",username:"John" , email: "john@entnt.in", password: "patient123", patientId: "p1" }
      ];

      const user = users.find(u => u.email === email && u.password === password);
      if (user) {
        const mappedUser = {
          id: user.id,
          email: user.email,
          username:user.username,
          role: user.role,
          permissions: getPermissions(user.role),
          patientId: user.patientId
        };

        localStorage.setItem('currentUser', JSON.stringify(mappedUser));
        startLogoutTimer();
        return { user: mappedUser };
      } else {
        return rejectWithValue('Invalid email or password');
      }
    } catch (error) {
      return rejectWithValue('Login failed. Please try again.');
    }
  }
);



// Helper function to get permissions based on role
function getPermissions(role) {
  switch (role) {
    case 'admin':
      return ['view_all', 'edit_patients', 'backup_data', 'manage_roles', 'view_patients']
      case 'patient':
        return ['view_patients', 'edit_patients']
    default:
      return ['view_patients']
  }
}
const savedUser = JSON.parse(localStorage.getItem('currentUser'))

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: savedUser,
    isLoading: false,
    error: null,
    isAuthenticated: !!savedUser,
  },
  reducers: {
    logout: (state) => {
      state.user = null
      state.isAuthenticated = false
      localStorage.removeItem('currentUser')
    },
    clearError: (state) => {
      state.error = null
    },
    setUser: (state, action) => {
      state.user = action.payload.user
      state.isAuthenticated = true
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.user = action.payload.user
        state.isAuthenticated = true
        state.error = null
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
        state.isAuthenticated = false
      })
  },
})

export const { logout, clearError, setUser } = authSlice.actions
export default authSlice.reducer