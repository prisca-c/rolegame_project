import axios from "axios";

const getAllInventories = async () => {
  const response = await axios.get(`${process.env.REACT_APP_API_URL}/inventory/`);
  return response.data;
}

const getInventory = async (character_id) => {
  const response = await axios.get(`${process.env.REACT_APP_API_URL}/inventory/${character_id}`);
  return response.data;
}

const addItemToInventory = async (inventory) => {
  const response = await axios.post(`${process.env.REACT_APP_API_URL}/inventory/`, inventory);
  return response.data;
}

const modifyInventoryItem = async (inventory) => {
  const response = await axios.put(`${process.env.REACT_APP_API_URL}/inventory/${inventory.id_character}/${inventory.id}`, inventory);
  return response.data;
}

const deleteInventoryItem = async (id_character, id) => {
  const response = await axios.delete(`${process.env.REACT_APP_API_URL}/inventory/${id_character}/${id}`);
  return response.data;
}

const deleteInventory = async (id_character) => {
  const response = await axios.delete(`${process.env.REACT_APP_API_URL}/inventory/${id_character}`);
  return response.data;
}

export { getAllInventories, addItemToInventory, modifyInventoryItem, deleteInventoryItem, deleteInventory, getInventory };