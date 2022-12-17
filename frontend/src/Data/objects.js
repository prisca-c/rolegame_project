import axios from "axios";

const getAllObjects = async () => {
  const response = await axios.get(`${process.env.REACT_APP_API_URL}/objects/`);
  return response.data;
}

const createObject = async (object) => {
  const response = await axios.post(`${process.env.REACT_APP_API_URL}/objects/`, object);
  return response.data;
}

const updateObject = async (object) => {
  const response = await axios.put(`${process.env.REACT_APP_API_URL}/objects/${object.id}`, object);
  return response.data;
}

const deleteObject = async (id) => {
  const response = await axios.delete(`${process.env.REACT_APP_API_URL}/objects/${id}`);
  return response.data;
}

export { getAllObjects, createObject, updateObject, deleteObject };