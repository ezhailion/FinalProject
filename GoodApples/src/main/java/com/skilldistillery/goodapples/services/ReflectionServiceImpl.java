package com.skilldistillery.goodapples.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.goodapples.entities.Reflection;
import com.skilldistillery.goodapples.entities.Student;
import com.skilldistillery.goodapples.entities.User;
import com.skilldistillery.goodapples.repositories.ReflectionRepository;
import com.skilldistillery.goodapples.repositories.StudentRepository;
import com.skilldistillery.goodapples.repositories.UserRepository;

@Service
public class ReflectionServiceImpl implements ReflectionService {

	@Autowired
	private ReflectionRepository reflectRepo;
	
	@Autowired
	private UserRepository userRepo;
	@Autowired
	private StudentRepository studRepo;

	@Override
	public Reflection create(String username, Reflection reflection) {
		// TODO Auto-generated method stub
		
		Student student = studRepo.findByWhoami_Username(username);
		if(student != null) {
			reflection.setStudent(student);
			reflection.setEnabled(true);	
			return reflectRepo.saveAndFlush(reflection);
		}
		
		
		return null;
	}

	@Override
	public Reflection show(String username, int reflectionId) {
		// TODO Auto-generated method stub
		Reflection refl = reflectRepo.searchById(reflectionId);
		User student = userRepo.findByUsername(username);
		if(refl != null && student.getId() == refl.getStudent().getId()) {
			return refl;
		}
		return null;
	}

	@Override
	public List<Reflection> findAllReflectionsForASpecificStudent(int studentId) {
		
		
		return reflectRepo.findByStudentId(studentId);
	}

	@Override
	public boolean deleteReflection(int reflectionId) {
		Reflection reflectionToDelete = reflectRepo.searchById(reflectionId);
		if(reflectionToDelete != null) {
			reflectionToDelete.setEnabled(false);
			reflectRepo.saveAndFlush(reflectionToDelete);	
		return true;
	}
	return false;
	}
}
