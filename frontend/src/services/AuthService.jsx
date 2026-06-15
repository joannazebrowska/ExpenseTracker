import axios from "axios";

const loginURL = "/login?useCookies=true&useSessionCookies=true";
const registerURL = '/register'
const logoutURL = '/logout'

const AuthService = {
    login: async (email, password) => {
        const response = await axios.post(loginURL, { email, password, twoFactorCode: null, twoFactorRecoveryCode: null });
        return response.data;
    }, 
    register: async (email, password) => {
        const response = await axios.post(registerURL, {email, password});
        return response.data;
    },
    logout: async () => {
        const response = await axios.post(logoutURL);
        return response.data;
    }
};
export default AuthService;