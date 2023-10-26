package com.skilldistillery.goodapples.services;

import com.skilldistillery.goodapples.entities.Report;

public interface ReportService {
	
	Report show(String username, int reportId);
	
	Report create(String username, Report report, int studentId);
}
