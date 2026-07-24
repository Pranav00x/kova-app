import { useEffect, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import { useSession } from "@/store/session";
import { api, type CategoryBreakdown } from "@/lib/api";

function formatUsdc(raw: string): string {
  return (Number(raw) / 1e6).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export default function Analytics() {
  const accessToken = useSession((s) => s.accessToken);
  const [breakdown, setBreakdown] = useState<CategoryBreakdown[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!accessToken) return;
    api
      .getMonthlyAnalytics(accessToken)
      .then((res) => setBreakdown(res.breakdown))
      .finally(() => setLoading(false));
  }, [accessToken]);

  const total = breakdown.reduce((sum, row) => sum + Number(row.totalUsdc), 0);

  return (
    <View style={styles.container}>
      <Pressable onPress={() => router.back()}>
        <Text style={styles.back}>← Back</Text>
      </Pressable>

      <Text style={styles.title}>This month</Text>
      <Text style={styles.total}>${formatUsdc(String(total))} spent</Text>

      {!loading && breakdown.length === 0 && (
        <Text style={styles.empty}>No transactions yet this month.</Text>
      )}

      <FlatList
        data={breakdown}
        keyExtractor={(item) => item.category}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={styles.category}>{item.category}</Text>
            <Text style={styles.amount}>${formatUsdc(item.totalUsdc)}</Text>
          </View>
        )}
        contentContainerStyle={{ gap: 8 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0A0A0A",
    padding: 24,
    paddingTop: 60,
    gap: 8,
  },
  back: {
    color: "#888888",
    fontSize: 14,
  },
  title: {
    color: "#888888",
    fontSize: 14,
    marginTop: 8,
  },
  total: {
    color: "#FFFFFF",
    fontSize: 32,
    fontWeight: "700",
    marginBottom: 16,
  },
  empty: {
    color: "#555555",
    fontSize: 14,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#1A1A1A",
    borderRadius: 12,
    padding: 16,
  },
  category: {
    color: "#FFFFFF",
    fontSize: 15,
    textTransform: "capitalize",
  },
  amount: {
    color: "#00C853",
    fontSize: 15,
    fontWeight: "600",
  },
});
