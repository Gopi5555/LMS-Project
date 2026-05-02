import { useState } from "react";
import axios from "axios";
import "../styles/quiz.css"

function CreateQuiz() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [quizId, setQuizId] = useState(null);
  const [message, setMessage] = useState("");

  const [q, setQ] = useState({
    question: "",
    optionA: "",
    optionB: "",
    optionC: "",
    optionD: "",
    correctAnswer: ""
  });

  // ✅ Create Quiz
  const handleCreateQuiz = async (e) => {
    e.preventDefault();

    if (!title) {
      setMessage("❌ Title required");
      return;
    }

    try {
      const res = await axios.post(
        `http://localhost:8080/api/quiz?email=${user.email}`,
        { title, description }   // send both
      );

      setQuizId(res.data.id); // store quiz id
      setMessage("✅ Quiz Created, now add questions");
    } catch {
      setMessage("❌ Error creating quiz");
    }
  };

  // ✅ Add Question
  const handleAddQuestion = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        `http://localhost:8080/api/quiz/question/${quizId}`,
        q
      );

      alert("Question Added ✅");

      setQ({
        question: "",
        optionA: "",
        optionB: "",
        optionC: "",
        optionD: "",
        correctAnswer: ""
      });
    } catch {
      alert("❌ Error adding question");
    }
  };

  const handleChange = (e) => {
    setQ({ ...q, [e.target.name]: e.target.value });
  };

  return (
    <div className="quiz-container">
      <div className="quiz-card">
        <h2>Create Quiz</h2>

        {!quizId ? (
          <form onSubmit={handleCreateQuiz}>
            <input
              type="text"
              placeholder="Enter Quiz Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              placeholder="Enter Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <button>Create</button>
          </form>
        ) : (
          <>
            <h2>Add Question</h2>
            <form onSubmit={handleAddQuestion}>
              <textarea
                name="question"
                onChange={handleChange}
                value={q.question}
                placeholder="Enter question"
              />

              <input name="optionA" onChange={handleChange} value={q.optionA} placeholder="A" />
              <input name="optionB" onChange={handleChange} value={q.optionB} placeholder="B" />
              <input name="optionC" onChange={handleChange} value={q.optionC} placeholder="C" />
              <input name="optionD" onChange={handleChange} value={q.optionD} placeholder="D" />

              <input
                name="correctAnswer"
                onChange={handleChange}
                value={q.correctAnswer}
                placeholder="Correct (A/B/C/D)"
              />

              <button>Add Question</button>
            </form>
          </>
        )}

        <p>{message}</p>
      </div>
    </div>
  );
}

export default CreateQuiz;
