package com.example.LMS.Project.Repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.LMS.Project.Model.Notes;
import com.example.LMS.Project.enumlms.Department;

public interface NotesRepository extends JpaRepository<Notes, Long>{
	public List<Notes> findByDepartment(Department department);

}
