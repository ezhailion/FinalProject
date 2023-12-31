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

class GenderTest {

	private static EntityManagerFactory emf;
	private EntityManager em;
	private Gender gender;
	
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
		gender = em.find(Gender.class, 1);
	}

	@AfterEach
	void tearDown() throws Exception {
		em.close();
		gender = null;
	}

	@Test
	void test_basic_mapping() {
		assertNotNull(gender);
		assertEquals("unspecified", gender.getName());
	}


}
