import { Categoria } from "../types/types";
import { fetchAPI } from "./Api";

export const CategoriaService = {
  findAll: async (): Promise<Categoria[]> => {
    return await fetchAPI("/categoria");
  },

  findOne: async (id: number): Promise<Categoria> => {
    return await fetchAPI(`/categoria/${id}`);
  },

  create: async (data: Partial<Categoria>): Promise<Categoria> => {
    const { nombre, descripcion } = data;
    return await fetchAPI("/categoria", {
      method: "POST",
      body: JSON.stringify({ nombre, descripcion }),
    });
  },

  update: async (id: number, categoria: Partial<Categoria>): Promise<Categoria> => {
    const { nombre, descripcion } = categoria;
    return await fetchAPI(`/categoria/${id}`, {
      method: "PUT",
      body: JSON.stringify({ nombre, descripcion }),
    });
  },

  remove: async (id: number): Promise<void> => {
    return await fetchAPI(`/categoria/${id}`, { method: "DELETE" });
  },
};