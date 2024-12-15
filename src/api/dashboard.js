import axios from "axios";

const jobsApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_DATA_API_URL,
});

export const getJobs = async (page = 1, search = "") => {
  try {
    const response = await jobsApi.get(`/jobs/${page}?search=${search}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const createJob = async (jobData) => {
  try {
    const response = await jobsApi.post("/job", jobData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
