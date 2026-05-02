package com.example.LMS.Project.Repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.LMS.Project.Model.Course;

public interface CourseRepository extends JpaRepository<Course, Long>{

}
