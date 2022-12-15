import axios from "axios";
const getAllCharacters = async () => {
  const response = await axios.get(`http://localhost/rolegame_project/backend/api/characters/`);
  return response.data;
}

const getCharacter = async (id) => {
  const response = await axios.get(`http://localhost/rolegame_project/backend/api/characters/${id}`);
  console.log(response.data);
  return response.data;
}

const createCharacter = async (character) => {
  const response = await axios.post("http://localhost/rolegame_project/backend/api/characters/", character);
  console.log(response.data);
  return response.data;
}

const modifyCharacter = async (id, character) => {
  const response = await axios.put(`http://localhost/rolegame_project/backend/api/characters/${id}`, character);
  console.log(response.data);
}

const deleteCharacter = async (id) => {
  const response = await axios.delete(`http://localhost/rolegame_project/backend/api/characters/${id}`);
  console.log(response.data);
  return response.data;
}

export { getAllCharacters, getCharacter, createCharacter, modifyCharacter, deleteCharacter };
