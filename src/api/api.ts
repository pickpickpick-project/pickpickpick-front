import axios from "axios";

const api = axios.create({
	baseURL: "http://ec2-15-164-113-99.ap-northeast-2.compute.amazonaws.com:8080/",
	headers: {
		'Content-type': 'application/json; charset=UTF-8',
		accept: 'application/json,',
	}
});

export default api;