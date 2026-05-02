import axios from "axios";
import { useState } from "react";
import "../styles/course.css"

function AddCourse() {

  const [title, setTitle] = useState("");
  const [instructor, setInstructor] = useState("");
  const [rating, setRating] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:8080/api/addCourse", {
        title,
        instructor,
        rating: parseFloat(rating),
        price: parseFloat(price),
        image
      });

      setMessage("✅ Course Added Successfully");

      // clear form
      setTitle("");
      setInstructor("");
      setRating("");
      setPrice("");
      setImage("");

    } catch (err) {
      setMessage("❌ Error adding course");
    }
  };

  return (
    <div className="form-container">
      <div className="form-card">

        <h2>Add Course</h2>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            placeholder="Course Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Instructor Name"
            value={instructor}
            onChange={(e) => setInstructor(e.target.value)}
            required
          />

          <input
            type="number"
            step="0.1"
            placeholder="Rating (e.g 4.5)"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            required
          />

          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Image URL"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />

          <button type="submit">Add Course</button>

        </form>

        <p>{message}</p>

      </div>
    </div>
  );
}

export default AddCourse;