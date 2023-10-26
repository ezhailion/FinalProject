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
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.goodapples.entities.Classroom;
import com.skilldistillery.goodapples.services.ClassService;

@RestController
@RequestMapping("api")
@CrossOrigin({ "*", "http://localhost/" })

public class ClassController {

	@Autowired
	private ClassService classService;

	@GetMapping("classes")
	public List<Classroom> index(HttpServletRequest req, HttpServletResponse res, Principal principal) {
		return classService.index(principal.getName());
	}

	@GetMapping("classes/{classId}")
	public Classroom show(@PathVariable int classId, HttpServletRequest req, HttpServletResponse res,
			Principal principal) {
		Classroom classroom = null;
		try {
			classroom = classService.show(principal.getName(), classId);
		} catch (Exception e) {
			System.err.println("ClassController.show(): error locating class");
			e.printStackTrace();
		}
		if (classroom == null) {
			res.setStatus(404);
		}
		return classroom;
	}

	@PostMapping("classes")
	public Classroom create(HttpServletRequest req, HttpServletResponse res, @RequestBody Classroom newClass,
			Principal principal) {
		Classroom createdClassroom = null;
		try {
			createdClassroom = classService.create(principal.getName(), newClass);
			res.setStatus(201);
			StringBuffer url = req.getRequestURL();
			url.append("/").append(createdClassroom.getId());
			res.setHeader("Location", url.toString());
		} catch (Exception e) {
			res.setStatus(400);
			System.err.println("ClassController.create(): error creating classroom");
			e.printStackTrace();
		}
		return createdClassroom;
	}

	@PutMapping("classes/{classId}")
	public Classroom update(HttpServletRequest req, HttpServletResponse res, @PathVariable int classId,
			@RequestBody Classroom classroomWithUpdates, Principal principal) {
		Classroom updatedClassroom = null;
		try {
			updatedClassroom = classService.update(principal.getName(), classId, classroomWithUpdates);
			if (updatedClassroom == null) {
				res.setStatus(404);
			}
		} catch (Exception e) {
			System.err.println("ClassController.update(): error updating classroom");
			e.printStackTrace();
			res.setStatus(400);
		}
		return updatedClassroom;
	}

	// CHANGING DELETE TO DISABLE 
	@DeleteMapping("classes/{classId}")
	public void destroy(HttpServletRequest req, HttpServletResponse res, @PathVariable int classId,
			Principal principal) {
		try {
			if (classService.disable(principal.getName(), classId)) {
				res.setStatus(204);
			} else {
				res.setStatus(404);
			}
		} catch (Exception e) {
			System.err.println("ClassController.destroy(): error deleting classroom");
			e.printStackTrace();
			res.setStatus(400);
		}
	}
	
	
}
