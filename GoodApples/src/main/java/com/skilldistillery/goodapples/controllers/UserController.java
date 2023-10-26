package com.skilldistillery.goodapples.controllers;

import java.security.Principal;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.goodapples.entities.Classroom;
import com.skilldistillery.goodapples.entities.User;
import com.skilldistillery.goodapples.services.UserService;

@RestController
@RequestMapping("api")
@CrossOrigin({ "*", "http://localhost/" })
public class UserController {
	
	@Autowired
	private UserService userService;

	@PutMapping("users/{userId}")
	public User update(HttpServletRequest req, HttpServletResponse res, @PathVariable int userId,
			@RequestBody User userWithUpdates, Principal principal) {
		User updatedUser = null;
		try {
			updatedUser = userService.update(userWithUpdates, userId, principal.getName());
			if(updatedUser == null) {
				res.setStatus(404);
			}
		} catch (Exception e) {
			System.err.println("UserController.update(): error updating user");
			e.printStackTrace();
			res.setStatus(400);
		}
				return updatedUser;
		
	}
	
	@PutMapping("users/disable/{userId}")
	public void destroy (HttpServletRequest req, HttpServletResponse res, @PathVariable int userId,
			Principal principal) {
		try {
			if (userService.disable(principal.getName(), userId)) {
				res.setStatus(200);
			}
			else {
				res.setStatus(404);
			}
		} catch (Exception e) {
			System.err.println("UserController.disable(): error disabling user");
			e.printStackTrace();
			res.setStatus(400);
		}
	}
}
