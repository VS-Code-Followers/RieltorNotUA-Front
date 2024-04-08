import { useState, useEffect } from "react";

export default function GetEmailFromToken() {
	const endpoint = `http://127.0.0.1:8000/account/token`;
	const [data, setData] = useState([]);

	const fetchInfo = () => {
		fetch(endpoint,
			{
				method: 'GET',
				credentials: "include",
			}).then(response => response.json())
			.then(data => setData(data))
			.catch(error => console.log(error))
	}

	useEffect(() => {
		fetchInfo();
	}, []);

	return data['sub']
}