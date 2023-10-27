package com.skilldistillery.goodapples.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.goodapples.entities.Classroom;
import com.skilldistillery.goodapples.entities.Report;

public interface ReportRepository extends JpaRepository<Report, Integer> {

	
	Report searchById(int id);
	List<Report> findByStudent_Id(int studentId);
	
	
}
