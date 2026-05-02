package com.example.LMS.Project.Model;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;

import com.example.LMS.Project.enumlms.Department;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;

@Entity
@Data
public class Quiz {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String description; 

    @Enumerated(EnumType.STRING)
    private Department department;

    @ManyToOne
    @JoinColumn(name = "created_by_id", nullable = false)
    @JsonIgnore
    private User createdBy;
    
    @CreationTimestamp
    private LocalDateTime createdAt; 
}