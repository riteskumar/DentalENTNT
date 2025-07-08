import { store } from '../store/store';
import { setUser } from '../store/authSlice';


export const initializeAuth = () => {
  const savedUser = localStorage.getItem('currentUser');
  if (savedUser) {
    const user = JSON.parse(savedUser);
    store.dispatch(setUser({ user }));
  }
};