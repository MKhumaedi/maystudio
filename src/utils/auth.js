import Backendless from "../lib/backendless";

export const getCurrentUser = async () => {
  try {
    return await Backendless.UserService.getCurrentUser();
  } catch {
    return null;
  }
};

export const isAdmin = (user) => {
  return user?.role === "admin";
};