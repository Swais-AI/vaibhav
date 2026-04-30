import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchDashboardData = async (studentId: number) => {
  const response = await api.get(`/dashboard/${studentId}`);
  return response.data;
};

export const translateText = async (text: string, targetLang: string) => {
  if (!text) return { translated_text: text, original_text: text };
  if (targetLang === 'en') return { translated_text: text, original_text: text };
  
  const response = await api.post('/translate', {
    text,
    target_lang: targetLang,
  });
  return response.data;
};

export const requestCall = async (studentId: number, message: string) => {
  const response = await api.post('/request-call', {
    student_id: studentId,
    message,
  });
  return response.data;
};
