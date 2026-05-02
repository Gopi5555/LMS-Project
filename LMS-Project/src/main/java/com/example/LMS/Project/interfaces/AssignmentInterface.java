package com.example.LMS.Project.interfaces;

import java.util.List;

import com.example.LMS.Project.Model.Assignment;

public interface AssignmentInterface {

	public Assignment createAssignment(Assignment assignment, String email);

	public List<Assignment> getAssignmentsForStudent(String email);

	public List<Assignment> getAllAssignments();
	public Assignment updateAssignment(Long id, Assignment assignment, String email);
    public void deleteAssignment(Long id, String email);
}