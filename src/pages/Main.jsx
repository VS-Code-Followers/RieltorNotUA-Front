import GetEmailFromToken from "../components/Token";
export default function ProfilePage() {
	return (
		<>
			<h1>User: <GetEmailFromToken /></h1>
			<a href="/login">Login</a>
			<a href="/logout"></a>
		</>
	)
}