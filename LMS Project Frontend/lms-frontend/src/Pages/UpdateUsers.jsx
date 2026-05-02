import axios from "axios";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function UpdateUsers() {

  const location = useLocation();
  const navigate = useNavigate();

  const userData = location.state;

  const [form, setForm] = useState({
    id: userData?.id || "",
    name: userData?.name || "",
    email: userData?.email || "",
    role: userData?.role || "",
    department: userData?.department || ""
  });

  const [message, setMessage] = useState("");

  const loggedUser = JSON.parse(localStorage.getItem("user")); // ✅ admin

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const updateUser = async (e) => {
    e.preventDefault();

    // ✅ validation
    if (!form.name || !form.email) {
      setMessage("Please fill all required fields");
      return;
    }

    try {
      await axios.put(
        `http://localhost:8080/api/updateUser/${form.id}?email=${loggedUser.email}`,
        form
      );

      setMessage("✅ User Updated Successfully");

      setTimeout(() => {
        navigate("/students");
      }, 1500);

    } catch (error) {
      setMessage("❌ Update Failed");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">

        <h2>Update User</h2>

        <form onSubmit={updateUser}>

          {/* ID */}
          <input type="text" value={form.id} disabled />

          {/* NAME */}
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
          />

          {/* EMAIL */}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
          />

          {/* ROLE */}
          <select
            name="role"
            value={form.role}
            onChange={handleChange}
          >
            <option value="">Select Role</option>
            <option value="ADMIN">ADMIN</option>
            <option value="STUDENT">STUDENT</option>
          </select>

          {/* DEPARTMENT */}
          <select
            name="department"
            value={form.department}
            onChange={handleChange}
          >
            <option value="">Select Department</option>
            <option value="JAVA">Java</option>
            <option value="PYTHON">Python</option>
            <option value="DATA_ENGINEERING">Data Engineering</option>
          </select>

          {/* PASSWORD REMOVED (SECURITY) */}

          <button type="submit">Update</button>

        </form>

        {message && <p>{message}</p>}

      </div>
    </div>
  );
}

export default UpdateUsers;