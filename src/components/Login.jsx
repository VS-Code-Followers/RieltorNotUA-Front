import { useState } from 'react';
import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { loginFields } from "../constants/formFields";
import FormAction from "./FormAction";
import FormExtra from "./FormExtra";
import Input from "./Input";
import { ReactComponent as GoogleSI } from '../assets/googleSI.svg';


const fields = loginFields;
let fieldsState = {};
fields.forEach(field => fieldsState[field.id] = '');

export default function Login() {
	const formRef = useRef();
	const navigation = useNavigate();
	const [loginState, setLoginState] = useState(fieldsState);

	const handleChange = (e) => {
		setLoginState({ ...loginState, [e.target.id]: e.target.value })
	}

	const handleSubmit = async (e) => {
		e.preventDefault();
		await authenticateUser();
	}

	const handleGoogleSubmit = async (e) => {
		e.preventDefault();
		await authenticateGoogleUser();
	}

	const authenticateGoogleUser = async () => {
		const endpoint = `http://127.0.0.1:8000/account/auth/google`;
		let ok;
		await fetch(endpoint,
			{
				method: 'GET',
				credentials: "include",
			}).then(response => {
				if (response.ok) {
					ok = true;
					return response.json();
				}
			})
			.then(data => {
				if (ok)
					navigation('/', { state: { 'token': data['access_token'] }, replace: true });
			})
			.catch(error => console.log(error))
	}
	//Handle Login API Integration here
	const authenticateUser = async () => {
		const endpoint = `http://127.0.0.1:8000/account/token/test`;
		const formData = new FormData(formRef.current);
		let ok;
		await fetch(endpoint,
			{
				method: 'POST',
				credentials: "include",
				body: formData
			}).then(response => {
				if (response.ok) {
					ok = true;
					return response.json();
				}
			})
			.then(data => {
				if (ok)
					navigation('/', { state: { 'token': data['access_token'] }, replace: true });
			})
			.catch(error => console.log(error))
	}

	return (
		<div className='loginForm'>
			<form className="mt-8 space-y-6" onSubmit={handleSubmit} ref={formRef}>
				<div className="-space-y-px">
					{
						fields.map(field =>
							<Input
								key={field.id}
								handleChange={handleChange}
								value={loginState[field.id]}
								labelText={field.labelText}
								labelFor={field.labelFor}
								id={field.id}
								name={field.name}
								type={field.type}
								isRequired={field.isRequired}
								placeholder={field.placeholder}
							/>

						)
					}
				</div>

				<FormExtra />
				<FormAction handleSubmit={handleSubmit} text="Login" />
			</form>
			<a href="http://127.0.0.1:8000/account/login/google">
				<GoogleSI />
			</a>
		</div>
	)
}