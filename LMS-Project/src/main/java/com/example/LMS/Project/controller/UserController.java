package com.example.LMS.Project.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.LMS.Project.Model.User;
import com.example.LMS.Project.service.UserServices;

@RestController
@RequestMapping("api")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

	@Autowired
	private UserServices userService;

	@PostMapping("/addData")
	public String insertData(@RequestBody User ru) {
		return userService.addUser(ru);
	}

	@GetMapping("/students")
	public List<User> getStudents(@RequestParam String email) {

		return userService.getStudents(email);
	}
	@PutMapping("/updateUser/{id}")
	public User updateUser(@PathVariable Long id,
	                               @RequestParam String email,
	                               @RequestBody User updatedUser) {
	    return userService.updateUser(id, email, updatedUser);
	}

}
