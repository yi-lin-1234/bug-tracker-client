import axios from "axios";
import { Body } from "./type";

//dev
// const instance = axios.create({
//   baseURL: "http://localhost:8000",
// });

//prod
const instance = axios.create({
  baseURL: "https://flask-production-cdbc.up.railway.app",
});

//==============================( POST )==============================

// create new bug
export const createNewBug = async (body: Body) => {
  await instance.post("new-bug", body);
};

//=======================( GET )===========================

// fetch all bugs
export const getAllBugs = async () => {
  const response = await instance.get("all-bugs");
  return response.data;
};

// get bug by id
export const getBugById = async (id: string) => {
  const response = await instance.get(`bug/${id}`);
  return response.data;
};

//==============================( PUT )==============================

// update a bug by id
export const updateBugById = async (id: string, body: Body) => {
  await instance.put(`/bug/${id}`, body);
};

//==============================( DELETE )==============================

// delete a bug by id
export const deleteBugById = async (id: string) => {
  await instance.delete(`bug/${id}`);
};
