import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../styles/quiz.css";

function AttemptQuizPage() {

    const { id } = useParams();
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState({});
    const [score, setScore] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:8080/api/quiz/questions/${id}`)
            .then(res => setQuestions(res.data));
    }, []);

    const handleSelect = (qid, ans) => {
        setAnswers({ ...answers, [qid]: ans });
    };

    const handleSubmit = () => {
        let correct = 0;

        questions.forEach(q => {
            if (answers[q.id] === q.correctAnswer) {
                correct++;
            }
        });

        setScore(`${correct} / ${questions.length}`);
    };

    return (
        <div className="quiz-container">

            {questions.map(q => (
                <div key={q.id} className="quiz-card">

                    <h4>{q.question}</h4>

                    {["A", "B", "C", "D"].map(opt => (
                        <label key={opt}>
                            <input
                                type="radio"
                                name={q.id}
                                onChange={() => handleSelect(q.id, opt)}
                            />
                            {q["option" + opt]}
                        </label>
                    ))}

                </div>
            ))}

            <button onClick={handleSubmit}>Submit</button>

            {score && <h3>Score: {score}</h3>}

        </div>
    );
}

export default AttemptQuizPage;