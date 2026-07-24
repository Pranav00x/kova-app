import { useState } from "react";
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import { api } from "@/lib/api";
import { useSession } from "@/store/session";

export default function Kyc() {
  const accessToken = useSession((s) => s.accessToken);
  const setKycStatus = useSession((s) => s.setKycStatus);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!accessToken) return;
    setError(null);
    setSubmitting(true);
    try {
      const res = await api.submitKyc(accessToken);
      setKycStatus(res.user.kyc_status);
      router.replace("/home");
    } catch (err) {
      setError(err instanceof Error ? err.message : "something_went_wrong");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verify your identity</Text>
      <Text style={styles.subtitle}>
        Upload a government ID and take a selfie. This is handled by our card partner, Reap — Kova never
        stores your documents.
      </Text>

      <View style={styles.placeholder}>
        <Text style={styles.placeholderText}>Document upload</Text>
      </View>
      <View style={styles.placeholder}>
        <Text style={styles.placeholderText}>Selfie verification</Text>
      </View>

      {error && <Text style={styles.error}>{error}</Text>}

      <Pressable style={styles.cta} disabled={submitting} onPress={handleSubmit}>
        {submitting ? <ActivityIndicator color="#0A0A0A" /> : <Text style={styles.ctaText}>Submit for review</Text>}
      </Pressable>

      <Pressable onPress={() => router.replace("/home")}>
        <Text style={styles.skip}>Skip for now</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0A0A0A",
    padding: 24,
    justifyContent: "center",
    gap: 16,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "700",
  },
  subtitle: {
    color: "#888888",
    fontSize: 14,
    lineHeight: 20,
  },
  placeholder: {
    backgroundColor: "#1A1A1A",
    borderRadius: 12,
    padding: 24,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#2A2A2A",
    borderStyle: "dashed",
  },
  placeholderText: {
    color: "#555555",
    fontSize: 14,
  },
  error: {
    color: "#FF5252",
    fontSize: 13,
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
  skip: {
    color: "#888888",
    fontSize: 14,
    textAlign: "center",
  },
});
