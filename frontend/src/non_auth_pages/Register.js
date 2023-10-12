import React from 'react'
import axios from 'axios'
import { useState, useRef } from 'react'
import EmailValidation from '../non_auth_pages/EmailValidation'
import { useNavigate } from 'react-router-dom';
import NonAuthCSS from './login_register.module.css'

function Register() {
    const navigate = useNavigate();
    const [formValues, setFormValues] = useState({
        username: "",
        email: "",
        password: "",
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        if (EmailValidation(formValues)) {
            console.log(formValues);
            console.log("called right here…");
            axios.post('http://18.117.113.195:8080/register', formValues)
                .then(response => {
                    if (response.status === 200) {
                        console.log("reaches login");
                        resetForm();
                        navigate('/login');
                    }
                })
                .catch(error => {
                    if (error.response.status === 404) {
                        resetForm();
                        alert("Account with email entered is already registered! Please use a different email address.");
                        console.error('Signup was not successful. Status code:', error.response.status);
                    }
                });
        }
    }

    const handleInput = (event) => {
        setFormValues(prev => ({ ...prev, [event.target.name]: event.target.value }))
    }

    const formRef = useRef(null);

    const resetForm = () => {
        if (formRef.current) {
            formRef.current.reset();
        }
    };

    return (
        <main className={NonAuthCSS.center}>
            <div className={NonAuthCSS.container}>
                <div className={NonAuthCSS.text}>
                    Weather App Register
                </div>

                <form className="regform" action="/register" method="post" ref={formRef} onSubmit={handleSubmit}>
                    <div className={NonAuthCSS.data} id="username-container">
                        <label htmlFor='username'>Username</label>
                        <input id="username" type="text" name="username" placeholder="Ex: JohnDoe123" onChange={handleInput} required />
                    </div>
                    <div className={NonAuthCSS.data}>
                        <label htmlFor='email'>Email</label>
                        <input id="email" type="email" name="email" placeholder="Ex: jdoe@yahoo.com" onChange={handleInput} required />
                    </div>
                    <div className={NonAuthCSS.data}>
                        <label htmlFor='password'>Password</label>
                        <input id="password" type="password" name="password" placeholder="Ex: password123" onChange={handleInput} required />
                    </div>
                    <div className={NonAuthCSS.forgot_pass}>
                        {/* <a>Forgot Password?</a> */}
                    </div>
                    <div className={NonAuthCSS.btn}>
                        <div className="inner"></div>
                        <button id="submitbutton" type="submit">Sign Up</button>
                    </div>
                    <div className={NonAuthCSS.signup_link}>
                        <p>Already a member?</p> <a href="/login">Login now</a>
                    </div>
                </form>
            </div>
        </main>
    )
}

export default Register