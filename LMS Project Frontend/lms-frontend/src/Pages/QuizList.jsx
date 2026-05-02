import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/quiz.css";

function QuizList() {

    const [quizzes, setQuizzes] = useState([]);
    const user = JSON.parse(localStorage.getItem("user"));
    const navigate = useNavigate();

    useEffect(() => {

        if (!user) return;

        if (user.role === "ADMIN") {
            axios.get("http://localhost:8080/api/quiz/all")
                .then(res => setQuizzes(res.data))
                .catch(err => console.error(err));
        } else {
            axios.get(`http://localhost:8080/api/quiz/student?email=${user.email}`)
                .then(res => setQuizzes(res.data))
                .catch(err => console.error(err));
        }

    }, []);

    return (
        <div className="quiz-container">
            <div className="quiz-grid">
                {quizzes.map(q => (
                    <div key={q.id} className="quiz-card">
                        <h3>{q.title}</h3>
                        <p>{q.description}</p>

                        <button onClick={() => navigate(`/quiz/${q.id}`)}>
                            ▶ Start Quiz
                        </button>
                    </div>
                ))}
            </div>

        </div>
    );
}

export default QuizList;