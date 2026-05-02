package com.example.LMS.Project.Model;

import com.example.LMS.Project.enumlms.Department;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.Data;

@Entity
@Data
public class Assignment {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String title;
	private String description;
	private String dueDate;

	@Enumerated(EnumType.STRING)
	private Department department;

	@ManyToOne
	@JsonIgnore
	private User createdBy;
}
