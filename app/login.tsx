import { useState } from "react";
import { StyleSheet, Text, View, TextInput, Pressable, ActivityIndicator } from "react-native";
import { router } from "expo-router";
import { api } from "@/lib/api";
import { useSession } from "@/store/session";

export default function Login() {
  const [step, setStep] = useState<"identifier" | "code">("identifier");
  const [identifier, setIdentifier] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const setSession = useSession((s) => s.setSession);

  const handleRequestOtp = async () => {
    setError(null);
    setLoading(true);
    try {
      await api.requestOtp(identifier);
      setStep("code");
    } catch (err) {
      setError(err instanceof Error ? err.message : "something_went_wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    setError(null);
    setLoading(true);
    try {
      const res = await api.verifyOtp(identifier, code);
      setSession({ accessToken: res.accessToken, userId: res.user.id, kycStatus: res.user.kycStatus });
      router.replace("/home");
    } catch (err) {
      setError(err instanceof Error ? err.message : "invalid_code");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{step === "identifier" ? "Enter your phone or email" : "Enter the code we sent you"}</Text>

      {step === "identifier" ? (
        <TextInput
          style={styles.input}
          placeholder="+1 555 123 4567"
          placeholderTextColor="#555555"
          value={identifier}
          onChangeText={setIdentifier}
          autoCapitalize="none"
          keyboardType="email-address"
        />
      ) : (
        <TextInput
          style={styles.input}
          placeholder="123456"
          placeholderTextColor="#555555"
          value={code}
          onChangeText={setCode}
          keyboardType="number-pad"
          maxLength={6}
        />
      )}

      {error && <Text style={styles.error}>{error}</Text>}

      <Pressable
        style={styles.cta}
        disabled={loading}
        onPress={step === "identifier" ? handleRequestOtp : handleVerifyOtp}
      >
        {loading ? (
          <ActivityIndicator color="#0A0A0A" />
        ) : (
          <Text style={styles.ctaText}>{step === "identifier" ? "Send code" : "Verify"}</Text>
        )}
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
    fontSize: 22,
    fontWeight: "600",
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
