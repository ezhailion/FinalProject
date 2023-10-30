package com.skilldistillery.goodapples.controllers;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.goodapples.entities.Resource;
import com.skilldistillery.goodapples.services.ResourceService;

@RestController
@RequestMapping("api")
@CrossOrigin({ "*", "http://localhost/" })

public class ResourceController {

	@Autowired
	private ResourceService resourceService;

	// no principal on this one, available to all visitors
	@GetMapping("resources")
	public List<Resource> index(HttpServletRequest req, HttpServletResponse res) {
		return resourceService.index();
	}




}
