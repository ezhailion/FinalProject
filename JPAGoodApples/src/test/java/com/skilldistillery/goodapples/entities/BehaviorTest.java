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

class BehaviorTest {

	private static EntityManagerFactory emf;
	private EntityManager em;
	private Behavior behavior;
	
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
		behavior = em.find(Behavior.class, 1);
	}

	@AfterEach
	void tearDown() throws Exception {
		em.close();
		behavior = null;
	}

	@Test
	void test_basic_mapping() {
		assertNotNull(behavior);
		assertEquals("integrity", behavior.getName());
	}
	
	@Test
	void test_mtm_report_to_behave_mappin() {
		assertTrue(behavior.getReports().size() > 0);
	}
	@Test
	void test_mto_bahvior_to_behaviorType_mappin() {
		assertEquals("good", behavior.getBehaviorType().getName());;
	}

}
