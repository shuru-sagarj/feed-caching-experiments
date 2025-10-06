import { toggleLike } from "@/services/store/commentActions";
import { commentsStore } from "@/services/store/commentsStore";
import { observer } from "@legendapp/state/react";
import { FC } from "react";
import { Button, FlatList, Text, View } from "react-native";

const CommentListComponent: FC = () => {
  const comments = commentsStore.comments.get();
  console.log("comments", comments);

  return (
    <FlatList
      data={comments}
      keyExtractor={(c) => c.id}
      renderItem={({ item }) => (
        <View style={{ margin: 10, padding: 10, backgroundColor: "#f0f0f0" }}>
          <Text>{item.text}</Text>
          <Text>{item.liked ? "Liked" : "Not liked"}</Text>
          <Button
            title={item.liked ? "Unlike" : "Like"}
            onPress={() => toggleLike(item.id)}
          />
        </View>
      )}
    />
  );
};

export const CommentList = observer(CommentListComponent);
