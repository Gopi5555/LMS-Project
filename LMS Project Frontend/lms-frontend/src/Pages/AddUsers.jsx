import axios from "axios";
import { useState } from "react";
import '../styles/forms.css'
function AddUsers() {

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        role: "",
        department: ""
    });

    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const register = async (e) => {
        e.preventDefault(); 

        if (!form.name || !form.email || !form.password || !form.role || !form.department) {
            setMessage("All fields are required");
            return;
        }

        try {
            const response = await axios.post(
                "http://localhost:8080/api/addData",
                form
            );

            setMessage(response.data);

            // reset form
            setForm({
                name: "",
                email: "",
                password: "",
                role: "",
                department: ""
            });

        } catch (error) {
            setMessage("Server Error");
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <h2>Add User</h2>

                <form onSubmit={register}>

                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={form.name}
                        onChange={handleChange}
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={handleChange}
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={form.password}
                        onChange={handleChange}
                    />

                    {/* ROLE DROPDOWN */}
                    <select name="role" value={form.role} onChange={handleChange}>
                        <option value="">Select Role</option>
                        <option value="ADMIN">ADMIN</option>
                        <option value="STUDENT">STUDENT</option>
                    </select>

                    {/* DEPARTMENT DROPDOWN */}
                    <select name="department" value={form.department} onChange={handleChange}>
                        <option value="">Select Department</option>
                        <option value="JAVA">Java</option>
                        <option value="PYTHON">Python</option>
                        <option value="DATA_ENGINEERING">Data Engineering</option>
                    </select>

                    <button type="submit">Add User</button>

                </form>

                <p>{message}</p>
            </div>
        </div>
    );
}

export default AddUsers;