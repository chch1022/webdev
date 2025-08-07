import axios from "axios";
const axiosWithCredentials = axios.create({ withCredentials: true });
const HTTP_SERVER = import.meta.env.VITE_HTTP_SERVER;
const ENROLLMENTS_API = `${HTTP_SERVER}/api/enrollments`;

export const enrollInCourse = async (userId: string, courseId: string) => {
  const response = await axiosWithCredentials.post(ENROLLMENTS_API, { userId, courseId });
  return response.data;
};

export const unenrollFromCourse = async (userId: string, courseId: string) => {
  const response = await axiosWithCredentials.delete(ENROLLMENTS_API, { 
    data: { userId, courseId } 
  });
  return response.data;
};

export const getUserEnrollments = async (userId: string) => {
  const response = await axiosWithCredentials.get(`${ENROLLMENTS_API}/user/${userId}`);
  return response.data;
};