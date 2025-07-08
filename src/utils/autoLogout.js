import { store } from '../store/store';
import { logout } from '../store/authSlice';

let logoutTimer;

export const startLogoutTimer = () => {
  clearLogoutTimer();

  logoutTimer = setTimeout(() => {
    store.dispatch(logout());
    window.location.href = '/login';
  }, 180000);
};

export const clearLogoutTimer = () => {
  if (logoutTimer) {
    clearTimeout(logoutTimer);
  }
};
//
export const resetLogoutTimer = () => {
  startLogoutTimer();
};