import { Pressable, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import { useSession } from "@/store/session";

function shortenAddress(address: string): string {
  return `${address.slice(0, 6)}…${address.slice(-4)}`;
}

export default function Settings() {
  const smartAccountAddress = useSession((s) => s.smartAccountAddress);
  const kycStatus = useSession((s) => s.kycStatus);
  const clearSession = useSession((s) => s.clearSession);

  const handleLogout = () => {
    clearSession();
    router.replace("/");
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={() => router.back()}>
        <Text style={styles.back}>← Back</Text>
      </Pressable>

      <Text style={styles.title}>Settings</Text>

      <View style={styles.card}>
        <Text style={styles.cardLabel}>Smart account</Text>
        <Text style={styles.cardValue}>
          {smartAccountAddress ? shortenAddress(smartAccountAddress) : "—"}
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardLabel}>KYC status</Text>
        <Text style={styles.cardValue}>{kycStatus ?? "pending"}</Text>
      </View>

      <Pressable style={styles.logout} onPress={handleLogout}>
        <Text style={styles.logoutText}>Log out</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0A0A0A",
    padding: 24,
    paddingTop: 60,
    gap: 16,
  },
  back: {
    color: "#888888",
    fontSize: 14,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "700",
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
    fontSize: 18,
    fontWeight: "600",
  },
  logout: {
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#FF5252",
    marginTop: 16,
  },
  logoutText: {
    color: "#FF5252",
    fontSize: 16,
    fontWeight: "700",
  },
});
