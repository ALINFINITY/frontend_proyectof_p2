import { Categoria } from "../types/types";
import { fetchAPI } from "./Api";

export const CategoriaService = {
  findAll: async (): Promise<Categoria[]> => {
    return await fetchAPI("/categoria");
  },

  create: async (data: Partial<Categoria>): Promise<Categoria> => {
    const { nombre, descripcion } = data;
    return await fetchAPI("/categoria", {
      method: "POST",
      body: JSON.stringify({ nombre, descripcion }),
    });
  },
};