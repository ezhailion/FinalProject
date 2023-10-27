package com.skilldistillery.goodapples.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.goodapples.entities.Reflection;

public interface ReflectionRepository extends JpaRepository<Reflection, Integer> {
	List <Reflection> findByStudentId(int studentId);
	Reflection searchById(int id);
	
}
