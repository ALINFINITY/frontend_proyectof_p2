import { Producto } from "../types/types";
import { fetchAPI } from "./Api";

export const ProductoService = {
  findAll: async (): Promise<Producto[]> => {
    return await fetchAPI("/producto");
  },

  findOne: async (id: number): Promise<Producto> => {
    return await fetchAPI(`/producto/${id}`);
  },

  create: async (data: Partial<Producto>): Promise<Producto> => {
    const {
      codigo_barra,
      nombre,
      descripcion,
      precio_compra,
      precio_venta,
      stock_max,
      stock_min,
      fecha_creacion,
      fecha_actualizacion,
    } = data;
    return await fetchAPI("/producto", {
      method: "POST",
      body: JSON.stringify({
        codigo_barra,
        nombre,
        descripcion,
        precio_compra,
        precio_venta,
        stock_max,
        stock_min,
        fecha_creacion,
        fecha_actualizacion,
      }),
    });
  },

  asignarCaracteristicas: async (
    productoId: number,
    categoriaId: number,
    inventarioId: number
  ): Promise<Producto> => {
    return await fetchAPI(
      `/producto/${productoId}/categoria/${categoriaId}/inventario/${inventarioId}`,
      { method: "POST" }
    );
  },

  update: async (
    id: number,
    producto: Partial<Producto>
  ): Promise<Producto> => {
    return await fetchAPI(`/producto/${id}`, {
      method: "PUT",
      body: JSON.stringify(producto),
    });
  },

  remove: async (id: number): Promise<void> => {
    return await fetchAPI(`/producto/${id}`, { method: "DELETE" });
  },
};
