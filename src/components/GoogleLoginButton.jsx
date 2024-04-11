import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { useNavigate } from "react-router-dom";

export default function GoogleLoginButton() {
	const navigation = useNavigate();

	const responseGoogle = (response) => {
		if (response.credential) {
			fetch('http://localhost:8000/account/auth/google?token=' + response.credential,
				{
					credentials: 'include',
					// To cause browsers to send a request with credentials included on both same-origin and cross-origin calls,  
					// add credentials: 'include' to the init object you pass to the fetch() method. 
				})
				.then(response => {
					if (response.ok)
						navigation('/');
					else
						console.log(response)
				}).
				then(data => { })
				.catch(error => console.log(error))
		}
	}

	return <GoogleOAuthProvider clientId="521304006798-6fbhp3s9q14jcamdi2e9r2p1ta355fji.apps.googleusercontent.com">
		<GoogleLogin
			buttonText="Google Login"
			onSuccess={responseGoogle}
			onFailure={responseGoogle}
			cookiePolicy={'single_host_origin'}
		/>
	</GoogleOAuthProvider>
}
