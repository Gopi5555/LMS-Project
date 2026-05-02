// ================= BACKEND: SPRING BOOT =================
// Package: com.lms.project

// 1. Role Enum
package com.lms.project.entity;

public enum Role {
    SUPER_ADMIN,
    ADMIN,
    STUDENT
}

// 2. Branch Entity
package com.lms.project.entity;

import jakarta.persistence.*;

@Entity
public class Branch {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;

    // getters and setters
}

// 3. User Entity
package com.lms.project.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String email;
    private String password;

    @Enumerated(EnumType.STRING)
    private Role role;

    @ManyToOne
    @JoinColumn(name = "branch_id")
    private Branch branch;

    // getters and setters
}

// 4. Course Entity
package com.lms.project.entity;

import jakarta.persistence.*;

@Entity
public class Course {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;

    @ManyToOne
    private Branch branch;

    // getters and setters
}

// 5. Enrollment Entity
package com.lms.project.entity;

import jakarta.persistence.*;

@Entity
public class Enrollment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private User student;

    @ManyToOne
    private Course course;

    // getters and setters
}

// ================= REPOSITORIES =================
package com.lms.project.repository;

import com.lms.project.entity.*;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email);
    List<User> findByBranchIdAndRole(Long branchId, Role role);
}

public interface BranchRepository extends JpaRepository<Branch, Long> {}
public interface CourseRepository extends JpaRepository<Course, Long> {}
public interface EnrollmentRepository extends JpaRepository<Enrollment, Long> {}

// ================= SERVICE =================
package com.lms.project.service;

import com.lms.project.entity.*;
import com.lms.project.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User save(User user) {
        return userRepository.save(user);
    }

    public List<User> getStudentsByBranch(Long branchId) {
        return userRepository.findByBranchIdAndRole(branchId, Role.STUDENT);
    }
}

// ================= CONTROLLER =================
package com.lms.project.controller;

import com.lms.project.entity.User;
import com.lms.project.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping
    public User createUser(@RequestBody User user) {
        return userService.save(user);
    }

    @GetMapping("/students/{branchId}")
    public List<User> getStudents(@PathVariable Long branchId) {
        return userService.getStudentsByBranch(branchId);
    }
}

// ================= FRONTEND: REACT =================
// Install: npm create vite@latest lms-frontend

// App.jsx
import { useState } from 'react'
import AdminDashboard from './AdminDashboard'
import StudentDashboard from './StudentDashboard'
import SuperAdminDashboard from './SuperAdminDashboard'

function App() {
  const [role, setRole] = useState("ADMIN");

  if(role === "SUPER_ADMIN") return <SuperAdminDashboard />
  if(role === "ADMIN") return <AdminDashboard />
  return <StudentDashboard />
}

export default App

// AdminDashboard.jsx
import axios from 'axios'
import { useEffect, useState } from 'react'

function AdminDashboard() {
  const [students, setStudents] = useState([])

  useEffect(() => {
    axios.get('http://localhost:8080/api/users/students/1')
      .then(res => setStudents(res.data))
  }, [])

  return (
    <div>
      <h2>Admin Dashboard</h2>
      {students.map(s => <p key={s.id}>{s.name}</p>)}
    </div>
  )
}

export default AdminDashboard

// StudentDashboard.jsx
function StudentDashboard() {
  return <h2>Student Dashboard</h2>
}

export default StudentDashboard

// SuperAdminDashboard.jsx
function SuperAdminDashboard() {
  return <h2>Super Admin Dashboard</h2>
}

export default SuperAdminDashboard

// ================= RUN STEPS =================
// 1. Run Spring Boot
// 2. Run React (npm run dev)
// 3. Access dashboards based on role
