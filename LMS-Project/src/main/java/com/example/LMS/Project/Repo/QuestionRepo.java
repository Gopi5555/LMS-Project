package com.example.LMS.Project.Repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.LMS.Project.Model.Question;

public interface QuestionRepo extends JpaRepository<Question, Long> {

	public List<Question> findByQuizId(Long quizId);
}
