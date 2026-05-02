package com.example.LMS.Project.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.LMS.Project.Model.LoginRequest;
import com.example.LMS.Project.Model.User;
import com.example.LMS.Project.Repo.UserRepository;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class LoginController {

	@Autowired
	private UserRepository userRepo;

	@PostMapping("/login")
	public User login(@RequestBody LoginRequest request) {

		User user = userRepo.findByEmail(request.getEmail());

		if (user == null) {
			throw new RuntimeException("User not found");
		}

		if (!user.getPassword().equals(request.getPassword())) {
			throw new RuntimeException("Invalid password");
		}

		return user;
	}
}