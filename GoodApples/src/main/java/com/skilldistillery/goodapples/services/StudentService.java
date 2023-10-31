package com.skilldistillery.goodapples.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.skilldistillery.goodapples.entities.Student;
import com.skilldistillery.goodapples.entities.User;


public interface StudentService {
	
	Student createStudent(User user, int classroomId);
	
	List<Student> index();

}
