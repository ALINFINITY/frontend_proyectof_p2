import { Empresa } from "../types/types";
import { fetchAPI } from "./Api";

export const EmpresaService = {
  findAll: async (): Promise<Empresa[]> => {
    return await fetchAPI("/empresas");
  },

  findOne: async (id: number): Promise<Empresa> => {
    return await fetchAPI(`/empresas/${id}`);
  },

  create: async (data: Partial<Empresa>): Promise<Empresa> => {
    const { nombre, ruc, direccion, telefono, email_contacto, sector_industria, estado } = data;
    return await fetchAPI("/empresas", {
      method: "POST",
      body: JSON.stringify({ nombre, ruc, direccion, telefono, email_contacto, sector_industria, estado }),
    });
  },

  update: async (id: number, empresa: Partial<Empresa>): Promise<Empresa | null> => {
    const { nombre, ruc, direccion, telefono, email_contacto, sector_industria, estado } = empresa;
    return await fetchAPI(`/empresas/${id}`, {
      method: "PUT",
      body: JSON.stringify({ nombre, ruc, direccion, telefono, email_contacto, sector_industria, estado }),
    });
  },

  remove: async (id: number): Promise<{ message: string }> => {
    return await fetchAPI(`/empresas/${id}`, { method: "DELETE" });
  },
};