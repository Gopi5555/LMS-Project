package com.example.LMS.Project.Model;

import com.example.LMS.Project.enumlms.Department;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Content {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String title;
	private String type; // CLASS / NOTES / ASSIGNMENT / QUIZ

	@Enumerated(EnumType.STRING)
	private Department department;

	private String filePath;
	
}
