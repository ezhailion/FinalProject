package com.skilldistillery.goodapples.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.goodapples.entities.Classroom;

public interface ClassRepository extends JpaRepository<Classroom, Integer> {
	Classroom searchById(int id);
	List<Classroom> findByTeacher_Username(String username);
}
