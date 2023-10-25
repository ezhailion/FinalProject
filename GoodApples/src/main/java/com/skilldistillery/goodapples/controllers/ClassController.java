package com.skilldistillery.goodapples.controllers;

import java.security.Principal;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.goodapples.entities.Classroom;
import com.skilldistillery.goodapples.repositories.ClassRepository;
import com.skilldistillery.goodapples.services.ClassService;

@RestController
@RequestMapping("api")
@CrossOrigin({ "*", "http://localhost/" })

public class ClassController {

	@Autowired
	private ClassService classService;
	
	@Autowired
	private ClassRepository classRepo;
	
	
	//  GET _todos
	//@GetMapping("todos")
//	public Set<Todo> index(HttpServletRequest req, HttpServletResponse res, Principal principal) {
//		return todoService.index(principal.getName());
//	}
//	
	@GetMapping("classes")
	public List<Classroom> index(HttpServletRequest req, HttpServletResponse res, Principal principal) {
		return classService.index(principal.getName());
	}
}
