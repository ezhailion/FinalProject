package com.skilldistillery.goodapples.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.goodapples.entities.Classroom;
import com.skilldistillery.goodapples.repositories.ClassRepository;

@Service
public class ClassServiceImpl implements ClassService {
	
	@Autowired
	private ClassRepository classRepo;

	@Override
	public List<Classroom> index(String username) {
		return classRepo.findByTeacher_Username(username);
	}
	
	
}
