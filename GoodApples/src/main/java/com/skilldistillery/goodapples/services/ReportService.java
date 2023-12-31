package com.skilldistillery.goodapples.services;

import java.util.List;

import com.skilldistillery.goodapples.entities.Report;

public interface ReportService {
	
	Report show(String username, int reportId);
	
	Report create(String username, Report report, int studentId);
	
	List<Report> findAllReportsForASpecificStudent(int studentId);
	
	Report update(Report report, int reportId);

	Report addBehavior(int reportId, int behaviorId, String name);

	Report removeBehavior(int reportId, int behaviorId, String name);
	
	boolean deleteReport(int reportId); 
		
}
