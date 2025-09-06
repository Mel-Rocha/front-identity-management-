import { defineStore } from "pinia";
import { fetchMe } from "@/services/userService";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null, // <- sempre define aqui
  }),

  actions: {
    async loadUser() {
      try {
        const data = await fetchMe();
        this.user = data;
      } catch (error) {
        console.error("Erro ao carregar usuário:", error);
        this.user = null;
      }
    },

    logout() {
      this.user = null;
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
    },
  },

  getters: {
    isSuperuser: (state) => state.user?.is_superuser || false,
    isStaff: (state) => state.user?.is_staff || false,
  },
});
