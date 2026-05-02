import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function AddQuestionPage() {

    const { id } = useParams();

    const [q, setQ] = useState({
        question: "",
        optionA: "",
        optionB: "",
        optionC: "",
        optionD: "",
        correctAnswer: ""
    });

    const handleChange = (e) => {
        setQ({ ...q, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        await axios.post(
            `http://localhost:8080/api/quiz/question/${id}`,
            q
        );

        alert("Question Added ✅");
    };

    return (
        <div className="quiz-card">
            <h2>Add Question</h2>

            <form onSubmit={handleSubmit}>
                <textarea name="question" onChange={handleChange} />
                <input name="optionA" onChange={handleChange} />
                <input name="optionB" onChange={handleChange} />
                <input name="optionC" onChange={handleChange} />
                <input name="optionD" onChange={handleChange} />
                <input name="correctAnswer" placeholder="A/B/C/D" onChange={handleChange} />

                <button>Add Question</button>
            </form>
        </div>
    );
}

export default AddQuestionPage;