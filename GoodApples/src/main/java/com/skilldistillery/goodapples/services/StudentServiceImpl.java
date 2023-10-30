package com.skilldistillery.goodapples.services;

import org.springframework.beans.factory.annotation.Autowired;

import com.skilldistillery.goodapples.entities.Student;
import com.skilldistillery.goodapples.entities.User;
import com.skilldistillery.goodapples.repositories.StudentRepository;
import com.skilldistillery.goodapples.repositories.UserRepository;

public class StudentServiceImpl implements StudentService {

	@Autowired
	private StudentRepository studentRepo;
	
	@Override
	public Student createStudentUser(Student newStudent) {
		if(newStudent != null) {
		return studentRepo.saveAndFlush(newStudent);
		}
		return null;
	}

	
	
	

}
