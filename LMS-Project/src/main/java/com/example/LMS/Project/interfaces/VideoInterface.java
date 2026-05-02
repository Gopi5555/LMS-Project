package com.example.LMS.Project.interfaces;

import java.io.IOException;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import com.example.LMS.Project.Model.Video;
import com.example.LMS.Project.enumlms.Department;

import jakarta.annotation.Resource;

public interface VideoInterface {
	public String uploadVideo(String title, MultipartFile file, Department department, String email) throws IOException;

	public List<Video> getAllVideos();

	public List<Video> getVideosByDepartment(Department dept);

	public ResponseEntity<Resource> playVideo(String fileName) throws Exception;

	public String deleteVideo(Long id);

}
