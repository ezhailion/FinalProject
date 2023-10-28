package com.skilldistillery.goodapples.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.goodapples.entities.Student;

public interface StudentRepository extends JpaRepository<Student, Integer> {
	
	Student searchById(int id);
	Student findByWhoami_Username(String username);
	
	

}
