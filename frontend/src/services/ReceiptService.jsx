import axios from 'axios';

axios.defaults.withCredentials = true;

const ReceiptService = {
    scanReceipt: async (file) => {
        const formData = new FormData();
        formData.append("file", file);
        const response = await axios.post("api/Receipts/scan", formData);
        return response.data;
    },

    confirmReceipt: async (expenses) => {
        const response = await axios.post("api/Receipts/confirm", expenses);
        return response.data;
    }
};

export default ReceiptService;