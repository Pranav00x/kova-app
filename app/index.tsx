import { StyleSheet, Text, View, Pressable } from "react-native";
import { router } from "expo-router";

export default function Welcome() {
  return (
    <View style={styles.container}>
      <View style={styles.hero}>
        <Text style={styles.title}>Kova</Text>
        <Text style={styles.subtitle}>Spend crypto. Earn yield. One card.</Text>
      </View>

      <Pressable style={styles.cta} onPress={() => router.push("/login")}>
        <Text style={styles.ctaText}>Get started</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0A0A0A",
    justifyContent: "space-between",
    padding: 24,
    paddingBottom: 48,
  },
  hero: {
    flex: 1,
    justifyContent: "center",
    gap: 8,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 40,
    fontWeight: "700",
  },
  subtitle: {
    color: "#888888",
    fontSize: 16,
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
