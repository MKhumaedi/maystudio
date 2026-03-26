import Backendless from "./backendless";

export const uploadFile = async (file) => {
  const res = await Backendless.Files.upload(file, "templates", true);
  return res.fileURL;
};