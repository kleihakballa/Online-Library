import React, { useEffect, useState } from "react";
import axios from "axios";
import '../../styles/LoginSignup.css';
import { useHistory } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { GoogleButton } from "react-google-button";
import Verify from "../layout/AuthCode";
import {EyeOff,Eye} from "lucide-react";
import ScaleLoader from "../layout/Loader"

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
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        if (!isLogin) {
            try {
                const response = await axios.post('https://3r0ucmzjr9.execute-api.eu-west-3.amazonaws.com/dev/api/token', { email: formData.email });
                console.log("Verification token sent:", response.data);
                setVerify(true);
            } catch (error) {
                console.error("Error sending verification token", error);
                setError("Error sending verification token");
            }
        } else {
            handleConfirm(e);
        }
        setLoading(false);
    };

    const handleConfirm = async (e) => {
        e.preventDefault();
        setLoading(true);
        setVerify(false);
        const url = isLogin ? "https://3r0ucmzjr9.execute-api.eu-west-3.amazonaws.com/dev/api/login" : "https://3r0ucmzjr9.execute-api.eu-west-3.amazonaws.com/dev/api/signup";
        try {
            const response = await axios.post(url, { ...formData, token: verificationCode });
            login(response.data.token);
            history.push('/');
        } catch (error) {
            console.error("Error during form submission", error);
            setError("Verification failed or signup error");
        }
        setLoading(false);
    };

    const closeVerify = () =>{
        setVerify(false);
    }


    useEffect(() => {
        const isLoggedIn = !!localStorage.getItem("authToken");
        if (isLoggedIn) history.push("/");
    }, [history]);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }

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
                    <div className="form-group password-group">
                        <label>Password</label>
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            className="form-control form-control1"
                            value={formData.password}
                            onChange={handleChange}
                        />
                        <span className="password-icon" onClick={togglePasswordVisibility}>
                                {showPassword ? <Eye /> : <EyeOff /> }
                            </span>
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
            {loading ? (
                <ScaleLoader className='scale-loader'/>
            ) : verify && !isLogin && (
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
