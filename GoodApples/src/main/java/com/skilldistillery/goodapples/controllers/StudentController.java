package com.skilldistillery.goodapples.controllers;

import java.security.Principal;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.goodapples.entities.Report;
import com.skilldistillery.goodapples.entities.Student;
import com.skilldistillery.goodapples.entities.User;
import com.skilldistillery.goodapples.services.AuthService;
import com.skilldistillery.goodapples.services.ClassService;
import com.skilldistillery.goodapples.services.ReportService;
import com.skilldistillery.goodapples.services.StudentService;

@RestController
@RequestMapping("api")
@CrossOrigin({ "*", "http://localhost/" })
public class StudentController {

	@Autowired 
	private ClassService classService;
	
	@Autowired 
	private AuthService authService;
	
	@Autowired
	private StudentService studentService;
	
	@GetMapping("classes/{classId}/students")
	public List<Student> index(@PathVariable int classId,
			HttpServletResponse res) {
		
		List<Student> students =  classService.indexStudents(classId);
		if (students == null) {
			res.setStatus(404);
		}
		return students;
	}
	
	@GetMapping("classes/{classId}/students/{studentId}")
	public Student show(@PathVariable int classId,
			@PathVariable int studentId,
			HttpServletResponse res) {
		Student student = classService.showStudent(classId, studentId);
		if (student == null) {
			res.setStatus(404);
		}
		return student;
	}
	
	@PostMapping("register/students/{classroomId}")
	public Student create (HttpServletRequest req, HttpServletResponse res, @RequestBody User newStudentUser,
			Principal principal, @PathVariable int classroomId) {
		
		Student createdStudent = null;
		User createdUser = null;
		try {
			createdUser = authService.register(newStudentUser);
			createdStudent = studentService.createStudent(createdUser, classroomId);
			res.setStatus(201);
		} catch (Exception e) {
			res.setStatus(400);
			System.err.println("StudentController.create(): error creating student");
			e.printStackTrace();
		}
		return createdStudent;
	}
	
	@GetMapping("students")
	public List<Student> index(HttpServletRequest req, HttpServletResponse res) {	
		return studentService.index();
	}
	
	
	
	
}
