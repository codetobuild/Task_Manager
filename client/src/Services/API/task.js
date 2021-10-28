import axios from "axios";

export const getTasks = async () => {
  try {
    const { data } = await axios.get("/api/tasks");
    return data;
  } catch (err) {
    console.log(err.message);
  }
};

export const getOneTask = async (taskId) => {
  try {
    const { data } = await axios.get(`/api/tasks/${taskId}`);
    return data.data;
  } catch (err) {
    console.log(err.message);
  }
};

export const newTask = async (formData) => {
  try {
    const { data } = await axios.post("/api/tasks/new", formData, {
      headers: {
        "content-Type": "application/json",
      },
    });
    return data.data;
  } catch (err) {
    console.log(err.message);
  }
};

export const deleteTask = async (taskId) => {
  try {
    const { data } = await axios.delete(`/api/tasks/${taskId}/delete`, {
      headers: {
        "content-Type": "application/json",
      },
    });
    return data;
  } catch (err) {
    console.log(err.message);
  }
};

export const updateTask = async (formData, taskId) => {
  try {
    const { data } = await axios.put(`/api/tasks/${taskId}/update`, formData, {
      headers: {
        "content-Type": "application/json",
      },
    });
    return data.data;
  } catch (err) {
    console.log(err.message);
  }
};
