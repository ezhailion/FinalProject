package com.skilldistillery.goodapples.controllers;

import java.security.Principal;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.goodapples.entities.Message;
import com.skilldistillery.goodapples.services.MessageService;

@RestController
@RequestMapping("api")
@CrossOrigin({ "*", "http://localhost/" })

public class MessageController {

	@Autowired
	private MessageService messageService;

	@GetMapping("messages")
	public List<Message> index(HttpServletRequest req, HttpServletResponse res, Principal principal) {
		return messageService.index(principal.getName());
	}

	
	@PostMapping("messages/{recipientId}")
	public Message create (HttpServletResponse res, HttpServletRequest req, Principal principal, @PathVariable int recipientId, @RequestBody Message message) {
		Message createdMessage = null;
		try {
			createdMessage = messageService.create(principal.getName(), message, recipientId);
			res.setStatus(201);
		} catch (Exception e) {
			res.setStatus(400);
			System.err.println("MessageController.create(): error creating message");
			e.printStackTrace();
		}
		return createdMessage;
		
	}
	
}
