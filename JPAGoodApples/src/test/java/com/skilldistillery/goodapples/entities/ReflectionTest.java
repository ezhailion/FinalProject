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

class ReflectionTest {

	private static EntityManagerFactory emf;
	private EntityManager em;
	private Reflection reflection;
	
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
		reflection = em.find(Reflection.class, 1);
	}

	@AfterEach
	void tearDown() throws Exception {
		em.close();
		reflection = null;
	}

	@Test
	void test_basic_mapping() {
		assertNotNull(reflection);
		assertEquals("good day", reflection.getContent());
	}
	@Test
	void test_mto_student() {
		assertNotNull(reflection);
		assertEquals("allergic to peanuts", reflection.getStudent().getAccommodations());
	}

}
