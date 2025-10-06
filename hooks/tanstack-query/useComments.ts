import { loadComments, toggleLike } from "@/services/api/commentsApi";
import { commentsStore$ } from "@/services/store/commentsStore";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useComments = () => {
  const queryClient = useQueryClient();

  const { isLoading, data, refetch } = useQuery({
    queryKey: ["comments"],
    queryFn: loadComments,
    enabled: false,
  });

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
    const allComments = (await refetch()).data;
    commentsStore$.comments.set(allComments);
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
    allComments: data,
    loadingComments: isLoading,
    toggleCommentVote: toggleUpvote,
  };
};
