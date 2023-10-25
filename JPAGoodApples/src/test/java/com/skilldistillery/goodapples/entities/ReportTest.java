package com.skilldistillery.goodapples.entities;

import static org.junit.jupiter.api.Assertions.*;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class ReportTest {

	private static EntityManagerFactory emf;
	private EntityManager em;
	private Report report;
	
	@BeforeAll
	static void setUpBeforeClass() throws Exception {
		emf = Persistence.createEntityManagerFactory("JPAGoodApples");
	}

	@AfterAll
	static void tearDownAfterClass() throws Exception {
		emf.close();
	}

	@BeforeEach
	void setUp() throws Exception {
		em = emf.createEntityManager();
		report = em.find(Report.class, 1);
	}

	@AfterEach
	void tearDown() throws Exception {
		em.close();
		report = null;
	}

	@Test
	void test_basic_mapping() {
		assertNotNull(report);
		assertEquals("good kid", report.getNotes());
	}
	
	@Test
	void test_mtm_report_behave_mappin() {
		assertTrue(report.getBehaviors().size() > 0);
	}
	@Test
	void test_mto_report_user_mapping() {
		assertEquals("teacher", report.getTeacher().getFirstName());
	}

	@Test
	void test_mto_report_student_mapping() {
		assertEquals("allergic to peanuts", report.getStudent().getAccommodations());
	}
}
