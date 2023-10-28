package com.skilldistillery.goodapples.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.goodapples.entities.User;

public interface UserRepository extends JpaRepository<User, Integer> {
	User findByUsername(String username);
	User searchById(int id);
	
	
}
