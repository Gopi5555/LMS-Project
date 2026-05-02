package com.example.LMS.Project.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.LMS.Project.Model.Assignment;
import com.example.LMS.Project.Model.Submission;
import com.example.LMS.Project.Repo.SubmissionRepository;
import com.example.LMS.Project.service.AssignmentServices;

@RestController
@RequestMapping("/api/assignments")
@CrossOrigin(origins = "http://localhost:3000")
public class AssignmentController {

	@Autowired
	private AssignmentServices service;
	@Autowired
	private SubmissionRepository submissionRepo;

	// ✅ CREATE
	@PostMapping
	public Assignment create(@RequestBody Assignment a, @RequestParam String email) {
		return service.createAssignment(a, email);
	}

	// ✅ STUDENT VIEW
	@GetMapping("/student")
	public List<Assignment> getForStudent(@RequestParam String email) {
		return service.getAssignmentsForStudent(email);
	}

	// ✅ ADMIN VIEW
	@GetMapping("/all")
	public List<Assignment> getAll() {
		return service.getAllAssignments();
	}

	// ✅ UPDATE
	@PutMapping("/{id}")
	public Assignment update(@PathVariable Long id, @RequestBody Assignment a, @RequestParam String email) {
		return service.updateAssignment(id, a, email);
	}

	// ✅ DELETE
	@DeleteMapping("/{id}")
	public String delete(@PathVariable Long id, @RequestParam String email) {
		service.deleteAssignment(id, email);
		return "Deleted Successfully";
	}

	// ✅ SUBMIT
	@PostMapping("/submit")
	public Submission submit(@RequestBody Submission s) {
		return submissionRepo.save(s);
	}
}