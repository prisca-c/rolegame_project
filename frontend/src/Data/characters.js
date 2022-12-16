import axios from "axios";
const getAllCharacters = async () => {
  const response = await axios.get(`${process.env.REACT_APP_API_URL}/characters/`);
  return response.data;
}

const getCharacter = async (id) => {
  const response = await axios.get(`${process.env.REACT_APP_API_URL}/characters/${id}`);
  console.log(response.data);
  return response.data;
}

const createCharacter = async (character) => {
  const response = await axios.post(`${process.env.REACT_APP_API_URL}/characters/`, character);
  console.log(response.data);
  return response.data;
}

const modifyCharacter = async (id, character) => {
  const response = await axios.put(`${process.env.REACT_APP_API_URL}/characters/${id}`, character);
  console.log(response.data);
}

const deleteCharacter = async (id) => {
  const response = await axios.delete(`${process.env.REACT_APP_API_URL}/characters/${id}`);
  return response.data;
}

export { getAllCharacters, getCharacter, createCharacter, modifyCharacter, deleteCharacter };
