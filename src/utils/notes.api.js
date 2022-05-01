import axios from "axios";

const baseUrl = process.env.REACT_APP_BASE_URL;

export const notesApi = {
	createNote: (note) => {
		const authToken = localStorage.getItem("token");
		const userId = localStorage.getItem("userId");
		return axios.post(`http://localhost:8000/user/userId/${userId}/createnote`, note, 
		{headers: { authorization: `Bearer ${authToken}`}});
	},
	getNotes: () => {
		const authToken = localStorage.getItem("token");
		const userId = localStorage.getItem("userId");
		return axios.get(`http://localhost:8000/user/${userId}/getAllNotes`,
		{headers: { authorization: `Bearer ${authToken}`}});
	},
// 	deleteNote: (noteId) => {
// 		const authToken = localStorage.getItem("token");
// 		return axios.delete(`${baseUrl}/notes/deleteNote/${noteId}`,
// 		{headers: { authorization: `Bearer ${authToken}`}});
// 	},
// 	updateNote: (note,noteId) => {
// 		const authToken = localStorage.getItem("token");
// 		return axios.post(`${baseUrl}/notes/updateNote/${noteId}`,note,
// 		{headers: { authorization: `Bearer ${authToken}`}});
// 	}
};
