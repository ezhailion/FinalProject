package com.skilldistillery.goodapples.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.goodapples.entities.Student;
import com.skilldistillery.goodapples.services.ClassService;

@RestController
@RequestMapping("api")
@CrossOrigin({ "*", "http://localhost/" })
public class StudentController {

	@Autowired ClassService classService;
	
	@GetMapping("classes/{classId}/students")
	public List<Student> index(@PathVariable int classId) {
		return classService.indexStudents(classId);
	}
	
	@GetMapping("classes/{classId}/students/{studentId}")
	public Student show(@PathVariable int classId, @PathVariable int studentId) {
		return classService.showStudent(classId, studentId);
	}
	
	
}
