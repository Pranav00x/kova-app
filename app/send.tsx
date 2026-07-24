import { useState } from "react";
import { ActivityIndicator, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { router } from "expo-router";
import { api, type LookupResult } from "@/lib/api";
import { useSession } from "@/store/session";

export default function Send() {
  const accessToken = useSession((s) => s.accessToken);
  const [identifier, setIdentifier] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<LookupResult | null>(null);

  const handleLookup = async () => {
    if (!accessToken) return;
    setError(null);
    setResult(null);
    setLoading(true);
    try {
      const found = await api.lookupUser(identifier, accessToken);
      setResult(found);
    } catch (err) {
      setError(err instanceof Error ? err.message : "user_not_found");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={() => router.back()}>
        <Text style={styles.back}>← Back</Text>
      </Pressable>

      <Text style={styles.title}>Send USDC</Text>
      <Text style={styles.subtitle}>Enter a Kova user's phone or email to send them USDC.</Text>

      <TextInput
        style={styles.input}
        placeholder="+1 555 123 4567"
        placeholderTextColor="#555555"
        value={identifier}
        onChangeText={setIdentifier}
        autoCapitalize="none"
      />

      {error && <Text style={styles.error}>{error}</Text>}

      {result && (
        <View style={styles.card}>
          <Text style={styles.cardLabel}>Recipient found</Text>
          <Text style={styles.cardValue}>
            {result.smartAccountAddress.slice(0, 6)}…{result.smartAccountAddress.slice(-4)}
          </Text>
          <Text style={styles.note}>
            Sending requires a ZeroDev-sponsored transaction — coming once the bundler is configured.
          </Text>
        </View>
      )}

      <Pressable style={styles.cta} disabled={loading} onPress={handleLookup}>
        {loading ? <ActivityIndicator color="#0A0A0A" /> : <Text style={styles.ctaText}>Find recipient</Text>}
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
  subtitle: {
    color: "#888888",
    fontSize: 14,
  },
  input: {
    backgroundColor: "#1A1A1A",
    borderRadius: 12,
    padding: 16,
    color: "#FFFFFF",
    fontSize: 16,
  },
  error: {
    color: "#FF5252",
    fontSize: 13,
  },
  card: {
    backgroundColor: "#1A1A1A",
    borderRadius: 16,
    padding: 20,
    gap: 6,
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
  note: {
    color: "#555555",
    fontSize: 12,
  },
  cta: {
    backgroundColor: "#00C853",
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: "center",
  },
  ctaText: {
    color: "#0A0A0A",
    fontSize: 16,
    fontWeight: "700",
  },
});
