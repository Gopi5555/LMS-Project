package com.example.LMS.Project.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.LMS.Project.Model.User;
import com.example.LMS.Project.Repo.UserRepository;
import com.example.LMS.Project.enumlms.Role;
import com.example.LMS.Project.interfaces.UsersInterface;

@Service
public class UserServices implements UsersInterface {
	@Autowired
	private UserRepository userRepo;

	@Override
	public String addUser(User user) {

		if (user.getEmail() == null || user.getPassword() == null) {
			throw new RuntimeException("Email & Password required");
		}

		userRepo.save(user);
		return "User Added Successfully";
	}

	@Override
	public List<User> getStudents(String email) {

		User admin = userRepo.findByEmail(email);

		if (admin == null || admin.getRole() != Role.ADMIN) {
			throw new RuntimeException("Access Denied");
		}

		return userRepo.findByDepartmentAndRole(admin.getDepartment(),Role.STUDENT);
	}
	@Override
	public User updateUser(Long id, String email, User updatedUser) {

	    User admin = userRepo.findByEmail(email);

	    if (admin == null || admin.getRole() != Role.ADMIN) {
	        throw new RuntimeException("Access Denied");
	    }

	   User user = userRepo.findById(id)
	            .orElseThrow(() -> new RuntimeException("User not found"));

	    user.setName(updatedUser.getName());
	    user.setEmail(updatedUser.getEmail());
	    user.setRole(updatedUser.getRole());
	    user.setDepartment(updatedUser.getDepartment());

	    return userRepo.save(user);
	}
}
