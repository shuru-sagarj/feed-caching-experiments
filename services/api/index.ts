import axios from "axios";
import MockAdapter from "axios-mock-adapter";

const api = axios.create({ baseURL: "/api" });
export const mock = new MockAdapter(api, { delayResponse: 500 });

export default api;
