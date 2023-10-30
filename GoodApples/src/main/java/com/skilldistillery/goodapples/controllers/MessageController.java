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

	
	
}
