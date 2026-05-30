import axios from 'axios';

axios.defaults.withCredentials = true;
const baseURL = "/api/expenses";
const ExpenseService = {
    getAllExpenses: async () => {
        const response = await axios.get(baseURL);
        return response.data;
    },
    addExpense: async (expense) => {
        const response = await axios.post(baseURL, expense);
        return response.data;
    },
    deleteExpense: async (id) => {
        const response = await axios.delete(`${baseURL}/${id}`);
        return response.data
    },
    updateExpense: async (id, expense) => {
        const response = await axios.put(`${baseURL}/${id}`, expense);
        return response.data;
    } 
};
export default ExpenseService;