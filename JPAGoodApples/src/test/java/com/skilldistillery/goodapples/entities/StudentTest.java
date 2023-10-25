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

class StudentTest {

	private static EntityManagerFactory emf;
	private EntityManager em;
	private Student student;
	
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
		student = em.find(Student.class, 1);
	}

	@AfterEach
	void tearDown() throws Exception {
		em.close();
		student = null;
	}

	@Test
	void test_basic_mapping() {
		assertNotNull(student);
		assertEquals("allergic to peanuts", student.getAccommodations());
	}
	
	@Test
	void test_mtm_student_behave_mappin() {
		assertTrue(student.getClassrooms().size() > 0);
	}
	
	@Test
	void test_mtm_student_to_parents() {
		assertTrue(student.getParents().size() > 0);
	}

}
