import axios from "axios";

const baseUrl = 'http://localhost:8000';

export const notesApi = {
	addData: (obj) => {
		const authToken = localStorage.getItem("token");
		return axios.post(`${baseUrl}/notes/createnote`, obj,
			{ headers: { authorization: `Bearer ${authToken}` } });
	},
	updateStatus: (_id, status) => {
		const authToken = localStorage.getItem("token");
		return axios.post(`${baseUrl}/notes/noteId/${_id}/updateNoteStatus`, { status },
			{ headers: { authorization: `Bearer ${authToken}` } });
	},
	getNotes: () => {
		const authToken = localStorage.getItem("token");
		return axios.get(`${baseUrl}/notes/getAllNotes`,
			{ headers: { authorization: `Bearer ${authToken}` } });
	}
};
