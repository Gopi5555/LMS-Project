package com.example.LMS.Project.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.LMS.Project.Model.Assignment;
import com.example.LMS.Project.Model.User;
import com.example.LMS.Project.Repo.AssignmentRepo;
import com.example.LMS.Project.Repo.UserRepository;
import com.example.LMS.Project.enumlms.Role;
import com.example.LMS.Project.interfaces.AssignmentInterface;

@Service
public class AssignmentServices implements AssignmentInterface {

	@Autowired
	private AssignmentRepo assignmentRepo;

	@Autowired
	private UserRepository userRepo;

	@Override
	public Assignment createAssignment(Assignment assignment, String email) {

		User admin = userRepo.findByEmail(email);

		if (admin == null || !Role.ADMIN.equals(admin.getRole())) {
			throw new RuntimeException("Only ADMIN can create assignments");
		}

		assignment.setDepartment(admin.getDepartment());
		assignment.setCreatedBy(admin);

		return assignmentRepo.save(assignment);
	}

	@Override
	public List<Assignment> getAssignmentsForStudent(String email) {

		User student = userRepo.findByEmail(email);

		return assignmentRepo.findByDepartment(student.getDepartment());
	}

	@Override
	public List<Assignment> getAllAssignments() {
		return assignmentRepo.findAll();
	}
	@Override
	public Assignment updateAssignment(Long id, Assignment updated, String email) {

	    User admin = userRepo.findByEmail(email);

	    if (admin == null || !Role.ADMIN.equals(admin.getRole())) {
	        throw new RuntimeException("Only ADMIN can update assignments");
	    }

	    Assignment existing = assignmentRepo.findById(id)
	            .orElseThrow(() -> new RuntimeException("Assignment not found"));

	    existing.setTitle(updated.getTitle());
	    existing.setDescription(updated.getDescription());
	    existing.setDueDate(updated.getDueDate());

	    return assignmentRepo.save(existing);
	}
	@Override
	public void deleteAssignment(Long id, String email) {

	    User admin = userRepo.findByEmail(email);

	    if (admin == null || !Role.ADMIN.equals(admin.getRole())) {
	        throw new RuntimeException("Only ADMIN can delete assignments");
	    }

	    assignmentRepo.deleteById(id);
	}
}