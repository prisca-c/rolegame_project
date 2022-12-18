import axios from "axios";

const getAllClasses = async () => {
  const response = await axios.get(`${process.env.REACT_APP_API_URL}/class/`);
  return response.data;
}

const createClass = async (class_object) => {
  const response = await axios.post(`${process.env.REACT_APP_API_URL}/class/`, class_object);
  return response.data;
}

const modifyClass = async (class_object) => {
  const response = await axios.put(`${process.env.REACT_APP_API_URL}/class/${class_object.id}`, class_object);
  return response.data;
}

const deleteClass = async (id) => {
  const response = await axios.delete(`${process.env.REACT_APP_API_URL}/class/${id}`);
  return response.data;
}

export { getAllClasses, modifyClass, createClass, deleteClass };