package com.example.LMS.Project.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.LMS.Project.Model.Quiz;
import com.example.LMS.Project.Model.User;
import com.example.LMS.Project.Repo.QuizRepo;
import com.example.LMS.Project.Repo.UserRepository;
import com.example.LMS.Project.enumlms.Role;

@Service
public class QuizService {

    @Autowired
    private QuizRepo quizRepo;

    @Autowired
    private UserRepository userRepo;

    // ✅ ADMIN CREATE
    public Quiz createQuiz(Quiz quiz, String email) {
        User admin = userRepo.findByEmail(email);

        if (admin == null || admin.getRole() == Role.STUDENT) {
            throw new RuntimeException("Only ADMIN can create quiz");
        }

        if (admin.getDepartment() == null) {
            throw new RuntimeException("Admin must have a department");
        }

        quiz.setDepartment(admin.getDepartment());
        quiz.setCreatedBy(admin);

        return quizRepo.save(quiz);
    }

    // ✅ STUDENT VIEW
    public List<Quiz> getStudentQuiz(String email) {
        User student = userRepo.findByEmail(email);
        return quizRepo.findByDepartment(student.getDepartment());
    }

    // ✅ ADMIN VIEW ALL
    public List<Quiz> getAllQuiz() {
        return quizRepo.findAll();
    }
    public Quiz getQuizById(Long id) {
        return quizRepo.findById(id)
                       .orElseThrow(() -> new RuntimeException("Quiz not found"));
    }

}