import { loadComments, toggleLike } from "@/services/api/commentsApi";
import { commentsStore$ } from "@/services/store/commentsStore";
import { connectionStore } from "@/services/store/connectionStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useComments = () => {
  const queryClient = useQueryClient();
  const allComments = commentsStore$.comments.get();
  const loadingComments = commentsStore$.isLoading.get();
  const isOnline = connectionStore.isOnline.get();

  const { mutateAsync } = useMutation<
    void,
    unknown,
    { id: string; vote: 0 | 1 }
  >({
    mutationKey: ["comments"],
    mutationFn: ({ id, vote }) => toggleLike(id, vote),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments"] });
    },
  });

  // Fetching comments from mock api and updating the store
  const fetchAllComments = async () => {
    if (!isOnline) {
      return;
    }
    commentsStore$.isLoading.set(true);
    try {
      const allComments = await loadComments();
      if (allComments) {
        commentsStore$.comments.set(allComments);
        commentsStore$.source.set("network");
      }
    } catch (error) {
      //
    } finally {
      commentsStore$.isLoading.set(false);
    }
  };

  const toggleUpvote = async (id: string, vote: 0 | 1) => {
    const allComments = commentsStore$.comments.get();
    let originalFlag = 0;
    const updated = allComments.map((c) => {
      if (c.id === id) {
        originalFlag = c.liked;
        return {
          ...c,
          liked: vote,
        };
      }
      return c;
    });
    // Updating optimistically
    commentsStore$.comments.set(updated);
    try {
      await mutateAsync({ id, vote });
      // MOCKING FAILURE TO REGISTER UPVOTE/DOWNVOTE
      // await new Promise((_, reject) => {
      //   setTimeout(() => {
      //     Alert.alert("Could not register vote");
      //     reject(new Error("Mocked error"));
      //   }, 1500);
      // });
    } catch (error) {
      const updated = allComments.map((c) => {
        if (c.id === id) {
          return {
            ...c,
            liked: originalFlag,
          };
        }
        return c;
      });
      commentsStore$.comments.set(updated);
    }
  };

  return {
    fetchAllComments,
    allComments,
    isLoading: loadingComments,
    toggleCommentVote: toggleUpvote,
  };
};
