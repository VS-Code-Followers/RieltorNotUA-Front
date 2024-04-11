import Logout from "../components/Logout";
import GetEmailFromToken from "../components/Token";
export default function ProfilePage() {
	return (
		<>
			<h1>User: <GetEmailFromToken /></h1>
			<div className="buttons flex m-auto justify-evenly">
				<a href="/login">Login</a>
				<Logout />
			</div>
		</>
	)
}