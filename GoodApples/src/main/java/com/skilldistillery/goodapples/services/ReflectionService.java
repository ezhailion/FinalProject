package com.skilldistillery.goodapples.services;

import java.util.List;

import com.skilldistillery.goodapples.entities.Reflection;

public interface ReflectionService {
 
	Reflection create(String username, Reflection reflection);
	Reflection show(String username, int reflectionId);
	List <Reflection> findAllReflectionsForASpecificStudent(int studentId);
}
