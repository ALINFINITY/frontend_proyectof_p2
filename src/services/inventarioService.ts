import { Inventario } from "../types/types";
import { fetchAPI } from "./Api";

export const InventarioService = {
  findAll: async (): Promise<Inventario[]> => {
    return await fetchAPI("/inventario");
  },

  create: async (empresaId: number): Promise<Inventario> => {
    return await fetchAPI(`/inventario/empresa/${empresaId}`, {
      method: "POST",
    });
  },

  remove: async (inventarioid: number): Promise<void> => {
    return await fetchAPI(`/inventario/${inventarioid}`, { method: "DELETE" });
  },
};
