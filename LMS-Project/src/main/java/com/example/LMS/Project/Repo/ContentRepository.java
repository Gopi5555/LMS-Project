package com.example.LMS.Project.Repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.LMS.Project.Model.Content;

public interface ContentRepository extends JpaRepository<Content, Long> {
	public List<Content> findByDepartment(String department);
}
