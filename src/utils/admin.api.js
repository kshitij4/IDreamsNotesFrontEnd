import axios from "axios";

const baseUrl = process.env.REACT_APP_BASE_URL;

export const adminApi = {
	register: (userData) => {
		return axios.post(`http://localhost:8000/user/registerUser`, userData);
	},
	login: (userData) => {
		return axios.post(`http://localhost:8000/user/login`, userData);
	},
};