import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  token: string | null;
  userName: string | null;
  login: (name: string) => void;
  logout: () => void;
}

// NOTE: In a production application, sensitive auth tokens or JWTs should be stored in secure httpOnly cookies
// rather than localStorage to protect against XSS vulnerabilities. Demo tokens are persisted here for demonstration purposes.
const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      userName: null,
      login: (name) => set({ token: `demo-token-${name}`, userName: name }),
      logout: () => set({ token: null, userName: null }),
    }),
    {
      name: "itelect4-auth",
      partialize: (state) => ({
        token: state.token,
        userName: state.userName,
      }),
    }
  )
);

export default useAuthStore;
