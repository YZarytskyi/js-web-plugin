import axios from 'axios';

const API_BASE_URL = '';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export async function postCreateChatSession() {
  try {
    const { data } = await api.post('/api/chat/session');
    return data;
  } catch (error) {
    console.error(error);
  }
}

export function postSubmitQuery({ session_id, body }) {
  try {
    const { data } = api.post(`/api/chat/${session_id}/query`, body);
    return data;
  } catch (error) {
    console.error(error);
  }
}
