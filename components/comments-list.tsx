import { useComments } from "@/hooks/tanstack-query/useComments";
import { commentsStore$ } from "@/services/store/commentsStore";
import { observer } from "@legendapp/state/react";
import { FC } from "react";
import { ActivityIndicator, Button, FlatList, Text, View } from "react-native";

const CommentListComponent: FC = () => {
  const comments = commentsStore$.comments.get();
  const { isLoading, fetchAllComments, toggleCommentVote } = useComments();

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <>
      <Button title={"Load comments"} onPress={fetchAllComments} />
      <Text>Comments loaded from {commentsStore$.source.get()}</Text>
      <FlatList
        data={comments}
        keyExtractor={(c) => c.id}
        renderItem={({ item }) => (
          <View style={{ margin: 10, padding: 10, backgroundColor: "#f0f0f0" }}>
            <Text>{item.text}</Text>
            <Text>{item.liked ? "Liked" : "Not liked"}</Text>
            <Button
              title={item.liked ? "Unlike" : "Like"}
              onPress={() =>
                toggleCommentVote(item.id, item.liked === 0 ? 1 : 0)
              }
            />
          </View>
        )}
      />
    </>
  );
};

export const CommentList = observer(CommentListComponent);
