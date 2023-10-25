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

class ResourceTest {

	private static EntityManagerFactory emf;
	private EntityManager em;
	private Resource resources;
	
	
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
		resources = em.find(Resource.class, 1);
		
	}

	@AfterEach
	void tearDown() throws Exception {
		em.close();
		resources = null;
		
	}

	@Test
	void test_basic_mapping() {
		assertNotNull(resources);
		assertEquals("helpful info", resources.getTitle());
		assertEquals("www.google.com", resources.getLink());
	}
	
	@Test
	void test_mto_user_to_resources() {
		assertEquals("teacher", resources.getUser().getFirstName());
	}
	
}
