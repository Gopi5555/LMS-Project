package com.example.LMS.Project.interfaces;

import java.util.List;

import org.apache.tomcat.util.net.openssl.ciphers.Authentication;

import com.example.LMS.Project.Model.User;

public interface UsersInterface {
	public String addUser(User user);

	public List<User> getStudents(String email);

	public User updateUser(Long id, String email, User updatedUser);
}
