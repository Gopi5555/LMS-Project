package com.example.LMS.Project.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.LMS.Project.Model.Course;
import com.example.LMS.Project.Repo.CourseRepository;

@Service
public class CourseServices {

	@Autowired
	private CourseRepository courseRepository;

	public Course addCourse(Course course) {
		return courseRepository.save(course);
	}

	public List<Course> getAllCourses() {
		return courseRepository.findAll();
	}

	// READ BY ID
	public Course getCourseById(Long id) {
		return courseRepository.findById(id).orElseThrow(() -> new RuntimeException("Course not found with id: " + id));
	}

	// UPDATE
	public Course updateCourse(Long id, Course updatedCourse) {
		Course existing = courseRepository.findById(id)
				.orElseThrow(() -> new RuntimeException("Course not found with id: " + id));

		existing.setTitle(updatedCourse.getTitle());
		existing.setInstructor(updatedCourse.getInstructor());
		existing.setRating(updatedCourse.getRating());
		existing.setPrice(updatedCourse.getPrice());
		existing.setImage(updatedCourse.getImage());

		return courseRepository.save(existing);
	}

	// DELETE
	public void deleteCourse(Long id) {
		Course existing = courseRepository.findById(id)
				.orElseThrow(() -> new RuntimeException("Course not found with id: " + id));

		courseRepository.delete(existing);
	}

}
