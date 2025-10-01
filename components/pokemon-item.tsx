import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Linking, StyleSheet, Text, View } from "react-native";
export const PokemonItem = ({ name, url }: { name: string; url: string }) => {
  return (
    <View style={styles.item}>
      <Text style={styles.name}>{name}</Text>
      <MaterialCommunityIcons
        name="arrow-top-right-bold-box-outline"
        color={"#0183fe"}
        size={20}
        onPress={() => Linking.openURL(url)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#efefef",
    paddingVertical: 18,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    borderRadius: 5,
    flexDirection: "row",
    gap: 20,
  },
  name: {
    textTransform: 'capitalize',
    fontSize: 16,
    fontWeight: '600',
  },
  url: {},
});
