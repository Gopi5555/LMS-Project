package com.example.LMS.Project.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.LMS.Project.Model.Question;
import com.example.LMS.Project.Model.Quiz;
import com.example.LMS.Project.Repo.QuestionRepo;
import com.example.LMS.Project.service.QuizService;

@RestController
@RequestMapping("/api/quiz")
@CrossOrigin(origins = "http://localhost:3000")
public class QuizController {

	@Autowired
	private QuizService service;

	@Autowired
	private QuestionRepo questionRepo;

	// ✅ CREATE QUIZ
	@PostMapping
	public Quiz create(@RequestBody Quiz quiz, @RequestParam String email) {
		return service.createQuiz(quiz, email);
	}

	// ✅ STUDENT QUIZ
	@GetMapping("/student")
	public List<Quiz> getStudent(@RequestParam String email) {
		return service.getStudentQuiz(email);
	}

	// ✅ ADMIN QUIZ
	@GetMapping("/all")
	public List<Quiz> getAll() {
		return service.getAllQuiz();
	}

	// ✅ ADD QUESTION
	@PostMapping("/question/{quizId}")
	public Question addQuestion(@PathVariable Long quizId, @RequestBody Question q) {
		Quiz quiz = new Quiz();
		quiz.setId(quizId);
		q.setQuiz(quiz);
		return questionRepo.save(q);
	}

	// ✅ GET QUESTIONS
	@GetMapping("/questions/{quizId}")
	public List<Question> getQuestions(@PathVariable Long quizId) {
		return questionRepo.findByQuizId(quizId);
	}

	@GetMapping("/{id}")
	public Quiz getQuiz(@PathVariable Long id) {
		return service.getQuizById(id);
	}
}