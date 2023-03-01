import axios from "axios";

const api = axios.create({
	baseURL: "http://api.pppick.store/",
	headers: {
		'Content-Type': 'application/json',
		accept: 'application/json,',
	}
});

export default api;

