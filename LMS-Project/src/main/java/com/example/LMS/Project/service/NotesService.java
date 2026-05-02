package com.example.LMS.Project.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.LMS.Project.Model.Notes;
import com.example.LMS.Project.Model.User;
import com.example.LMS.Project.Repo.NotesRepository;
import com.example.LMS.Project.Repo.UserRepository;
import com.example.LMS.Project.enumlms.Role;
import com.example.LMS.Project.interfaces.NotesInterface;

@Service
public class NotesService implements NotesInterface{

	private static final String UPLOAD_DIR = "uploads/";

	@Autowired
	private NotesRepository notesRepository;

	@Autowired
	private UserRepository userRepo;

	// ✅ ADMIN uploads notes
	@Override
	public Notes uploadNotes(MultipartFile file, String description, String email) throws IOException {

		User user = userRepo.findByEmail(email);

		if (user.getRole() != Role.ADMIN) {
			throw new RuntimeException("Only ADMIN can upload notes");
		}

		String filePath = UPLOAD_DIR + file.getOriginalFilename();
		Files.write(Paths.get(filePath), file.getBytes());

		Notes note = new Notes();
		note.setFileName(file.getOriginalFilename());
		note.setFileType(file.getContentType());
		note.setFilePath(filePath);
		note.setDescription(description);

		// ✅ AUTO SET DEPARTMENT FROM ADMIN
		note.setDepartment(user.getDepartment());
		note.setUploadedBy(user);

		return notesRepository.save(note);
	}

	// ✅ STUDENT → only their department notes
	@Override
	public List<Notes> getNotesForStudent(String email) {
		User user = userRepo.findByEmail(email);
		return notesRepository.findByDepartment(user.getDepartment());
	}

	// ✅ ADMIN → all notes
	@Override
	public List<Notes> getAllNotes() {
		return notesRepository.findAll();
	}
	@Override
	public Notes getById(Long id) {
		return notesRepository.findById(id).orElseThrow(() -> new RuntimeException("Note not found"));
	}

	@Override
	public void deleteById(Long id, String email) {

	    Notes note = notesRepository.findById(id)
	            .orElseThrow(() -> new RuntimeException("Note not found"));

	    User user = userRepo.findByEmail(email);

	    if (user.getRole() != Role.ADMIN) {
	        throw new RuntimeException("Access Denied");
	    }

	    notesRepository.delete(note);
	}
}