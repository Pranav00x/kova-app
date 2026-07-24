import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import { useSession } from "@/store/session";
import { api, type VaultStats } from "@/lib/api";

function shortenAddress(address: string): string {
  return `${address.slice(0, 6)}…${address.slice(-4)}`;
}

function formatUsdc(raw: string): string {
  return (Number(raw) / 1e6).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export default function Home() {
  const kycStatus = useSession((s) => s.kycStatus);
  const smartAccountAddress = useSession((s) => s.smartAccountAddress);
  const accessToken = useSession((s) => s.accessToken);

  const [vaultStats, setVaultStats] = useState<VaultStats | null>(null);
  const [myShares, setMyShares] = useState<string | null>(null);

  useEffect(() => {
    api.getVaultStats().then(setVaultStats).catch(() => setVaultStats(null));
  }, []);

  useEffect(() => {
    if (!accessToken) return;
    api
      .getMyShares(accessToken)
      .then((res) => setMyShares(res.shares))
      .catch(() => setMyShares(null));
  }, [accessToken]);

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.greeting}>Welcome to Kova</Text>
        <Pressable onPress={() => router.push("/settings")}>
          <Text style={styles.headerLink}>Settings</Text>
        </Pressable>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardLabel}>Smart account</Text>
        <Text style={styles.cardValue}>
          {smartAccountAddress ? shortenAddress(smartAccountAddress) : "Creating…"}
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardLabel}>Your vault balance</Text>
        <Text style={styles.cardValue}>{myShares ? `$${formatUsdc(myShares)} USDC` : "$0.00 USDC"}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardLabel}>Vault TVL</Text>
        <Text style={styles.cardValue}>
          {vaultStats?.deployed ? `$${formatUsdc(vaultStats.totalAssets)} USDC` : "Not deployed yet"}
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardLabel}>KYC status</Text>
        <Text style={styles.cardValue}>{kycStatus ?? "pending"}</Text>
      </View>

      <Pressable style={styles.sendButton} onPress={() => router.push("/send")}>
        <Text style={styles.sendButtonText}>Send USDC</Text>
      </Pressable>

      <Pressable onPress={() => router.push("/analytics")}>
        <Text style={styles.analyticsLink}>View spend analytics →</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0A0A0A",
    padding: 24,
    gap: 16,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  greeting: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "700",
  },
  headerLink: {
    color: "#888888",
    fontSize: 14,
  },
  card: {
    backgroundColor: "#1A1A1A",
    borderRadius: 16,
    padding: 20,
    gap: 4,
  },
  cardLabel: {
    color: "#888888",
    fontSize: 13,
  },
  cardValue: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "600",
  },
  sendButton: {
    backgroundColor: "#00C853",
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 8,
  },
  sendButtonText: {
    color: "#0A0A0A",
    fontSize: 16,
    fontWeight: "700",
  },
  analyticsLink: {
    color: "#00C853",
    fontSize: 14,
    textAlign: "center",
  },
});
