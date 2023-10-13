import React, { useState } from 'react';
import axios from 'axios';


const UserContext = React.createContext();


const Login = ({ onLoginSuccess }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [regUsername, setRegUsername] = useState("");
    const [regPassword, setRegPassword] = useState("");
    const [showLogin, setShowLogin] = useState(true);
    const [error, setError] = useState(null);    
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
          console.log("Trying to login...");
            const response = await axios.post('/login', { username, password });
          console.log("Response:", response);
            onLoginSuccess(response.data.username);
        } catch (err) {
            setError(err.message || 'Login failed');
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/register', { username: regUsername, password: regPassword });
            setError('Registration successful! Please log in.');
        } catch (err) {
            setError(err.message || 'Registration failed');
        }
    };

   return (
     <div className="container d-flex flex-column align-items-center vh-100 justify-content-center">
            <img src="https://cdn.glitch.global/7a270a21-4ef6-4fed-a8b8-a25d51cbb17a/Screenshot_2023-10-12_121106-transformed.png?v=1697127136697" alt="Logo" className="mb-4" style={{ maxWidth: '300px' }} />

            {showLogin ? (
                <>
                    <h2 className="text-center" style={{ fontSize: '1.5rem', color: '#122d42' }}>Login</h2>
                    <form onSubmit={handleLogin} className="mb-4 w-50 mt-3">
                        <div className="form-group">
                        <input 
                            type="text" 
                            className="form-control"
                            placeholder="Username" 
                            value={username} 
                            onChange={(e) => setUsername(e.target.value)} 
                        />
                    </div>
                    <div className="form-group">
                        <input 
                            type="password" 
                            className="form-control"
                            placeholder="Password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                        />
                    </div>
                        <button type="submit" className="btn btn-block" style={{ backgroundColor: '#122d42', color: '#edd2cc' }}>Login</button>
                    </form>
                    <button onClick={() => setShowLogin(false)} className="btn btn-link">Register an account</button>
                </>
            ) : (
                <>
                    <h2 className="text-center" style={{ fontSize: '1.5rem', color: '#122d42' }}>Register</h2>
                    <form onSubmit={handleRegister} className="w-50 mt-3">
                        {/* ... Registration form inputs and Register button ... */} <div className="form-group">
                        <input 
                            type="text" 
                            className="form-control"
                            placeholder="Username" 
                            value={regUsername} 
                            onChange={(e) => setRegUsername(e.target.value)} 
                        />
                    </div>
                    <div className="form-group">
                        <input 
                            type="password" 
                            className="form-control"
                            placeholder="Password" 
                            value={regPassword} 
                            onChange={(e) => setRegPassword(e.target.value)} 
                        />
                    </div>
                        <button type="submit" className="btn btn-block" style={{ backgroundColor: '#122d42', color: '#edd2cc' }}>Register</button>
                    </form>
                    <button onClick={() => setShowLogin(true)} className="btn btn-link mt-3">Already have an account? Login</button>
                </>
            )}

            {error && <p className="mt-4" style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default Login;
