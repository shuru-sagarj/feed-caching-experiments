import { CommentList } from "@/components/comments-list";
import {
  connectionStore,
  toggleNetwork,
} from "@/services/store/connectionStore";
import { useSelector } from "@legendapp/state/react";
import { Button, StyleSheet, Text, View } from "react-native";

export default function TabOneScreen() {
  const isOnline = useSelector(() => connectionStore.isOnline.get());

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <Text style={{}}>You're {isOnline ? "Online" : "Offline"}</Text>
        <Button
          onPress={toggleNetwork}
          title={`Go ${isOnline ? "offline" : "online"}`}
        />
      </View>
      <Text style={styles.title}>Tab One</Text>
      <View style={styles.separator} />
      <CommentList />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  wrapper: {
    flexDirection: "row",
    gap: 50,
    marginVertical: 50,
    alignItems: "center",
  },
});
