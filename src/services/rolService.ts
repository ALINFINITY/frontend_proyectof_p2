import { Rol } from "../types/types";
import { fetchAPI } from "./Api";

export const RolService = {
  findAll: async (): Promise<Rol[]> => {
    return await fetchAPI("/roles");
  },

  findOne: async (id: number): Promise<Rol> => {
    return await fetchAPI(`/roles/${id}`);
  },
  create: async (data: Partial<Rol>): Promise<Rol> => {
    const { nombre, descripcion } = data;
    return await fetchAPI("/roles", {
      method: "POST",
      body: JSON.stringify({ nombre, descripcion }),
    });
  },
  update: async (id: number, rol: Partial<Rol>): Promise<Rol> => {
    const { nombre, descripcion } = rol;
    return await fetchAPI(`/roles/${id}`, {
      method: "PUT",
      body: JSON.stringify({ nombre, descripcion }),
    });
  },
  remove: async (id: number): Promise<void> => {
    return await fetchAPI(`/roles/${id}`, { method: "DELETE" });
  },
};
