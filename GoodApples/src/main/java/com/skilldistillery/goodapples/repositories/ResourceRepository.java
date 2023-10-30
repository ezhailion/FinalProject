package com.skilldistillery.goodapples.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.goodapples.entities.Resource;

public interface ResourceRepository extends JpaRepository<Resource, Integer> {
	
}
