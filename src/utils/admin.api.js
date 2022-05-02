import axios from "axios";

const baseUrl = 'http://localhost:8000';

export const adminApi = {
	register: (userData) => {
		return axios.post(`${baseUrl}/user/registerUser`, userData);
	},
	login: (userData) => {
		return axios.post(`${baseUrl}/user/login`, userData);
	},
};