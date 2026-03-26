import Backendless from "./backendless";

const TABLE = "templates";

export const getTemplates = async () => {
  return await Backendless.Data.of(TABLE).find();
};

export const createTemplate = async (data) => {
  return await Backendless.Data.of(TABLE).save(data);
};

export const deleteTemplate = async (id) => {
  return await Backendless.Data.of(TABLE).remove({ objectId: id });
};