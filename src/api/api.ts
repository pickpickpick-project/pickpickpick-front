import axios from "axios";

const api = axios.create({
	baseURL: "ec2-52-79-45-14.ap-northeast-2.compute.amazonaws.com:8080/",
	headers: {
		'Content-type': 'application/json; charset=UTF-8',
		accept: 'application/json,',
	}
});

export default api;