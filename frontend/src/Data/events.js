import axios from "axios";

const getAllEvents = async () => {
  const response = await axios.get(`${process.env.REACT_APP_API_URL}/events/`);
  return response.data;
}

const getEventById = async (id) => {
  const response = await axios.get(`${process.env.REACT_APP_API_URL}/events/${id}`);
  return response.data;
}

const getEventByType = async (type) => {
  const response = await axios.get(`${process.env.REACT_APP_API_URL}/events/type/${type}`);
  return response.data;
}

const deleteEvent = async (id) => {
  const response = await axios.delete(`${process.env.REACT_APP_API_URL}/events/${id}`);
  return response.data;
}

const createEvent = async (event) => {
  const response = await axios.post(`${process.env.REACT_APP_API_URL}/events/`, event);
  return response.data;
}

const modifyEvent = async (event) => {
  const response = await axios.put(`${process.env.REACT_APP_API_URL}/events/${event.id}`, event);
  return response.data;
}

export { getAllEvents, getEventById, getEventByType, modifyEvent, deleteEvent, createEvent };