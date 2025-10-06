import { Comment, commentsStore } from "./commentsStore";

export function loadInitialComments() {
  const initial: Comment[] = [
    { id: "1", text: "First comment", liked: 0 },
    { id: "2", text: "Second comment", liked: 1 },
  ];
  commentsStore.comments.set(initial);
}

export function addOrUpdateComment(id: string, text: string, liked = 0) {
  const allComments = [...commentsStore.comments.get()];
  const index = allComments.findIndex((c) => c.id === id);

  if (index > -1) {
    // Found existing
    allComments[index] = { id, text, liked };
  } else {
    allComments.push({ id, text, liked });
  }

  commentsStore.comments.set(allComments);
}


export async function toggleLike(commentId: string) {
  const comment = commentsStore.comments.find((c) => c.id.get() === commentId);
  if (!comment) return;

  const newLiked = comment.liked.get() ? 0 : 1;
  comment.liked.set(newLiked);
  // await updateLikeStatus(commentId, newLiked);
}