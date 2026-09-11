import axios from "axios";

const api = axios.create({

  baseURL:
    import.meta.env.VITE_API_URL ||
    "http://localhost:5000/api",

  headers: {
    "Content-Type": "application/json"
  }

});


export async function addCrop(data) {

  const response =
    await api.post("/crops", data);

  return response.data;
}


export async function getCrops() {

  const response =
    await api.get("/crops");

  return response.data;
}


export async function getCrop(id) {

  const response =
    await api.get(`/crops/${id}`);

  return response.data;
}


export async function updateCrop(id, data) {

  const response =
    await api.put(`/crops/${id}`, data);

  return response.data;
}


export async function deleteCrop(id) {

  const response =
    await api.delete(`/crops/${id}`);

  return response.data;
}


export async function qualityCheck(id) {

  const response =
    await api.post(
      `/crops/${id}/quality-check`
    );

  return response.data;
}