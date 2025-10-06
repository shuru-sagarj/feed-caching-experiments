import { loadComments, toggleLike } from "@/services/api/commentsApi";
import { commentsStore } from "@/services/store/commentsStore";
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
    commentsStore.comments.set(allComments);
  };

  const toggleUpvote = async (id: string, vote: 0 | 1) => {
    const allComments = commentsStore.comments.get();
    const updated = allComments.map((c) => {
      if (c.id === id) {
        return {
          ...c,
          liked: vote,
        };
      }
      return c;
    });
    // Updating optimistically
    commentsStore.comments.set(updated);
    try {
      await mutateAsync({ id, vote });
    } catch (error) {
      console.log("Undo upvote", error);
    }
  };

  return {
    fetchAllComments,
    allComments: data,
    loadingComments: isLoading,
    toggleCommentVote: toggleUpvote,
  };
};
