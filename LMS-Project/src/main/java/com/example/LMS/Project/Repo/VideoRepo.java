package com.example.LMS.Project.Repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.LMS.Project.Model.Video;
import com.example.LMS.Project.enumlms.Department;

public interface VideoRepo extends JpaRepository<Video, Long>{
	public List<Video> findByDepartment(Department department);

}
