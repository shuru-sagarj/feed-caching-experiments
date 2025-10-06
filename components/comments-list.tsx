import { useComments } from "@/hooks/tanstack-query/useComments";
import { commentsStore$ } from "@/services/store/commentsStore";
import { observer } from "@legendapp/state/react";
import { FC } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { Button } from "./button";

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
      <Button large text={"Load comments"} onPress={fetchAllComments} />
      <Text>
        Comments loaded from{" "}
        <Text style={{ fontWeight: "bold", fontSize: 16 }}>
          {commentsStore$.source.get()}
        </Text>
      </Text>
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
