package com.example.LMS.Project.Model;

import java.time.LocalDateTime;

import com.example.LMS.Project.enumlms.Department;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name = "videos")
public class Video {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String title;
	private String fileName;
	private String filePath;
	private LocalDateTime uploadDate;

	@Enumerated(EnumType.STRING)
	private Department department;

	@ManyToOne(fetch = FetchType.LAZY)
	@JsonIgnore
	private User uploadedBy;
}
