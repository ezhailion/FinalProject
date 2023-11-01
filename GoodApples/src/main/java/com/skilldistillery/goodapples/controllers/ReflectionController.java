package com.skilldistillery.goodapples.controllers;

import java.security.Principal;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.goodapples.entities.Reflection;
import com.skilldistillery.goodapples.services.ReflectionService;

@RestController
@RequestMapping("api")
@CrossOrigin({ "*", "http://localhost/" })
public class ReflectionController {

	@Autowired
	private ReflectionService reflectServ;

	@GetMapping("reflections/students/{studentId}")
	public List<Reflection> findAllReflectionsForStudent(@PathVariable int studentId) {

		return reflectServ.findAllReflectionsForASpecificStudent(studentId);
	}

	@PostMapping("reflections")
	public Reflection createReflection(HttpServletRequest req, HttpServletResponse resp,
			@RequestBody Reflection newReflection, Principal principal) {
		Reflection createdRefl = null;

		try {
			createdRefl = reflectServ.create(principal.getName(), newReflection);
			resp.setStatus(201);
			StringBuffer url = req.getRequestURL();
			url.append("/").append(createdRefl.getId());
			resp.setHeader("Location", url.toString());

		} catch (Exception e) {
			// TODO: handle exception
			resp.setStatus(400);
			System.err.println("ReflectionController.create(): error creating reflection!");
			e.printStackTrace();
		}
		return createdRefl;
	}
	
	@DeleteMapping("reflections/{reflectionId}") 
	public boolean deleteResponse(@PathVariable int reflectionId, Principal principal,
			HttpServletResponse res) {
		boolean deleted = false;
		try {
			if(reflectServ.deleteReflection(reflectionId)) {
				res.setStatus(200);
				deleted = true;
			} else {
				res.setStatus(404);
			}
			} catch (Exception e) {
				System.err.println("ReflectionController.deleteResponse(): error deleting reflection");
				e.printStackTrace();
				res.setStatus(400);
			}
			return deleted;
		}
}
