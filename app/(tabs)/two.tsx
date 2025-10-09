import { Button } from "@/components/button";
import {
  useAppStoreActions,
  useAppStoreState,
} from "@/services/store-easy-peasy/utils";
import { Comment } from "@/services/store/commentsStore";
import { connectionStore } from "@/services/store/connectionStore";
import { useStoreRehydrated } from "easy-peasy";
import { useEffect } from "react";
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from "react-native";

export default function TabTwoScreen() {
  const comments = useAppStoreState((state) => state.comments.comments);
  const isRehydrated = useStoreRehydrated();

  const isOnline = connectionStore.isOnline.get();
  const addCommentToStore = useAppStoreActions(
    (state) => state.comments.addComment
  );
  const updateComment = useAppStoreActions(
    (state) => state.comments.updateComment
  );
  const loadFromNetwork = useAppStoreActions(
    (state) => state.comments.loadCommentsFromNetwork
  );

  const toggleCommentVote = (item: Comment) => {
    updateComment({
      ...item,
      liked: item.liked ? 0 : 1,
    });
  };

  useEffect(() => {
    if (isOnline) {
      loadFromNetwork();
    }
  }, []);

  const addComment = () => {
    const newComment: Comment = {
      id: Math.floor(Math.random() * 10000).toString(),
      text: "This is a nice comment",
      liked: 0,
    };
    addCommentToStore(newComment);
  };

   if (!isRehydrated) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Easy Peasy</Text>
      <View style={styles.separator} />
      <Button text="Add a new comment" onPress={addComment} />
      <View style={styles.separator} />
      <FlatList
        data={comments}
        keyExtractor={(c) => c.id}
        renderItem={({ item }) => (
          <View
            style={{
              margin: 10,
              padding: 10,
              gap: 10,
              borderRadius: 8,
              backgroundColor: "#eaeaea",
            }}
          >
            <Text>{item.text}</Text>
            <Button
              text={item.liked ? "Unlike" : "Like"}
              onPress={() => {
                toggleCommentVote(item);
              }}
            />
          </View>
        )}
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
    marginTop: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
