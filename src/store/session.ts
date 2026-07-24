import { create } from "zustand";

interface SessionState {
  accessToken: string | null;
  userId: string | null;
  kycStatus: string | null;
  smartAccountAddress: string | null;
  setSession: (params: { accessToken: string; userId: string; kycStatus: string }) => void;
  setWallet: (smartAccountAddress: string) => void;
  clearSession: () => void;
}

export const useSession = create<SessionState>((set) => ({
  accessToken: null,
  userId: null,
  kycStatus: null,
  smartAccountAddress: null,
  setSession: ({ accessToken, userId, kycStatus }) => set({ accessToken, userId, kycStatus }),
  setWallet: (smartAccountAddress) => set({ smartAccountAddress }),
  clearSession: () => set({ accessToken: null, userId: null, kycStatus: null, smartAccountAddress: null }),
}));
