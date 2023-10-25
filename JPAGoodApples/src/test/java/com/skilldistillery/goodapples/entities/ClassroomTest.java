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

class ClassroomTest {

	private static EntityManagerFactory emf;
	private EntityManager em;
	private Classroom classroom;
	
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
		classroom = em.find(Classroom.class, 1);
	}

	@AfterEach
	void tearDown() throws Exception {
		em.close();
		classroom = null;
	}

	@Test
	void test_basic_mapping() {
		assertNotNull(classroom);
		assertEquals("good class", classroom.getName());
	}
	
	@Test
	void test_mtm_class_to_student() {
		assertTrue(classroom.getStudents().size() > 0);
	}
	
	@Test
	void test_mto_classes_to_teacher() {
		assertEquals("teacher", classroom.getTeacher().getFirstName());
	}
}
