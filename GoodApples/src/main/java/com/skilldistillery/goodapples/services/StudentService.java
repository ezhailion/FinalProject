package com.skilldistillery.goodapples.services;

import org.springframework.stereotype.Service;

import com.skilldistillery.goodapples.entities.Student;
import com.skilldistillery.goodapples.entities.User;


public interface StudentService {
	
	Student createStudent(User user, int classroomId);

}
