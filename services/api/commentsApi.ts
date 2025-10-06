import api, { mock } from ".";

const commentsBackend = [
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

export const loadComments = async () => {
  try {
    return (await api.get("/comments")).data;
  } catch (error) {
    console.log("Error fetching comments");
  }
};
