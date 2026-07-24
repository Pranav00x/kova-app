const API_URL = process.env.EXPO_PUBLIC_API_URL ?? "http://localhost:4000";

async function request<T>(path: string, options: RequestInit = {}, accessToken?: string): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
      ...options.headers,
    },
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}) as Record<string, unknown>);
    throw new Error(typeof body.error === "string" ? body.error : `request_failed_${res.status}`);
  }

  return res.json() as Promise<T>;
}

export interface OtpVerifyResponse {
  accessToken: string;
  refreshToken: string;
  user: { id: string; kycStatus: string };
}

export interface Wallet {
  id: string;
  user_id: string;
  smart_account_address: string;
  chain: string;
}

export interface VaultStats {
  deployed: boolean;
  totalAssets: string;
  totalShares: string;
  sharePrice: string;
}

export interface LookupResult {
  userId: string;
  smartAccountAddress: string;
}

export interface CategoryBreakdown {
  category: string;
  totalUsdc: string;
  transactionCount: string;
}

export const api = {
  requestOtp: (identifier: string) =>
    request<{ status: string }>("/auth/otp/request", {
      method: "POST",
      body: JSON.stringify({ identifier }),
    }),
  verifyOtp: (identifier: string, code: string) =>
    request<OtpVerifyResponse>("/auth/otp/verify", {
      method: "POST",
      body: JSON.stringify({ identifier, code }),
    }),
  createWallet: (ownerAddress: string, accessToken: string) =>
    request<{ wallet: Wallet }>(
      "/wallet",
      { method: "POST", body: JSON.stringify({ ownerAddress }) },
      accessToken
    ),
  getVaultStats: () => request<VaultStats>("/vault/stats"),
  getMyShares: (accessToken: string) =>
    request<{ shares: string }>("/vault/my-shares", {}, accessToken),
  submitKyc: (accessToken: string) =>
    request<{ user: { id: string; kyc_status: string } }>(
      "/kyc/submit",
      { method: "POST" },
      accessToken
    ),
  lookupUser: (identifier: string, accessToken: string) =>
    request<LookupResult>(
      `/users/lookup?identifier=${encodeURIComponent(identifier)}`,
      {},
      accessToken
    ),
  getMonthlyAnalytics: (accessToken: string) =>
    request<{ breakdown: CategoryBreakdown[] }>("/transactions/analytics/monthly", {}, accessToken),
};
