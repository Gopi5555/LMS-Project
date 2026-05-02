package com.example.LMS.Project.service;

import java.io.File;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.LMS.Project.Model.User;
import com.example.LMS.Project.Model.Video;
import com.example.LMS.Project.Repo.UserRepository;
import com.example.LMS.Project.Repo.VideoRepo;
import com.example.LMS.Project.enumlms.Department;
import com.example.LMS.Project.interfaces.VideoInterface;

@Service
public class VideoService implements VideoInterface {
	@Autowired
	private VideoRepo videoRepo;

	@Autowired
	private UserRepository userRepo;

	@Override
	public String uploadVideo(String title, MultipartFile file, Department department, String email)
			throws IOException {

		User user = userRepo.findByEmail(email);

		if (user == null || user.getRole().name().equals("STUDENT")) {
			throw new RuntimeException("Only Admin can upload videos");
		}

		String uploadDir = System.getProperty("user.dir") + "/uploads/";

		File directory = new File(uploadDir);
		if (!directory.exists()) {
			directory.mkdirs();
		}

		String fileName = file.getOriginalFilename();
		String filePath = uploadDir + fileName;

		file.transferTo(new File(filePath));

		Video video = new Video();
		video.setTitle(title);
		video.setFileName(fileName);
		video.setFilePath(filePath);
		video.setUploadDate(LocalDateTime.now());
		video.setDepartment(department);
		video.setUploadedBy(user);

		videoRepo.save(video);

		return "Video uploaded successfully";
	}

	@Override
	public List<Video> getAllVideos() {
		return videoRepo.findAll();
	}

	@Override
	public List<Video> getVideosByDepartment(Department dept) {
		return videoRepo.findByDepartment(dept);
	}

	@Override
	public ResponseEntity playVideo(String fileName) throws Exception {

		String uploadDir = System.getProperty("user.dir") + "/uploads/";
		File file = new File(uploadDir + fileName);

		if (!file.exists()) {
			return ResponseEntity.notFound().build();
		}

		Resource resource = new UrlResource(file.toURI());

		return ResponseEntity.ok().header("Content-Type", "video/mp4").body(resource);
	}

	@Override
	public String deleteVideo(Long id) {

		Video video = videoRepo.findById(id).orElseThrow(() -> new RuntimeException("Video not found"));

		// delete file
		File file = new File(video.getFilePath());
		if (file.exists()) {
			file.delete();
		}

		videoRepo.delete(video);

		return "Video deleted successfully";
	}

}
