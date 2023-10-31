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
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.goodapples.entities.Student;
import com.skilldistillery.goodapples.entities.User;
import com.skilldistillery.goodapples.services.UserService;

@RestController
@RequestMapping("api")
@CrossOrigin({ "*", "http://localhost/" })
public class UserController {

	@Autowired
	private UserService userService;

	@PutMapping("users")
	public User updateOwnAccount(HttpServletRequest req, HttpServletResponse res, @RequestBody User userWithUpdates,
			Principal principal) {
		User updatedUser = null;
		try {
			updatedUser = userService.update(userWithUpdates, principal.getName());
			if (updatedUser == null) {
				res.setStatus(404);
			}
		} catch (Exception e) {
			System.err.println("UserController.update(): error updating user");
			e.printStackTrace();
			res.setStatus(400);
		}
		return updatedUser;
	}
	@PutMapping("users/{userId}/students/{studentId}")
	public User updateOtherUserAccount(HttpServletRequest req, HttpServletResponse res, @RequestBody User userWithUpdates,
			@PathVariable int userId, @PathVariable int studentId, Principal principal) {
		User updatedUser = null;
		try {
			updatedUser = userService.updateOtherUser(principal.getName(), userId, userWithUpdates, studentId );
			if (updatedUser == null) {
				res.setStatus(404);
			}
		} catch (Exception e) {
			System.err.println("UserController.updateOtherUserAccount(): error updating other user");
			e.printStackTrace();
			res.setStatus(400);
		}
		return updatedUser;
	}

//	 dissabling other user account?
	@DeleteMapping("users/{userId}")
	public void destroy(HttpServletRequest req, HttpServletResponse res, @PathVariable int userId,
			Principal principal) {
		try {
			if (userService.disable(principal.getName(), userId)) {
				res.setStatus(200);
			} else {
				res.setStatus(404);
			}
		} catch (Exception e) {
			System.err.println("UserController.disable(): error disabling user");
			e.printStackTrace();
			res.setStatus(400);
		}
	}

//	Dissabling own account
	@DeleteMapping("users")
	public void deleteOwnAccount(HttpServletRequest req, HttpServletResponse res, Principal principal) {
		try {
			if (userService.disableSelf(principal.getName())) {
				res.setStatus(200);
			} else {
				res.setStatus(404);
			}
		} catch (Exception e) {
			System.err.println("UserController.disable(): error disabling user");
			e.printStackTrace();
			res.setStatus(400);
		}
	}

	@GetMapping("users/students")
	public Student getStudentByUsername(HttpServletRequest req, HttpServletResponse res, Principal principal) {
		Student student = null;
		try {
			student = userService.getStudentByUsername(principal.getName());
		} catch (Exception e) {
			res.setStatus(400);
			e.printStackTrace();
		}
		return student;
	}
	
	@GetMapping("users/kids")
	public List<Student> getStudentsFromParentname(Principal principal) {
		return userService.getAParentsKids(principal.getName());
	}
}
