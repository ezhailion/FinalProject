package com.skilldistillery.goodapples.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.goodapples.entities.Behavior;

public interface BehaviorRepository extends JpaRepository<Behavior, Integer> {
	Behavior searchById(int id);
	
}
