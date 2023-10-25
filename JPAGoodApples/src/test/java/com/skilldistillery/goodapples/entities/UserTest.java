package com.skilldistillery.goodapples.entities;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class UserTest {

	private static EntityManagerFactory emf;
	private EntityManager em;
	private User teacher;
	
	private User parent;
	private User student;
	
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
		teacher = em.find(User.class, 1);
		parent = em.find(User.class, 2);
		student = em.find(User.class, 3);
		
	}

	@AfterEach
	void tearDown() throws Exception {
		em.close();
		teacher = null;
		parent = null;
		student = null;
		
	}

	@Test
	void test_basic_mapping() {
		assertNotNull(teacher);
		assertEquals("teacher", teacher.getUsername());
		assertEquals("teacher", teacher.getFirstName());
	}
	
	@Test
	void test_mtm_parents_to_kids() {
		assertTrue(parent.getParentsKids().size() > 0);
		
	}
	@Test
	void test_otm_sender_and_recipient_messages() {
		assertTrue(teacher.getSentMessages().size() > 0);
		assertTrue(parent.getRecievedMessages().size() > 0);
		
	}
	@Test
	void test_mto_gender() {
		assertEquals("unspecified", teacher.getGender().getName());
		
	}

	@Test
	void test_otm_classes() {
		assertTrue(teacher.getClasses().size() > 0);
	}
	
	@Test
	void test_oto_student() {
		assertEquals("allergic to peanuts", student.getStudent().getAccommodations());
	}
}
