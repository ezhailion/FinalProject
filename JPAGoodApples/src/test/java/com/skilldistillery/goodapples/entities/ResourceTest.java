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
	private Resource resource;
	
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
		resource = em.find(Resource.class, 1);
		
	}

	@AfterEach
	void tearDown() throws Exception {
		em.close();
		resource = null;
		
	}

	@Test
	void test_basic_mapping() {
		assertNotNull(resource);
		assertEquals("helpful info", resource.getTitle());
		assertEquals("www.google.com", resource.getLink());
	}
	
	@Test
	void test_mto_user_to_resources() {
		assertEquals("teacher", resource.getUser().getFirstName());
	}

	@Test
	void test_mto_resource_to_behavior() {
		assertEquals("integrity", resource.getBehavior().getName());
	}

}
