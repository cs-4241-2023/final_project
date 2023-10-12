import React from 'react'
import axios from 'axios'
import { useState, useRef } from 'react'
import EmailValidation from './EmailValidation'
import { useNavigate } from 'react-router-dom';
import NonAuthCSS from './login_register.module.css'

function Login() {
    const navigate = useNavigate();
    const [formValues, setFormValues] = useState({
        email: "",
        password: "",
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        if (EmailValidation(formValues)) {
            console.log(formValues);
            axios.post('http://18.117.113.195:8080/login', formValues)
                .then(response => {
                    if (response.status === 200) {
                        resetForm();
                        navigate('/home');
                    }
                })
                .catch(error => {
                    if (error.response.status === 404) {
                        alert("Incorrect username or password");
                        console.error('Login was not successful. Status code:', error.response.status);
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
        <div className={NonAuthCSS.center}>
            <div className={NonAuthCSS.container}>
                <div className={NonAuthCSS.text}>
                    Weather App Login
                </div>

                <form action="/login" method="post" ref={formRef} onSubmit={handleSubmit}>
                    <div className={NonAuthCSS.data} id="email-container">
                        <label htmlFor="email">Email</label>
                        <input id="email" name="email" type="email" onChange={handleInput} required />
                    </div>
                    <div className={NonAuthCSS.data}>
                        <label htmlFor="password">Password</label>
                        <input id="password" name="password" type="password" onChange={handleInput} required />
                    </div>
                    <div className={NonAuthCSS.forgot_pass}>
                        {/* <a >Forgot Password?</a> */}
                    </div>
                    <div className={NonAuthCSS.btn}>
                        <button id="submitbutton" type="submit">login</button>
                    </div>
                </form>

                <div className={NonAuthCSS.container_two}>
                    <div className={NonAuthCSS.img_container}>
                        <img className={NonAuthCSS.test_img}
                            src="https://cdn.icon-icons.com/icons2/2157/PNG/512/github_git_hub_logo_icon_132878.png"
                            alt="github logo" />
                    </div>
                    <form action="/auth/github" method="get">
                        <button id={NonAuthCSS.github_button} type="submit">login via
                            Github</button>
                    </form>
                </div>

                <div className={NonAuthCSS.signup_link}>
                    <p> Not a member? </p> <a href="/register"> Signup now</a>
                </div>
            </div>
        </div>
    )
}

export default Login