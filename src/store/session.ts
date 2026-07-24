import { create } from "zustand";

interface SessionState {
  accessToken: string | null;
  userId: string | null;
  kycStatus: string | null;
  setSession: (params: { accessToken: string; userId: string; kycStatus: string }) => void;
  clearSession: () => void;
}

export const useSession = create<SessionState>((set) => ({
  accessToken: null,
  userId: null,
  kycStatus: null,
  setSession: ({ accessToken, userId, kycStatus }) => set({ accessToken, userId, kycStatus }),
  clearSession: () => set({ accessToken: null, userId: null, kycStatus: null }),
}));
