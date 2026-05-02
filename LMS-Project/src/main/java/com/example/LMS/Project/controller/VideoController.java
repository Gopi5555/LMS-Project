package com.example.LMS.Project.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.LMS.Project.Model.Video;
import com.example.LMS.Project.enumlms.Department;
import com.example.LMS.Project.service.VideoService;

@RestController
@RequestMapping("/api/video")
@CrossOrigin(origins = "http://localhost:3000")
public class VideoController {

	@Autowired
	private VideoService videoService;

	@PostMapping("/upload")
	public String uploadVideo(@RequestParam("title") String title, @RequestParam("video") MultipartFile file,
			@RequestParam("department") Department department, @RequestParam("email") String email) throws IOException {
		return videoService.uploadVideo(title, file, department, email);
	}

	@GetMapping("/all")
	public List<Video> getAllVideos() {
		return videoService.getAllVideos();
	}

	@GetMapping("/department/{dept}")
	public List<Video> getVideosByDepartment(@PathVariable Department dept) {
		return videoService.getVideosByDepartment(dept);
	}

	@GetMapping("/play/{fileName}")
	public ResponseEntity<Resource> playVideo(@PathVariable String fileName) throws Exception {
		return videoService.playVideo(fileName);
	}

	// ✅ FIXED DELETE (IMPORTANT)
	@DeleteMapping("/{id}")
	public String deleteVideo(@PathVariable Long id) {
		return videoService.deleteVideo(id);
	}
}