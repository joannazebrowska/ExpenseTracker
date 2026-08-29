import axios from 'axios';

axios.defaults.withCredentials = true;
const baseURL = "/api/expenses";
const summaryURL = '/api/expenses/summary'
const monthlyDataURL = '/api/expenses/monthlydata'

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
    },

    getSummary: async () => {
        const response = await axios.get(summaryURL);
        return response.data;
    },

    getMonthlyData: async () => {
        const response = await axios.get(monthlyDataURL);
        return response.data;
    }
};
export default ExpenseService;