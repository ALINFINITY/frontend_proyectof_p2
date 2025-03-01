import { Empresa } from "../types/types";
import { fetchAPI } from "./Api";

export const EmpresaService = {
  findAll: async (): Promise<Empresa[]> => {
    return await fetchAPI("/empresas");
  },

  create: async (data: Partial<Empresa>): Promise<Empresa> => {
    const { nombre, ruc, direccion, telefono, email_contacto, sector_industria, estado } = data;
    return await fetchAPI("/empresas", {
      method: "POST",
      body: JSON.stringify({
        nombre,
        ruc,
        direccion,
        telefono,
        email_contacto,
        sector_industria,
        estado,
      }),
    });
  },
};