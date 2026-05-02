import React, { useState } from "react";
import formImg from "../assets/images/vcube 1.jpg";

function FormSection() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    course: "",
    message: ""
  });

  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.phone || !formData.email) {
      alert("Please fill all required fields");
      return;
    }

    console.log(formData); 
    setSuccess("✅ Your details submitted successfully!");
    setFormData({
      name: "",
      phone: "",
      email: "",
      course: "",
      message: ""
    });
  };

  return (
    <section className="form-section">
      <div className="form-container">

        {/* 🔹 Left Image */}
        <div className="form-image">
          <img src={formImg} alt="Training" />
        </div>

        {/* 🔹 Right Content */}
        <div className="form-content">

          <h2>Your Next Step to Success 🚀</h2>
          <p className="form-subtext">
            Enroll now and start your journey with Vcube. Our team will contact you shortly.
          </p>

          <form className="form" onSubmit={handleSubmit}>

            <input
              type="text"
              name="name"
              placeholder="Full Name *"
              value={formData.name}
              onChange={handleChange}
            />

            <input
              type="text"
              name="phone"
              placeholder="Phone Number *"
              value={formData.phone}
              onChange={handleChange}
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address *"
              value={formData.email}
              onChange={handleChange}
            />

            <select
              name="course"
              value={formData.course}
              onChange={handleChange}
            >
              <option value="">Choose Your Course</option>
              <option>Java Fullstack</option>
              <option>Python Fullstack</option>
              <option>Data Science</option>
              <option>Cyber Security</option>
            </select>

            <textarea
              name="message"
              placeholder="Your Message (Optional)"
              rows="3"
              value={formData.message}
              onChange={handleChange}
            />

            <button type="submit">Enroll Now</button>

          </form>

          {/* 🔥 Success Message */}
          {success && <p className="success-msg">{success}</p>}

        </div>

      </div>
    </section>
  );
}

export default FormSection;