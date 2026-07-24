import * as SecureStore from "expo-secure-store";
import { generatePrivateKey, privateKeyToAccount } from "viem/accounts";
import type { Address } from "viem";

const STORAGE_KEY = "kova_owner_private_key";

/**
 * Returns the device's owner keypair for the ZeroDev smart account, generating
 * one on first use. This is a placeholder signer until passkey-derived key
 * generation (WebAuthn -> deterministic key) replaces it — see kova-money's
 * earlier Passkey work. The private key never leaves the device; kova-api only
 * ever receives the public address (see src/lib/api.ts createWallet).
 */
export async function getOrCreateOwnerAccount(): Promise<{ address: Address; privateKey: `0x${string}` }> {
  let privateKey = (await SecureStore.getItemAsync(STORAGE_KEY)) as `0x${string}` | null;

  if (!privateKey) {
    privateKey = generatePrivateKey();
    await SecureStore.setItemAsync(STORAGE_KEY, privateKey);
  }

  const account = privateKeyToAccount(privateKey);
  return { address: account.address, privateKey };
}
