import { fetchAPI } from "./Api";

export const AuthService = {
  getAll: async (): Promise<any[]> => {
    return await fetchAPI("/auth");
  },

  createAuth: async (usuarioId: number, email: string, password_hash: string): Promise<any> => {
    return await fetchAPI(`/auth/${usuarioId}`, {
      method: "POST",
      body: JSON.stringify({ email, password_hash }),
    });
  },
};