import { ActivityIndicator, StyleSheet, View } from "react-native";

export const Loader = ({}) => {
  return (
    <View
      pointerEvents="none"
      style={{
        ...StyleSheet.absoluteFillObject,
        alignItems: "center",
        justifyContent: "center",
        zIndex: 10000,
        backgroundColor: "transparent",
      }}
    >
      <View
        pointerEvents="none"
        style={{
          backgroundColor: "#0183fe",
          zIndex: 1000,
          padding: 10,
          borderRadius: 10,
        }}
      >
        <ActivityIndicator color={"white"} />
      </View>
    </View>
  );
};
