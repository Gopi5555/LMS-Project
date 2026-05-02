package com.example.LMS.Project.interfaces;

import java.io.IOException;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.example.LMS.Project.Model.Notes;

public interface NotesInterface {
	public Notes uploadNotes(MultipartFile file, String description, String email)throws IOException;
	public List<Notes> getNotesForStudent(String email);
	public List<Notes> getAllNotes();
	public Notes getById(Long id);
	public void deleteById(Long id, String email);
}
