package com.skilldistillery.goodapples.services;

import java.util.List;

import com.skilldistillery.goodapples.entities.Classroom;

public interface ClassService {
	List<Classroom> index(String username);
}
