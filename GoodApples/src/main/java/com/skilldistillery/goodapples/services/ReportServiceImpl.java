package com.skilldistillery.goodapples.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.goodapples.entities.Report;
import com.skilldistillery.goodapples.entities.User;
import com.skilldistillery.goodapples.repositories.ReportRepository;
import com.skilldistillery.goodapples.repositories.UserRepository;

@Service
public class ReportServiceImpl implements ReportService {

	@Autowired
	private ReportRepository reportRepo;
	@Autowired
	private UserRepository userRepo;
	
	@Override
	public Report show(String username, int reportId) {
		Report report = reportRepo.searchById(reportId);
		User teacher = userRepo.findByUsername(username); 
		if(report != null && teacher.getId() == report.getTeacher().getId()) {
		return report;
		}
		return null;
	}

	@Override
	public Report create(String username, Report newReport, int studentUserId) {
		User teacher = userRepo.findByUsername(username);
		if (teacher != null) {
			newReport.setTeacher(teacher);
			newReport.setStudent(userRepo.searchById(studentUserId).getStudent());
			newReport.setEnabled(true);
			return reportRepo.saveAndFlush(newReport);
		}
		return null;
	}

	@Override
	public List<Report> findAllReportsForASpecificStudent(int studentId) {
		return reportRepo.findByStudent_Id(studentId);
	}

	@Override
	public Report update(Report report, int reportId) {
		Report existing = reportRepo.searchById(reportId);
		if (existing != null) {
			existing.setNotes(report.getNotes());
			existing.setBehaviors(report.getBehaviors());
			reportRepo.saveAndFlush(existing);
		}
		return existing;
	}	

}
