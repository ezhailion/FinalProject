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

class MessageTest {

	private static EntityManagerFactory emf;
	private EntityManager em;
	private Message message;
	
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
		message = em.find(Message.class, 1);
	}

	@AfterEach
	void tearDown() throws Exception {
		em.close();
		message = null;
	}

	@Test
	void test_basic_mapping() {
		assertNotNull(message);
		assertEquals("Hello there.. message content", message.getContent());
	}
	
	@Test
	void test_mto_user_and_sender() {
		assertNotNull(message);
		assertEquals("teacher", message.getSender().getFirstName());
		assertEquals("parent", message.getRecipient().getFirstName());
	}
	
	@Test
	void test_mto_inReplyTo_messages() {
		assertNotNull(message);
		assertTrue(message.getInReplyToMessages().size() > 0);
		Message messageReply = em.find(Message.class, 2);
		assertNotNull(messageReply);
		assertEquals("Hello there.. message content", messageReply.getMessageToReplyTo().getContent());
	}
	
	

}
