import api, { mock } from ".";

let commentsBackend = [
  {
    id: "1",
    text: "This is a good post.",
    liked: 0,
  },
  {
    id: "2",
    text: "This is a good post.",
    liked: 0,
  },
];

mock.onGet("/comments").reply((config) => {
  return [200, commentsBackend];
});
mock.onPost("/comments/add").reply((config) => {
  commentsBackend.push({
    id: Math.floor(Math.random() * 1000000).toString(),
    text: "This is a good post.",
    liked: 0,
  });
  return [200, commentsBackend];
});
mock.onPost("/comments/remove").reply((config) => {
  commentsBackend.pop();
  return [200, commentsBackend];
});
mock.onPatch("/comments/toggle-like").reply((config) => {
  const id = config?.params?.id;
  const vote = config?.params?.vote;
  const comment = commentsBackend.filter((i) => i.id === id)?.[0];
  if (comment) {
    comment.liked = vote;
  }
  const commentsUpdated = commentsBackend.map((i) => {
    if (i.id === id) {
      return {
        ...i,
        liked: vote,
      };
    }
    return i;
  });
  commentsBackend = commentsUpdated;
  return [200, commentsBackend];
});

export const loadComments = async () => {
  try {
    return (await api.get("/comments")).data;
  } catch (error) {
    console.log("Error fetching comments");
  }
};

export const toggleLike = async (id: string, vote: 0 | 1) => {
  try {
    await api.patch("/comments/toggle-like", {
      id,
      vote,
    });
  } catch (error) {
    console.log('Error mutating', error);
    
  }
};
