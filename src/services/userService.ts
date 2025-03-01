import { Usuario } from "../types/types";
import { fetchAPI } from "./Api";

export const UsuarioService = {
  findAll: async (): Promise<Usuario[]> => {
    return await fetchAPI("/usuario");
  },

  findOne: async (id: number): Promise<Usuario> => {
    return await fetchAPI(`/usuario/${id}`);
  },

  create: async (data: Partial<Usuario>): Promise<Usuario> => {
    const { nombre_completo, email, telefono, password_hash, empresa, roles } =
      data;
    return await fetchAPI("/usuario", {
      method: "POST",
      body: JSON.stringify({
        nombre_completo,
        email,
        telefono,
        password_hash,
        empresa,
        roles,
      }),
    });
  },

  asignarRol: async (userId: number, rolId: number): Promise<Usuario> => {
    return await fetchAPI(`/usuario/${userId}/rol/${rolId}`, {
      method: "POST",
    });
  },

  asignarEmpresa: async (
    userId: number,
    empresaId: number
  ): Promise<Usuario> => {
    return await fetchAPI(`/usuario/${userId}/empresa/${empresaId}`, {
      method: "POST",
    });
  },

  update: async (id: number, usuario: Partial<Usuario>): Promise<Usuario> => {
    const { nombre_completo, email, telefono, estado, password_hash } = usuario;
    return await fetchAPI(`/usuario/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        nombre_completo,
        email,
        telefono,
        estado,
        password_hash,
      }),
    });
  },

  remove: async (id: number): Promise<void> => {
    return await fetchAPI(`/usuario/${id}`, { method: "DELETE" });
  },
};
