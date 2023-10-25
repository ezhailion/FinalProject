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

class BehaviorTypeTest {

	private static EntityManagerFactory emf;
	private EntityManager em;
	private BehaviorType behaviorType;
	
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
		behaviorType = em.find(BehaviorType.class, 1);
	}

	@AfterEach
	void tearDown() throws Exception {
		em.close();
		behaviorType = null;
	}

	
	@Test
	void test_mtm_behaviorType_to_resource_mappin() {
		assertEquals("good", behaviorType.getName());
	}
	@Test
	void test_mtm() {
		assertEquals("good", behaviorType.getName());
	}
	@Test
	void test_otm_behaviorType_to_behavior() {
		assertTrue(behaviorType.getBehaviors().size() > 0);
	}
	
	
}
