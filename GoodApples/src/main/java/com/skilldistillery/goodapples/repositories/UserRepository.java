package com.skilldistillery.goodapples.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.goodapples.entities.Student;
import com.skilldistillery.goodapples.entities.User;

public interface UserRepository extends JpaRepository<User, Integer> {
	User findByUsername(String username);
	User searchById(int id);
	
	
	
	
}
