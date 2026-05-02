package com.example.LMS.Project.Repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.LMS.Project.Model.User;
import com.example.LMS.Project.enumlms.Department;
import com.example.LMS.Project.enumlms.Role;

public interface UserRepository extends JpaRepository<User, Long> {
	public User findByEmail(String email);

	public List<User> findByDepartmentAndRole(Department department, Role role);
}
