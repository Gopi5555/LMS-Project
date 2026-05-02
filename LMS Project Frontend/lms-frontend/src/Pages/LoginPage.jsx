import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/forms.css";

function LoginPage() {

    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!form.email || !form.password) {
            setMessage("Please enter email and password");
            return;
        }

        try {
            const response = await axios.post(
                "http://localhost:8080/api/login",
                form
            );

            const user = response.data;

            // ✅ store user
            localStorage.setItem("user", JSON.stringify(user));

            // ✅ redirect based on role
            if (user.role === "ADMIN") {
                navigate("/admin");
            } else {
                navigate("/student");
            }

        } catch (error) {
            setMessage("Invalid Email or Password");
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">

                <h2>Login</h2>

                <form onSubmit={handleLogin}>

                    <input
                        type="email"
                        name="email"
                        placeholder="Enter Email"
                        value={form.email}
                        onChange={handleChange}
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Enter Password"
                        value={form.password}
                        onChange={handleChange}
                    />

                    <button type="submit">Login</button>

                </form>

                {message && <p style={{ color: "red" }}>{message}</p>}

            </div>
        </div>
    );
}

export default LoginPage;