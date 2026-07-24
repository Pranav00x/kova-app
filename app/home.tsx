import { StyleSheet, Text, View } from "react-native";
import { useSession } from "@/store/session";

export default function Home() {
  const kycStatus = useSession((s) => s.kycStatus);

  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>Welcome to Kova</Text>

      <View style={styles.card}>
        <Text style={styles.cardLabel}>Balance</Text>
        <Text style={styles.cardValue}>$0.00 USDC</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardLabel}>Vault APY</Text>
        <Text style={styles.cardValue}>—</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardLabel}>KYC status</Text>
        <Text style={styles.cardValue}>{kycStatus ?? "pending"}</Text>
      </View>
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
  greeting: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 8,
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
});
