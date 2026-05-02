package com.example.LMS.Project.Repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.LMS.Project.Model.Submission;

public interface SubmissionRepository extends JpaRepository<Submission, Long> {

}
