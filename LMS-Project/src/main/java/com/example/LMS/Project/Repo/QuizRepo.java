package com.example.LMS.Project.Repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.LMS.Project.Model.Quiz;
import com.example.LMS.Project.enumlms.Department;

public interface QuizRepo extends JpaRepository<Quiz, Long> {
	public List<Quiz> findByDepartment(Department department);

}
