import React, { useEffect, useState } from "react";
import axios from "axios";
import '../../styles/LoginSignup.css';
import { useHistory } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { GoogleButton } from "react-google-button";
import Verify from "../layout/AuthCode";

const LoginSignup = () => {
    let history = useHistory();
    const { login } = useAuth();
    const [isLogin, setIsLogin] = useState(true);
    const [verify, setVerify] = useState(false);
    const [verificationCode, setVerificationCode] = useState("");
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        name: ""
    });
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isLogin) {
            try {
                const response = await axios.post('http://localhost:5000/api/token', { email: formData.email });
                console.log("Verification token sent:", response.data);
                setVerify(true);
            } catch (error) {
                console.error("Error sending verification token", error);
                setError("Error sending verification token");
            }
        } else {
            handleConfirm(e);
        }
    };

    const handleConfirm = async (e) => {
        e.preventDefault();
        setVerify(false);
        const url = isLogin ? "http://localhost:5000/api/login" : "http://localhost:5000/api/signup";
        try {
            const response = await axios.post(url, { ...formData, token: verificationCode });
            login(response.data.token);
            history.push('/');
        } catch (error) {
            console.error("Error during form submission", error);
            setError("Verification failed or signup error");
        }
    };

    const closeVerify = () =>{
        setVerify(false);
    }


    useEffect(() => {
        const isLoggedIn = !!localStorage.getItem("authToken");
        if (isLoggedIn) history.push("/");
    }, [history]);

    return (
        <div className="bigContainer">
            <div className="logContainer">
                <h2>{isLogin ? "Login" : "Sign Up"}</h2>
                {error && <div className="alert alert-danger">{error}</div>}
                <form onSubmit={handleSubmit}>
                    {!isLogin && (
                        <div className="form-group">
                            <label>Name</label>
                            <input
                                type="text"
                                name="name"
                                className="form-control form-control1"
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </div>
                    )}
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            className="form-control form-control1"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            name="password"
                            className="form-control form-control1"
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary1">
                        {isLogin ? "Login" : "Sign Up"}
                    </button>
                </form>
                <button
                    className="btn btn-link1"
                    onClick={() => setIsLogin(!isLogin)}
                >
                    {isLogin ? "Switch to Sign Up" : "Switch to Login"}
                </button>
            </div>

            {verify && !isLogin && (
                <Verify
                    message="Enter the code"
                    onConfirm={handleConfirm}
                    setVerificationCode={setVerificationCode}
                    onSubmit={closeVerify}
                />
            )}
        </div>
    );
};

export default LoginSignup;
