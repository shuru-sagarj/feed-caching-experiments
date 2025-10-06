import { StyleSheet, Text, View } from "react-native";

import { useState } from "react";

export default function TabTwoScreen() {
  const [feedData, setFeedData] = useState<{ name: string; url: string }[]>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Comments Feed</Text>
      <View style={styles.separator} />

      {/* <FlatList
        showsVerticalScrollIndicator={false}
        data={feedData}
        contentContainerStyle={{
          rowGap: 16,
        }}
        style={{
          marginBottom: 20,
        }}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => {
          return <PokemonItem {...item} />;
        }}
        onEndReachedThreshold={0.7}
        onEndReached={() => {
          if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage?.();
          }
        }}
        ListFooterComponent={
          <View>
            <Text>Reached the end...</Text>
          </View>
        } // Can keep this if needed
      /> */}
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
    marginTop: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
