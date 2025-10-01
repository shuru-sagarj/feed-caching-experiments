import { Button, FlatList, StyleSheet } from "react-native";

import { Loader } from "@/components/loader";
import { Text, View } from "@/components/Themed";
import { usePokemon } from "@/hooks/tanstack-query/usePokemon";
import { useEffect, useState } from "react";

export default function TabTwoScreen() {
  const {
    isFetching,
    // isFetchingNextPage,
    data,
    hasNextPage,
    // hasPreviousPage,
    // error,
    fetchNextPage,
  } = usePokemon();
  const [feedData, setFeedData] = useState<{ name: string; url: string }[]>();

  useEffect(() => {
    if (data?.pages?.length) {
      const flattened = data?.pages.flatMap((page) => page.results) ?? [];
      setFeedData(flattened);
    }
  }, [data]);

  const getMore = () => {
    if (hasNextPage) {
      fetchNextPage?.();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pokemons Feed</Text>
      {isFetching && <Loader />}
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <Button title="Get More" onPress={getMore} />

      <FlatList
        showsVerticalScrollIndicator={false}
        data={feedData}
        renderItem={({ item }) => {
          return <Text>{item.name}</Text>;
        }}
        // ListFooterComponent={isFetchingNextPage ? <ActivityIndicator /> : null} // Can keep this if needed
      />
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
});
