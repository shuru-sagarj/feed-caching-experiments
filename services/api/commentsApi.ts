import axios from "axios";
import MockAdapter from "axios-mock-adapter";

const api = axios.create({ baseURL: "/api" });
const mock = new MockAdapter(api, { delayResponse: 500 });
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
export default api;

export const loadComments = async () => {
  try {
    return (await api.get("/comments")).data;
  } catch (error) {
    console.log("Error fetching comments");
  }
};
