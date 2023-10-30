package com.skilldistillery.goodapples.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.goodapples.entities.Message;

public interface MessageRepository extends JpaRepository<Message, Integer> {
	Message searchById(int id);
	List<Message> findBySender_UsernameOrRecipient_Username(String username, String username2);
	
}
