import axios from 'axios';

axios.defaults.withCredentials = true;
const baseURL = "/api/Categories";
const CategoryService = {
    getAllCategories: async () => {
        const response = await axios.get(baseURL);
        return response.data;
    },
    addCategory: async (category) => {
        const response = await axios.post(baseURL, category);
        return response.data;
    },
    deleteCategory: async (id) => {
        const response = await axios.delete(`${baseURL}/${id}`);
        return response.data
    },
    updateCategory: async (id, category) => {
        const response = await axios.put(`${baseURL}/${id}`, category);
        return response.data;
    } 
};

export default CategoryService;