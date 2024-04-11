import { useState } from 'react';
import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { loginFields } from "../constants/formFields";
import FormAction from "./FormAction";
import FormExtra from "./FormExtra";
import Input from "./Input";
import GoogleLoginButton from './GoogleLoginButton';


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

	//Handle Login API Integration here
	const authenticateUser = async () => {
		const endpoint = `http://localhost:8000/account/token`;
		const formData = new FormData(formRef.current);
		await fetch(endpoint,
			{
				method: 'POST',
				credentials: "include",
				body: formData
			})
			.then(response => {
				if (response.ok)
					navigation('/');
				else if (response.status == 401)
					return response.json()
			})
			.then(data => { if (data) alert(data['detail']) })
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
			<GoogleLoginButton />
		</div>
	)
}