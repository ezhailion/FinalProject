package com.skilldistillery.goodapples.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.goodapples.entities.Student;
import com.skilldistillery.goodapples.entities.User;
import com.skilldistillery.goodapples.repositories.StudentRepository;
import com.skilldistillery.goodapples.repositories.UserRepository;

@Service
public class StudentServiceImpl implements StudentService {
	
	@Autowired
	private UserRepository userRepo;
	
	@Autowired
	private StudentRepository studentRepo;

	@Override
	public Student createStudent(User user) {
		Student newStudent = new Student();
		newStudent.setWhoami(user);
		studentRepo.saveAndFlush(newStudent);
		user.setStudent(newStudent);
		userRepo.saveAndFlush(user);
		return newStudent;
	}

	

	
	
	

}
