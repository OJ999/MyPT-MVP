import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000', // Ensure this matches your backend URL
});

export const loginUser = async (credentials) => {
  try {
    const response = await api.post('/login', credentials);
    return response.data;
  } catch (error) {
    console.error('Failed to login:', error);
    throw error;
  }
};

export const registerUser = async (credentials) => {
  try {
    const response = await api.post('/register', credentials);
    return response.data;
  } catch (error) {
    console.error('Failed to register:', error);
    throw error;
  }
};

export const getExercises = async () => {
  try {
    const response = await api.get('/exercises');
    return response.data;
  } catch (error) {
    console.error('Failed to get exercises:', error);
    throw error;
  }
};

export const addExercise = async (exercise) => {
  try {
    const response = await api.post('/exercises', exercise);
    return response.data;
  } catch (error) {
    console.error('Failed to add exercise:', error);
    throw error;
  }
};

export const deleteExercise = async (id) => {
  try {
    const response = await api.delete(`/exercises/${id}`);
    return response.data;
  } catch (error) {
    console.error('Failed to delete exercise:', error);
    throw error;
  }
};
