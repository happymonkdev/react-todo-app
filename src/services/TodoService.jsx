import axios from "axios";
import { getToken } from "./AuthService";
const BASE_REST_API_URL = "http://localhost:8080/api/todos";
axios.interceptors.request.use(
  (config) => {
    config.headers["Authorization"] = getToken();
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export const getAllTodos = () => axios.get(BASE_REST_API_URL);
export const addTodo = (request) => axios.post(BASE_REST_API_URL, request);
export const getTodoById = (id) => axios.get(`${BASE_REST_API_URL}/${id}`);
export const updateTodo = (id, request) =>
  axios.put(`${BASE_REST_API_URL}/${id}`, request);
export const deleteTodoService = (id) =>
  axios.delete(`${BASE_REST_API_URL}/${id}`);
export const markComplete = (id) =>
  axios.patch(`${BASE_REST_API_URL}/${id}/complete`);
export const markIncomplete = (id) =>
  axios.patch(`${BASE_REST_API_URL}/${id}/incomplete`);
