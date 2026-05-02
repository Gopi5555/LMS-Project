package com.example.LMS.Project.controller;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
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

import com.example.LMS.Project.Model.Notes;
import com.example.LMS.Project.service.NotesService;

@RestController
@RequestMapping("/api/notes")
@CrossOrigin(origins = "http://localhost:3000")
public class NotesController {

	@Autowired
	private NotesService service;

	// ✅ Upload Notes (ADMIN only)
	@PostMapping("/upload")
	public ResponseEntity<?> uploadNotes(@RequestParam("file") MultipartFile file,
			@RequestParam("description") String description, @RequestParam("email") String email // 🔥 pass from
																									// frontend
	) {
		try {
			Notes saved = service.uploadNotes(file, description, email);
			return ResponseEntity.ok(saved);
		} catch (Exception e) {
			return ResponseEntity.badRequest().body(e.getMessage());
		}
	}

	// ✅ ADMIN → all notes
	@GetMapping("/all")
	public List<Notes> getAll() {
		return service.getAllNotes();
	}

	// ✅ STUDENT → department wise notes
	@GetMapping("/department/{email}")
	public List<Notes> getByDepartment(@PathVariable String email) {
		return service.getNotesForStudent(email);
	}

	// ✅ VIEW FILE
	@GetMapping("/view/{id}")
	public ResponseEntity<Resource> viewFile(@PathVariable Long id) throws IOException {

		Notes note = service.getById(id);
		Path path = Paths.get(note.getFilePath());

		Resource resource = new UrlResource(path.toUri());

		String contentType = Files.probeContentType(path);
		if (contentType == null) {
			contentType = "application/octet-stream";
		}

		return ResponseEntity.ok()
				.header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + note.getFileName() + "\"")
				.header(HttpHeaders.CONTENT_TYPE, contentType).body(resource);
	}

	// ✅ DOWNLOAD
	@GetMapping("/download/{id}")
	public ResponseEntity<Resource> downloadFile(@PathVariable Long id) throws IOException {

		Notes note = service.getById(id);
		Path path = Paths.get(note.getFilePath());

		Resource resource = new UrlResource(path.toUri());

		return ResponseEntity.ok()
				.header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + note.getFileName() + "\"")
				.header(HttpHeaders.CONTENT_TYPE, note.getFileType()).body(resource);
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<?> deleteNote(@PathVariable Long id, @RequestParam String email) {
		service.deleteById(id, email);
		return ResponseEntity.ok("Deleted Successfully");
	}
}