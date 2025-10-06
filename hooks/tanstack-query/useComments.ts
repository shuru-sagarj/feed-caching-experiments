import { loadComments } from "@/services/api/commentsApi";
import { commentsStore } from "@/services/store/commentsStore";
import { useQuery } from "@tanstack/react-query";

export const useComments = () => {
  const { isLoading, data, refetch } = useQuery({
    queryKey: ["comments"],
    queryFn: loadComments,
    enabled: false,
  });

  // Fetching comments from mock api and updating the store
  const fetchAllComments = async () => {
    const allComments = (await refetch()).data;
    commentsStore.comments.set(allComments);
  };

  return {
    fetchAllComments,
    allComments: data,
    loadingComments: isLoading,
  };
};
