package com.skilldistillery.goodapples.services;

import java.util.List;

import com.skilldistillery.goodapples.entities.Classroom;
import com.skilldistillery.goodapples.entities.Student;


public interface ClassService {
	List<Classroom> index(String username);
	Classroom show(String username, int classId);
	Classroom create(String username, Classroom newClass);
	Classroom update (String username, int classId, Classroom updatedClass);
	boolean destroy (String username, int classId);
	
	boolean disable(String username, int classId);
	
	List<Student> indexStudents(int classId);
	Student showStudent(int classId, int studentId);
	
	Classroom addExistingStudentsToClass(int classId, int studentId, String username);
	

	
}
