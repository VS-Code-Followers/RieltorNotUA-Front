import { useNavigate } from "react-router-dom";

export default function Logout() {
	const navigation = useNavigate();

	const handleLogout = async (e) => {
		e.preventDefault();
		await logoutUser();
	}

	const logoutUser = async () => {
		const endpoint = `http://localhost:8000/account/logout`;
		await fetch(endpoint,
			{
				method: 'GET',
				credentials: "include"
			})
			.then(response => {
				if (response.ok)
					return response.json();
				else
					console.log(response);
			})
			.then(data => {
				alert(data);
				navigation(0);
			})
			.catch(error => console.log(error))
	}
	return (
		<a href="" onClick={handleLogout}>Logout</a>
	)
}