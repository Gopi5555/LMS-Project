package com.example.LMS.Project.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.LMS.Project.Model.Course;
import com.example.LMS.Project.service.CourseServices;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class CourseController {

	@Autowired
	private CourseServices courseServices;

	@PostMapping("/addCourse")
	public Course addCourse(@RequestBody Course course) {
		return courseServices.addCourse(course);
	}

	@GetMapping("/courses")
	public List<Course> getAllCourse() {
		return courseServices.getAllCourses();

	}

	@GetMapping("/courses/{id}")
	public Course getCourseById(@PathVariable Long id) {
		return courseServices.getCourseById(id);
	}

	@PutMapping("/courses/{id}")
	public Course updateCourse(@PathVariable Long id, @RequestBody Course course) {
		return courseServices.updateCourse(id, course);
	}

	@DeleteMapping("/courses/{id}")
	public String deleteCourse(@PathVariable Long id) {
		courseServices.deleteCourse(id);
		return "Course deleted successfully";
	}
}
