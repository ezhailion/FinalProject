package com.skilldistillery.goodapples.controllers;

import java.security.Principal;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.goodapples.entities.Classroom;
import com.skilldistillery.goodapples.entities.Report;
import com.skilldistillery.goodapples.services.ReportService;

@RestController
@RequestMapping("api")
@CrossOrigin({ "*", "http://localhost/" })

public class ReportController {

	@Autowired
	private ReportService repoService;

	@GetMapping("reports/{reportId}")
	public Report show(@PathVariable int reportId, HttpServletRequest req, HttpServletResponse res,
			Principal principal) {
		Report report = null;
		try {
			report = repoService.show(principal.getName(), reportId);
		} catch (Exception e) {
			System.err.println("ReprtController.show(): error locating report");
			e.printStackTrace();
		}
		if (report == null) {
			res.setStatus(404);
		}
		return report;
	}

	@PostMapping("reports/students/{studentUserId}")
	public Report create(HttpServletRequest req, HttpServletResponse res, @RequestBody Report newReport,
			Principal principal, @PathVariable int studentUserId) {
		Report createdReport = null;
		try {
			createdReport = repoService.create(principal.getName(), newReport, studentUserId);
			res.setStatus(201);
			StringBuffer url = req.getRequestURL();
			url.append("/").append(createdReport.getId());
			res.setHeader("Location", url.toString());
		} catch (Exception e) {
			res.setStatus(400);
			System.err.println("ReprtController.create(): error creating report");
			e.printStackTrace();
		}
		return createdReport;
	}
}
